# pylint: disable=missing-docstring,broad-except

"""
usage: fetch_street_images.py [-h] [--n-images N_IMAGES] [--size SIZE] [--fov FOV] [--pitch PITCH]
                              [--radius RADIUS] [--data-zone DATA_ZONE [DATA_ZONE ...]] [--dry-run]
                              out_path

Download Google Street View images of Glasgow City.

positional arguments:
  out_path              directory path in which to store the image files

optional arguments:
  -h, --help            show this help message and exit
  --n-images N_IMAGES   number of images to download per data zone (default 1)
  --size SIZE           the square pixel size of each image (default 640)
  --fov FOV             the field of view in degrees (default 90)
  --pitch PITCH         the up/down angle to use relative to the street view vehicle (default 0)
  --radius RADIUS       the radius at which to search for a street view panorama (default 50)
  --data-zone DATA_ZONE [DATA_ZONE ...]
                        data zones for which images should be downloaded
  --dry-run             output a JSON object that describes the images that would be downloaded
  --fail-fast           do not continue upon failure to download an image
"""
import os
import sys
import json
import random
import pathlib
import argparse
from datetime import datetime
import requests
from dotenv import load_dotenv
from shapely.geometry import shape, Point

load_dotenv()

API_URL = "https://maps.googleapis.com/maps/api/streetview"
API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

GLASGOW_DATA_ZONES = "data/geojson/glasgow-data-zones.geojson.json"
HTTP_STATUS_OK = 200


class DownloadImageError(Exception):
    pass


def download_images(metadata, fail_fast=False):
    data_zones = metadata["dataZones"]
    n_data_zones = len(data_zones)
    for i, (dz_name, data_zone) in enumerate(data_zones.items()):
        print(f"Downloading images from data zone {dz_name} ({i+1}/{n_data_zones})")
        images = data_zone["images"]
        n_images = len(images)
        for j, image in enumerate(images):
            out_dir, fpath, name = image["dir"], image["path"], image["name"]
            print(f"Downloading image {name} ({j+1}/{n_images})")
            if pathlib.Path(fpath).is_file():
                print("file already exists")
                continue
            os.makedirs(out_dir, exist_ok=True)
            try:
                download_image(image)
            except DownloadImageError as err:
                print(err)
                if fail_fast:
                    sys.exit(1)


def download_image(image):
    lat, lon = image["lat"], image["lon"]
    width, height = image["width"], image["height"]
    params = {
        "size": f"{width}x{height}",
        "location": f"{lat},{lon}",
        "fov": image["fov"],
        "pitch": image["pitch"],
        "radius": image["radius"],
        "source": "outdoor",
        "return_error_code": "true",
        "key": API_KEY,
    }
    res = requests.get(API_URL, params)
    if res.status_code == HTTP_STATUS_OK:
        with open(image["path"], "wb") as file:
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
        "--size",
        type=int,
        default=640,
        help="the square pixel size of each image (default 640)",
    )
    parser.add_argument(
        "--fov",
        type=int,
        default=90,
        help="the field of view in degrees (default 90)",
    )
    parser.add_argument(
        "--pitch",
        type=int,
        default=0,
        help="the up/down angle to use relative to the street view vehicle (default 0)",
    )
    parser.add_argument(
        "--radius",
        type=int,
        default=50,
        help="the radius at which to search for a street view panorama (default 50)",
    )
    parser.add_argument(
        "--data-zone",
        nargs="+",
        help="data zones for which images should be downloaded",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="output a JSON object that describes the images that would be downloaded",
    )
    parser.add_argument(
        "--fail-fast",
        action="store_true",
        help="do not continue upon failure to download an image",
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


def generate_metadata(data_zones, opts):
    out_dir = opts["dir"]
    size = opts["size"]
    metadata = {"generatedAt": f"{datetime.now()}", "dataZones": {}}
    for data_zone in data_zones:
        dz_name = data_zone["properties"]["DataZone"]
        points = data_zone["points"]
        metadata["dataZones"][dz_name] = {
            "images": [
                {
                    "name": f"{p.x}_{p.y}_{size}x{size}.jpg",
                    "dir": f"{out_dir}/{dz_name}",
                    "path": f"{out_dir}/{dz_name}/{p.x}_{p.y}_{size}x{size}.jpg",
                    "lat": p.y,
                    "lon": p.x,
                    "width": size,
                    "height": size,
                    "fov": opts["fov"],
                    "pitch": opts["pitch"],
                    "radius": opts["radius"],
                }
                for p in points
            ]
        }
    return metadata


def write_metadata_file(metadata, out_dir):
    fpath = f"{out_dir}/images.json"
    with open(fpath, "w", encoding="utf8") as file:
        file.write(json.dumps(metadata))


def main():
    args = parse_args()
    data_zones = get_data_zones(args.data_zone)
    data_zones_with_points = generate_points(data_zones, n_points=args.n_images)
    metadata = generate_metadata(
        data_zones_with_points,
        opts={
            "dir": args.out_path,
            "size": args.size,
            "fov": args.fov,
            "pitch": args.pitch,
            "radius": args.radius,
        },
    )
    if args.dry_run:
        print(json.dumps(metadata))
    else:
        download_images(metadata, fail_fast=args.fail_fast)
        write_metadata_file(metadata, args.out_path)


if __name__ == "__main__":
    main()
