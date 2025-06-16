import torch
import numpy as np
from torchvision.transforms import Compose, Resize, ToTensor, Normalize
import cv2

def load_midas_model():
    model_type = "DPT_Large"
    midas = torch.hub.load("intel-isl/MiDaS", model_type)
    midas.eval()
    transform = torch.hub.load("intel-isl/MiDaS", "transforms").dpt_transform
    return midas, transform

def estimate_depth(img, midas, transform):
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    input_tensor = transform(img_rgb).unsqueeze(0)

    with torch.no_grad():
        prediction = midas(input_tensor)
        depth_map = prediction.squeeze().cpu().numpy()
    return depth_map

def estimate_dimensions(depth_map, ref_length_cm=21.0):
    h, w = depth_map.shape
    scale_cm_per_pixel = ref_length_cm / w

    est_width = w * scale_cm_per_pixel
    est_height = h * scale_cm_per_pixel
    est_depth = np.percentile(depth_map, 50) * 0.1

    return round(est_width, 1), round(est_height, 1), round(est_depth, 1)

def suggest_box_dims(l, w, h, buffer_ratio=0.1):
    return round(l * (1 + buffer_ratio), 1), round(w * (1 + buffer_ratio), 1), round(h * (1 + buffer_ratio), 1)
