# Glasgow Litter 🚯

A research project that explores the relationships between deprivation and litter in Glasgow City.

![Glasgow's Litter](./images/glasgow-litter.png)

## Objective

Identify the relationship, if any, between an area of Glasgow's deprivation and the amount of litter present on its streets.

## Data

The project's data sources can be found in the `data` directory and are described in [DATA.md](docs/DATA.md).

## App

A companion [web application](https://glasgow-litter.garyblackwood.co.uk) is included that allows users to interactively explore the litter objects detected throughout the city.

More information can be found in [APP.md](docs/APP.md).

## Object Detection

The notebooks in the `models/yolov5` directory are used to develop YOLOv5s object detection models for the purposes of litter detection.

Similarly, the notebooks in the `models/detectron2` directory are used to train Faster R-CNN models with the same objective.

## Regression

The notebook in the `regression` directory applies count data regression models such as Poisson and Negative Binomial to the extended SIMD data set described in [DATA.md](docs/DATA.md).

## Dependencies

1. [Python 3.9.6](https://www.python.org/downloads)
2. [CUDA Toolkit 11.3](https://developer.nvidia.com/cuda-11.3.0-download-archive)

Create a virtual environment and and install the required python packages:

```bash
python -m venv venv --prompt glasgow-litter
source venv/Scripts/activate # linux/macOS: source venv/bin/activate
pip install -r requirements.txt
```

## Scripts

There are utility scripts within the `scripts` directory that can be used for data collection and preparation.

More information can be found in the header comment of each script.

## Report

The source code for the report can be found in the `report` directory. This is currently a work in progress.

## Acknowledgements

Image annotations were added using [Label Studio](https://labelstud.io/).

Image augmentations were applied using [Roboflow](https://roboflow.com/features#transform).

Icons sourced from [iconmonstr](https://iconmonstr.com/license/).
