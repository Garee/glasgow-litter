"""
This script requests the location of public recycling facilities in Glasgow
City. It saves the location and materials processed to a JSON file.

More information can be found at https://www.glasgow.gov.uk/index.aspx?articleid=16569
"""
import sys
import json
import requests

MAP_QUERY_URL = (
    "https://utility.arcgis.com"
    "/usrsvcs/servers/42372005e077468f8d735ab99e634874"
    "/rest/services/AGOL/FeatureAccess_Public_Recycling"
    "/MapServer/dynamicLayer/query"
)

HTTP_STATUS_OK = 200

PARAMS = {
    "f": "json",
    "returnGeometry": "true",
    "spatialRel": "esriSpatialRelIntersects",
    "geometry": """{
    "xmin": 100000,
    "ymin": 500000,
    "xmax": 400000,
    "ymax": 800000
  }""",
    "spatialReference": """{
    "wkid": 4326,
    "latestWkid": 4326
  }""",
    "geometryType": "esriGeometryEnvelope",
    "inSR": 27700,
    "outFields": "OBJECTID,MATERIALS,DEPOT,PR_ID,HYPERLINK,LINKTEXT",
    "outSR": 4326,
    "layer": """{
    "source": {
      "type": "mapLayer",
      "mapLayerId": 0
    }
  }""",
}

HEADERS = {
    "Referer": (
        "https://glasgowgis.maps.arcgis.com"
        "/apps/webappviewer/index.html?id=345f389a91ff4f1fa193b24df832fb05"
    )
}


def main():
    """
    Requests the public recycling locations and saves the response
    as JSON to file.
    """
    if len(sys.argv) > 2:
        print("Usage: python fetch_public_recycling_points.py <out_file_path>")
        sys.exit(1)
    res = requests.get(MAP_QUERY_URL, PARAMS, headers=HEADERS)
    if res.status_code == HTTP_STATUS_OK:
        with open(sys.argv[1], "w", encoding="utf8") as file:
            file.write(json.dumps(res.json(), indent=2))
    else:
        print(res.text)
        sys.exit(1)


if __name__ == "__main__":
    main()
