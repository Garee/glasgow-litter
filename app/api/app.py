# pylint: disable=missing-docstring
# pylint: disable=missing-module-docstring

import os
import subprocess
from uuid import uuid4
from flask import Flask, request, send_file
from werkzeug.utils import secure_filename

MODEL_DIR = os.environ.get("MODEL_DIR", "./model")
UPLOAD_DIR = os.environ.get("UPLOAD_DIR", "./uploads")
DETECT_DIR = os.environ.get("DETECT_DIR", "./detect")
YOLO_DIR = os.environ.get("YOLO_DIR", "../../models/yolov5/yolov5")

app = Flask(__name__)


@app.route("/detect", methods=["POST"])
def detect():
    if len(request.files) == 0:
        return "Missing image file upload.", 400
    image_file = request.files["image"]
    confidence = request.form.get("confidence", "0.8")
    hide_confidence = request.form.get("hide_confidence", True)
    hide_labels = request.form.get("hide_labels", True)
    uuid = str(uuid4())
    file_name = secure_filename(image_file.filename)
    os.makedirs(f"{UPLOAD_DIR}/{uuid}", exist_ok=True)
    image_file.save(f"{UPLOAD_DIR}/{uuid}/{file_name}")
    cmd = [
        "python",
        f"{YOLO_DIR}/detect.py",
        "--weights",
        f"{MODEL_DIR}/weights.pt",
        "--data",
        f"{MODEL_DIR}/data.yaml",
        "--source",
        f"{UPLOAD_DIR}/{uuid}",
        "--project",
        f"{DETECT_DIR}",
        "--name",
        uuid,
        "--conf",
        confidence,
    ]
    if hide_labels:
        cmd.append("--hide-labels")
    if hide_confidence:
        cmd.append("--hide-conf")
    print(cmd)
    with subprocess.Popen(cmd) as pid:
        return_code = pid.wait()
    if return_code != 0:
        return "Encountered a problem during litter detection.", 400
    return send_file(f"{DETECT_DIR}/{uuid}/{file_name}")
