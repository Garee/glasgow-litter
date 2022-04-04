# Glasgow Litter 🚯

A research project that explores the relationships between deprivation and litter in Glasgow City.

![Glasgow's Litter](./images/glasgow-litter.png)

## Objective

Identify the relationship, if any, between an area of Glasgow's deprivation and the amount of litter present on its streets.

## Data

The project's data sources can be found in the `data` directory and are described in [DATA.md](docs/DATA.md).

## App

A companion web application is included that allows users to interactively explore the litter objects detected throughout the city.

More information can be found in [APP.md](docs/APP.md).

## Object Detection and Regression

The `models` and `regression` directories contain the code used to obtain the litter counts and perform data analysis.

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

## Annotations

Image annotations were added using [Label Studio](https://labelstud.io/).

Run Label Studio:

```bash
export LABEL_STUDIO_LOCAL_FILES_SERVING_ENABLED=true
export LABEL_STUDIO_LOCAL_FILES_DOCUMENT_ROOT=<path_to_data>
bin/label-studio.exe --data-dir data/label-studio
```

## Thesis

The source code for the thesis can be found in the `thesis` directory. This is currently a work in progress.

## Acknowledgements

Icons sourced from [iconmonstr](https://iconmonstr.com/license/).
