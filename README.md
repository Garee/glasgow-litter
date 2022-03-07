# Glasgow Litter 🌟

A project that explores the relationship between deprivation and litter in Glasgow City.

## Objective

Identify the relationship, if any, between an area of Glasgow's deprivation and the amount of litter present on its streets.

## Data

The project's data sources can be found in the `data` directory and are described in [DATA.md](docs/DATA.md).

## Object Detection and Regression

The `models` and `regression` directories contain the code used to obtain the litter counts and perform data analysis.

## Dependencies

1. [Python 3.9.6](https://www.python.org/downloads)
2. [Node.js 16.13.0](https://nodejs.org/en/download)
3. [CUDA Toolkit 11.3](https://developer.nvidia.com/cuda-11.3.0-download-archive)

## App

A companion web application is included that allows users to interactively explore the litter objects detected throughout the city.

### Quick Start

Install NPM packages:

```bash
npm install
```

Create a virtual environment and and install the required python packages:

```bash
python -m venv venv --prompt glasgow-litter
source venv/Scripts/activate # linux/mac: source venv/bin/activate
pip install -r requirements.txt
```

Start the companion web app:

```bash
npm start
```

Lint the code:

```bash
npm run lint
```

Format the code:

```bash
npm run format
```

## Scripts

There are utility scripts within the `scripts` directory that can be used for data collection and preparation.

## Annotations

Image annotations were added using [Label Studio](https://labelstud.io/).

Run Label Studio:

```bash
export LABEL_STUDIO_LOCAL_FILES_SERVING_ENABLED=true
export LABEL_STUDIO_LOCAL_FILES_DOCUMENT_ROOT=<path_to_data>
bin/label-studio.exe --data-dir data/label-studio
```

## Acknowledgements

Icons sourced from [iconmonstr](https://iconmonstr.com/license/).
