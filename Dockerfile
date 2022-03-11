# syntax=docker/dockerfile:1

FROM python:3.9-slim-buster
WORKDIR /app
COPY app/api .
COPY models/yolov5/yolov5/requirements.txt yolov5_requirements.txt
RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6 git -y
RUN pip3 install -r yolov5_requirements.txt
RUN pip3 install Flask
CMD ["python", "-m" , "flask", "run", "--host=0.0.0.0"]
