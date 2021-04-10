import cv2 as cv
from imageai.Detection import ObjectDetection as od

import requests as req
import os as os

def showImage(img):
    window_name = 'image'
    cv.imshow(window_name, img)
    cv.waitKey(0)
    cv.destroyAllWindows()

model = 'https://github.com/OlafenwaMoses/ImageAI/releases/download/essential-v4/pretrained-yolov3.h5'

if not os.path.exists('yolo.h5'):
    r = req.get(model)
    with open('yolo.h5', 'wb') as outfile:
        outfile.write(r.content)

detector = od()
detector.setModelTypeAsYOLOv3()
detector.setModelPath('yolo.h5')
detector.loadModel()

currentDir = os.path.dirname(os.path.realpath(__file__))
sampleImagePath = os.path.join(currentDir, "samples", "sample1.jpg")

peopleOnly = detector.CustomObjects(person=True)
detectedImage, detections = detector.detectCustomObjectsFromImage(custom_objects=peopleOnly, output_type="array", input_image=sampleImagePath, minimum_percentage_probability=30)
convertedImage = cv.cvtColor(detectedImage, cv.COLOR_RGB2BGR)
# showImage(convertedImage)
print(len(detections))