import cv2 as cv
from imageai.Detection import ObjectDetection as od

import requests as req
import os as os

model = 'https://github.com/OlafenwaMoses/ImageAI/releases/download/essential-v4/pretrained-yolov3.h5'

if not os.path.exists('yolo.h5'):
    r = req.get(model)
    with open('yolo.h5', 'wb') as outfile:
        outfile.write(r.content)

def hmPeopleIn(image):
    """
    :param image: Can be a filepath, image numpy array or image file stream
    :return: How many people were detected in the image.
    """

    detector = od()
    detector.setModelTypeAsYOLOv3()
    detector.setModelPath('yolo.h5')
    detector.loadModel()

    peopleOnly = detector.CustomObjects(person=True)
    detectedImage, detections = detector.detectObjectsFromImage(custom_objects=peopleOnly, output_type="array", input_image=image, minimum_percentage_probability=60)

    return len(detections)
