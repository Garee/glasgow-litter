# pylint: disable=missing-function-docstring

"""
usage: prepare_labelled_images.py [-h] [--metadata-only] yolo_path

Prepare labelled images for the companion web app.

positional arguments:
  yolo_path        directory path in which the YOLO detected labels are stored

optional arguments:
  -h, --help       show this help message and exit
  --metadata-only  skip copying images and only generate the metadata file

example usage:

  python scripts/prepare_labelled_images.py models/yolov5/yolov5/runs/detect/exp
"""

import os
import re
import json
import argparse
import glob
import copy
import shutil
from pathlib import Path


def create_metadata(yolo_path):
    metadata_fpath = "data/images/images.json"
    with open(metadata_fpath, encoding="utf-8") as file:
        metadata = json.loads(file.read())
        data_zones = metadata["dataZones"]
        labels = copy.deepcopy(metadata)
        labels["dataZones"] = {}
    labels_dir = yolo_path / "labels"
    for label_fpath in glob.iglob(os.path.join(labels_dir, "*.txt")):
        name = label_fpath.replace(".txt", ".jpg")
        for dz_name in data_zones:
            dz_info = data_zones[dz_name]
            if dz_name not in labels["dataZones"]:
                labels["dataZones"][dz_name] = {"images": []}
            images = dz_info["images"]
            for image in images:
                if name.endswith(image["name"]):
                    image["dir"] = re.sub("images/S[0-9]*", "detected", image["dir"])
                    image["path"] = re.sub("images/S[0-9]*", "detected", image["path"])
                    labels["dataZones"][dz_name]["images"].append(image)
    with open(labels_dir / "images.json", mode="w", encoding="utf-8") as file:
        file.write(json.dumps(labels))


def copy_files(yolo_path: Path):
    to_dir = yolo_path / "labels"
    for label_fname in os.listdir(yolo_path / "labels"):
        fname = label_fname.replace(".txt", ".jpg")
        for img_path in yolo_path.glob("*.jpg"):
            img_fname = str(img_path)
            if img_fname.endswith(fname):
                shutil.copy(img_fname, to_dir)


def parse_args():
    parser = argparse.ArgumentParser(
        description="Prepare labelled images for the companion web app."
    )
    parser.add_argument(
        "yolo_path",
        type=Path,
        help="directory path in which the YOLO detected labels are stored",
    )
    parser.add_argument(
        "--metadata-only",
        action="store_true",
        help="skip copying images and only generate the metadata file",
    )
    return parser.parse_args()


def main():
    args = parse_args()
    yolo_path = Path(args.yolo_path)
    create_metadata(yolo_path)
    if not args.metadata_only:
        copy_files(yolo_path)


if __name__ == "__main__":
    main()
