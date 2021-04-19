FROM python:3.8-slim-buster

COPY . /app
WORKDIR /app

RUN apt-get update
RUN apt-get install -y libgl1-mesa-dev
RUN apt-get install libglib2.0-0 -y
RUN pip install -r requirements.txt

EXPOSE 5000
CMD python ./server.py
