# import streamlit as st
# import boto3
# import pandas as pd
# import uuid
# from botocore.exceptions import NoCredentialsError

# # AWS CONFIG
# AWS_ACCESS_KEY = "AKIAW3MEC3GYP54SG5Z4"
# AWS_SECRET_KEY = "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"
# BUCKET_NAME = "hackon0101"

# # Function to upload image to S3
# def upload_image_to_s3(file, filename):
#     try:
#         s3 = boto3.client("s3",
#                           aws_access_key_id=AWS_ACCESS_KEY,
#                           aws_secret_access_key=AWS_SECRET_KEY)

#         s3.upload_fileobj(file, BUCKET_NAME, filename)
#         image_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{filename}"
#         return image_url

#     except NoCredentialsError:
#         st.error("AWS credentials not found.")
#         return None


# # UI
# st.title("Seller Registration")

# name = st.text_input("Seller Name")
# description = st.text_area("Store Description")
# image_file = st.file_uploader("Upload Store Image", type=["png", "jpg", "jpeg"])

# if st.button("Register"):
#     if name and description and image_file:
#         unique_filename = f"seller_images/{uuid.uuid4()}_{image_file.name}"
#         image_url = upload_image_to_s3(image_file, unique_filename)

#         if image_url:
#             # Save to CSV (local)
#             df = pd.DataFrame([[name, description, image_url]], columns=["Name", "Description", "Image URL"])
#             df.to_csv("seller_data.csv", mode='a', index=False, header=not pd.io.common.file_exists("seller_data.csv"))

#             st.success("Seller Registered Successfully!")
#             st.image(image_url, caption="Uploaded Image")
#         else:
#             st.error("Failed to upload image.")
#     else:
#         st.warning("Please fill in all fields and upload an image.")


import streamlit as st
import boto3
import uuid
from botocore.exceptions import NoCredentialsError

# AWS CONFIG
AWS_ACCESS_KEY = "AKIAW3MEC3GYP54SG5Z4"
AWS_SECRET_KEY = "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"
BUCKET_NAME = "hackon0101"
FOLDER_NAME = "seller_images"

s3 = boto3.client('s3')

# --- Store metadata locally (you can use DB later) ---
if "sellers" not in st.session_state:
    st.session_state.sellers = []

# --- Upload Function ---
def upload_image_to_s3(file, filename):
    try:
        s3 = boto3.client("s3",
                          aws_access_key_id=AWS_ACCESS_KEY,
                          aws_secret_access_key=AWS_SECRET_KEY)

        s3.upload_fileobj(file, BUCKET_NAME, filename)
        image_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{filename}"
        return image_url

    except NoCredentialsError:
        st.error("AWS credentials not found.")
        return None

# --- UI: Seller Registration ---
st.title("🛍️ Seller Registration")

with st.form("seller_form"):
    name = st.text_input("Seller Name")
    description = st.text_area("Seller Description")
    image_file = st.file_uploader("Upload Seller Image", type=["jpg", "jpeg", "png"])
    submit = st.form_submit_button("Register Seller")

if submit:
    if name and description and image_file:
        unique_filename = f"{uuid.uuid4()}_{image_file.name}"
        image_url = upload_image_to_s3(image_file, unique_filename)

        # Save metadata
        seller_info = {
            "name": name,
            "description": description,
            "image_url": image_url
        }
        st.session_state.sellers.append(seller_info)
        st.success("✅ Seller registered successfully!")
    else:
        st.error("Please fill all fields and upload an image.")

# --- Display Registered Sellers ---
st.subheader("🧾 Registered Sellers")

if st.session_state.sellers:
    for seller in st.session_state.sellers:
        st.markdown(f"### {seller['name']}")
        st.image(seller["image_url"], width=200)
        st.markdown(f"**Description:** {seller['description']}")
        st.markdown("---")
else:
    st.info("No sellers registered yet.")
