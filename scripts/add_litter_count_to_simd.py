# pylint: disable=missing-docstring


import argparse
import glob
import os
import csv
import json
from pathlib import Path


def write_to_simd(simd_path, out_path, counts):
    with open(simd_path, "r", newline="", encoding="utf-8") as file_p:
        csv_reader = csv.reader(file_p)
        header = next(csv_reader)
        header.append("litter")
        rows = [header]
        for row in csv_reader:
            data_zone = row[0]
            row.append(counts[data_zone])
            rows.append(row)
        out_path = os.path.join(out_path, os.path.basename(simd_path))
        with open(out_path, "w", newline="", encoding="utf-8") as out_fp:
            csv_writer = csv.writer(out_fp)
            csv_writer.writerows(rows)


def count_data_zones_litter(images_path, labels_path):
    data_zones = {}
    for file in os.listdir(images_path):
        data_zone_path = os.path.join(images_path, file)
        if os.path.isdir(data_zone_path):
            count = count_data_zone_litter(data_zone_path, labels_path)
            data_zones[file] = count
        else:
            data_zones[file] = 0
    return data_zones


def count_data_zone_litter(data_zone_path, labels_path):
    count = 0
    label_file_paths = glob.iglob(os.path.join(labels_path, "*.txt"))
    label_prefixes = {}
    for label_path in label_file_paths:
        label_name = os.path.basename(label_path)
        label_prefix = label_name.replace(".txt", "")
        label_prefixes[label_prefix] = label_path
    image_file_paths = glob.iglob(os.path.join(data_zone_path, "*.jpg"))
    for image_path in image_file_paths:
        image_name = os.path.basename(image_path)
        image_prefix = image_name.replace(".jpg", "")
        if image_prefix in label_prefixes:
            with open(label_prefixes[image_prefix], "r", encoding="utf-8") as file_p:
                count += len(file_p.readlines())
    return count


def parse_args():
    parser = argparse.ArgumentParser(
        description=(
            "Creates a modified SIMD CSV file with a `litter` column populated "
            "with the number of litter objects detected for each data zone."
        )
    )
    parser.add_argument(
        "images_path",
        type=Path,
        help="directory path that contains the source images",
    )
    parser.add_argument(
        "labels_path",
        type=Path,
        help="directory path that contains the litter labels",
    )
    parser.add_argument(
        "simd_path",
        type=Path,
        help="path to the SIMD CSV file",
    )
    parser.add_argument(
        "out_path",
        type=Path,
        help="directory path to output the updated SIMD CSV file",
    )
    parser.add_argument("--debug", action="store_true", help="enable debug logging")
    return parser.parse_args()


def main():
    args = parse_args()
    counts = count_data_zones_litter(args.images_path, args.labels_path)
    if args.debug:
        print(json.dumps(counts, indent=2))
    else:
        write_to_simd(args.simd_path, args.out_path, counts)


if __name__ == "__main__":
    main()
