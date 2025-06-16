import streamlit as st
from PIL import Image
import numpy as np
import cv2
from midas_utils import load_midas_model, estimate_depth, estimate_dimensions, suggest_box_dims

st.set_page_config(page_title="3D Packager", layout="centered")
st.title("📦 3D Packager – Estimate Package Dimensions from an Image")

uploaded_file = st.file_uploader("Upload an image of the object:", type=["jpg", "png", "jpeg"])

if uploaded_file is not None:
    image = Image.open(uploaded_file)
    st.image(image, caption="Uploaded image", use_column_width=True)

    with st.spinner("Estimating dimensions..."):
        img_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

        # Load model and process
        midas, transform = load_midas_model()
        depth_map = estimate_depth(img_cv, midas, transform)
        l, w, h = estimate_dimensions(depth_map)

        bl, bw, bh = suggest_box_dims(l, w, h)

    st.markdown(f"### 📐 Estimated Object Size: `{l} × {w} × {h} cm`")
    st.success(f"📦 Recommended Box Size: `{bl} × {bw} × {bh} cm` (10% buffer)")
