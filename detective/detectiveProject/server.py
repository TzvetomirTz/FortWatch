import flask

from ml import model
import os

from flask import Flask, request
from ml import model
from werkzeug.utils import secure_filename

app = Flask(__name__)

@app.route("/check/", methods=['POST'])
def checkImage():
    imgFile = request.files['image']
    imgFilePath = os.path.join(os.path.dirname(os.path.realpath(__file__)), secure_filename("sample.jpg"))
    imgFile.save(imgFilePath)

    return str(model.hmPeopleIn(imgFilePath))

@app.route("/health/", methods=["GET"])
def checkServerHealth():
    return "Up and running!"

app.run(host="0.0.0.0")
