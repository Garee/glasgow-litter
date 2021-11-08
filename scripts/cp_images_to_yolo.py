# pylint: disable=missing-docstring

import os
import argparse
import glob
import shutil
from pathlib import Path


def copy_files(yolo_path):
    for label_fname in os.listdir(yolo_path / "labels"):
        fname = label_fname.replace(".txt", ".jpg")
        for img_fname in glob.iglob("data/images/**/*.jpg", recursive=True):
            if img_fname.endswith(fname):
                shutil.copy(img_fname, yolo_path / "images")


def parse_args():
    parser = argparse.ArgumentParser(
        description="Copy labelled images from data/images to the YOLO export directory."
    )
    parser.add_argument(
        "yolo_path",
        type=Path,
        help="directory path in which the yolo labels are stored",
    )
    return parser.parse_args()


def main():
    args = parse_args()
    yolo_path = Path(args.yolo_path)
    copy_files(yolo_path)


if __name__ == "__main__":
    main()
