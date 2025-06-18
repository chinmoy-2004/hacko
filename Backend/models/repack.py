import cv2
import numpy as np
import os

def detect_shape_and_box(image_path):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)

    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    shape = "Unidentified"
    dimensions = (0, 0, 0)

    for c in contours:
        if cv2.contourArea(c) < 300:
            continue

        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.02 * peri, True)

        if len(approx) == 3:
            shape = "Triangle"
        elif len(approx) == 4:
            x, y, w, h = cv2.boundingRect(approx)
            ar = w / float(h)
            shape = "Square" if 0.95 <= ar <= 1.05 else "Rectangle"
        elif len(approx) == 5:
            shape = "Pentagon"
        elif len(approx) > 6:
            shape = "Circle"

        x, y, w, h = cv2.boundingRect(c)
        depth = int((w + h) / 4) if shape in ['Rectangle', 'Square'] else int(min(w, h) / 2)
        dimensions = (w, h, depth)
        break  # one object only

    shape_to_box = {
        "Circle": "cube_box.png",
        "Square": "cube_box.png",
        "Rectangle": "rect.png",
        "Triangle": "default_box.png",
        "Pentagon": "default_box.png",
        "Unidentified": "default_box.png"
    }

    box_img = shape_to_box.get(shape, "default_box.png")
    return shape, dimensions, box_img
