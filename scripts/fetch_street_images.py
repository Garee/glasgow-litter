"""
This script is an example of how to use the Google Street View Static API
to download a street view image.
"""
import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_URL = "https://maps.googleapis.com/maps/api/streetview"
API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

IMG_WIDTH = 600
IMG_HEIGHT = 600
RADIUS = 50
FOV = 90
PITCH = 0
SOURCE = "outdoor"
RETURN_ERR_CODE = "true"

HTTP_STATUS_OK = 200


def main():
    """
    Download a street view image at a fixed location.
    """
    lat = 47.5763831
    lon = -122.4211769
    params = {
        "size": f"{IMG_WIDTH}x{IMG_HEIGHT}",
        "location": f"{lat},{lon}",
        "fov": FOV,
        "pitch": PITCH,
        "radius": RADIUS,
        "source": SOURCE,
        "return_error_code": RETURN_ERR_CODE,
        "key": API_KEY,
    }
    res = requests.get(API_URL, params)
    if res.status_code == HTTP_STATUS_OK:
        fname = f"{lat}_{lon}_{IMG_WIDTH}x{IMG_HEIGHT}.jpg"
        with open(fname, "wb") as file:
            file.write(res.content)
    else:
        print(res.text)


if __name__ == "__main__":
    main()
