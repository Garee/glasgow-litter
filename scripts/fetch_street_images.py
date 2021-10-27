# pylint: disable=missing-docstring

"""
This script is an example of how to use the Google Street View Static API
to download a street view image.
"""
import os
import sys
import json
import random
import pathlib
import argparse
import requests
from dotenv import load_dotenv
from shapely.geometry import shape, Point

load_dotenv()

API_URL = "https://maps.googleapis.com/maps/api/streetview"
API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

IMG_WIDTH = 800
IMG_HEIGHT = 800

GLASGOW_DATA_ZONES = "data/geojson/glasgow-data-zones.geojson.json"
HTTP_STATUS_OK = 200


class DownloadImageError(Exception):
    pass


def download_image(lat, lon):
    params = {
        "size": f"{IMG_WIDTH}x{IMG_HEIGHT}",
        "location": f"{lat},{lon}",
        "fov": 90,
        "pitch": 0,
        "radius": 50,
        "source": "outdoor",
        "return_error_code": "true",
        "key": API_KEY,
    }
    res = requests.get(API_URL, params)
    if res.status_code == HTTP_STATUS_OK:
        fname = f"{lat}_{lon}_{IMG_WIDTH}x{IMG_HEIGHT}.jpg"
        with open(fname, "wb", encoding="utf8") as file:
            file.write(res.content)
    else:
        raise DownloadImageError(res.text)


def load_data_zone_geojson():
    data_zones = []
    with open(GLASGOW_DATA_ZONES, encoding="utf8") as file:
        collection = json.loads(file.read())
        features = collection["features"]
        for feature in features:
            geometry, properties = feature["geometry"], feature["properties"]
            data_zones.append(
                {"shape": shape(geometry).buffer(0), "properties": properties}
            )
    return data_zones


def generate_n_random_points(n_points, polygon):
    points = []
    min_x, min_y, max_x, max_y = polygon.bounds
    while len(points) < n_points:
        point = Point(random.uniform(min_x, max_x), random.uniform(min_y, max_y))
        if polygon.contains(point):
            points.append(point)
    return points


def parse_args():
    parser = argparse.ArgumentParser(
        description="Download Google Street View images of Glasgow City."
    )
    parser.add_argument(
        "out_path",
        type=pathlib.Path,
        help="directory path in which to store the image files",
    )
    parser.add_argument(
        "--n-images",
        type=int,
        default=1,
        help="number of images to download per data zone (default 1)",
    )
    parser.add_argument(
        "--data-zone",
        nargs="+",
        help="data zones for which images should be downloaded",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="output a JSON object that describes the images that would be downloaded.",
    )
    return parser.parse_args()


def filter_data_zones(data_zones, by_zones):
    if not by_zones:
        return data_zones

    def by_zone(data_zone):
        name = data_zone["properties"]["DataZone"]
        return name in by_zones

    return list(filter(by_zone, data_zones))


def get_data_zones(filter_by):
    data_zones = load_data_zone_geojson()
    return filter_data_zones(data_zones, filter_by)


def generate_points(data_zones, n_points=1):
    for data_zone in data_zones:
        data_zone["points"] = generate_n_random_points(n_points, data_zone["shape"])
    return data_zones


def dz_to_json(data_zones):
    rep = {}
    for data_zone in data_zones:
        name = data_zone["properties"]["DataZone"]
        points = data_zone["points"]
        rep[name] = {"points": [{"lat": p.y, "lon": p.x} for p in points]}
    return json.dumps(rep)


def main():
    args = parse_args()
    data_zones = get_data_zones(args.data_zone)
    data_zones = generate_points(data_zones, args.n_images)
    if args.dry_run:
        print(dz_to_json(data_zones))
    sys.exit(0)


if __name__ == "__main__":
    main()
