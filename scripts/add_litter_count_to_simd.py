import argparse
import glob
import os
import csv
import json
from pathlib import Path


def write_to_simd(simd_path, out_path, counts):
    with open(simd_path, "r") as fp:
        csv_reader = csv.reader(fp)
        header = next(csv_reader)
        header.append("litter")
        rows = [header]
        for row in csv_reader:
            data_zone = row[0]
            row.append(counts[data_zone])
            rows.append(row)
        out_path = os.path.join(out_path, os.path.basename(simd_path))
        with open(out_path, "w") as out_fp:
            csv_writer = csv.writer(out_fp)
            csv_writer.writerows(rows)


def count_data_zones_litter(images_path, labels_path):
    data_zones = {}
    for f in os.listdir(images_path):
        data_zone_path = os.path.join(images_path, f)
        if os.path.isdir(data_zone_path):
            count = count_data_zone_litter(data_zone_path, labels_path)
            data_zones[f] = count
        else:
            data_zones[f] = 0
    return data_zones


def count_data_zone_litter(data_zone_path, labels_path):
    count = 0
    label_file_names = glob.iglob(os.path.join(labels_path, "*.txt"))
    for i_path in glob.iglob(os.path.join(data_zone_path, "*.jpg")):
        ifname = os.path.basename(i_path)
        for l_path in label_file_names:
            lfname = os.path.basename(l_path)
            if lfname.startswith(ifname.replace(".jpg", "")):
                with open(l_path, "r") as fp:
                    count += len(fp.readlines())
    return count


def parse_args():
    parser = argparse.ArgumentParser(
        description="Copy labelled images from data/images to the YOLO export directory."
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
