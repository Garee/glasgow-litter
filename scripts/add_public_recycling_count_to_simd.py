# pylint: disable=missing-function-docstring

"""
usage: add_public_recycling_count_to_simd.py [-h] [--debug]
  data_zone_path public_recycling_path simd_path out_path

Creates a modified SIMD CSV file with a `public_recycling_points` column populated with the number
of public recycling points within each data zone.

positional arguments:
  data_zone_path        path to the data zone geojson file
  public_recycling_path
                        path to the public recycling points file
  simd_path             path to the SIMD CSV file
  out_path              directory path to output the updated SIMD CSV file

optional arguments:
  -h, --help            show this help message and exit
  --debug               enable debug logging

example usage:

  python scripts/add_public_recycling_count_to_simd.py
    data/geojson/glasgow-data-zones.geojson.json
    data/publicRecyclingPoints.json
    data/glasgow-simd2020v2.csv
    .
"""
import argparse
import os
import csv
import json
from pathlib import Path
from shapely.geometry import shape, Point


def add_to_simd(simd_path, out_path, counts):
    with open(simd_path, "r", newline="", encoding="utf-8") as file_p:
        csv_reader = csv.reader(file_p)
        header = next(csv_reader)
        header.append("public_recycling_points")
        rows = [header]
        for row in csv_reader:
            row.append(counts[row[0]])
            rows.append(row)
        out_path = os.path.join(out_path, os.path.basename(simd_path))
        with open(out_path, "w", newline="", encoding="utf-8") as out_fp:
            writer = csv.writer(out_fp)
            writer.writerows(rows)


def count_public_recycling_points_in_data_zones(data_zone_path, public_recycling_path):
    data_zones = {}
    with open(data_zone_path, "r", encoding="utf-8") as dzf:
        geojson = json.loads(dzf.read())
        data_zone_features = geojson["features"]
        for data_zone_feature in data_zone_features:
            dz_id = data_zone_feature["properties"]["DataZone"]
            dz_polygon = shape(data_zone_feature["geometry"]).buffer(0)
            data_zones[dz_id] = 0
            with open(public_recycling_path, "r", encoding="utf-8") as prf:
                pr_features = json.loads(prf.read())["features"]
                for pr_feature in pr_features:
                    pr_coord = pr_feature["geometry"]
                    pr_point = Point(pr_coord["x"], pr_coord["y"])
                    if dz_polygon.contains(pr_point):
                        data_zones[dz_id] += 1
    return data_zones


def parse_args():
    parser = argparse.ArgumentParser(
        description=(
            "Creates a modified SIMD CSV file with a `public_recycling_points` column populated "
            "with the number of public recycling points within each data zone."
        )
    )
    parser.add_argument(
        "data_zone_path",
        type=Path,
        help="path to the data zone geojson file",
    )
    parser.add_argument(
        "public_recycling_path",
        type=Path,
        help="path to the public recycling points file",
    )
    parser.add_argument(
        "simd_path",
        type=Path,
        help="path to the SIMD .csv file",
    )
    parser.add_argument(
        "out_path",
        type=Path,
        help="directory path to output the updated SIMD .csv file",
    )
    parser.add_argument("--debug", action="store_true", help="enable debug logging")
    return parser.parse_args()


def main():
    args = parse_args()
    counts = count_public_recycling_points_in_data_zones(
        args.data_zone_path, args.public_recycling_path
    )
    if args.debug:
        print(json.dumps(counts, indent=2))
    else:
        add_to_simd(args.simd_path, args.out_path, counts)


if __name__ == "__main__":
    main()
