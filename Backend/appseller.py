from flask import Flask, render_template, request, jsonify
from seller_registration_fraud_detection.kms_utils import encrypt_data
from seller_registration_fraud_detection.rekognition_utils import compare_faces
from seller_registration_fraud_detection.s3_utils import upload_image, list_images, BUCKET_NAME
from seller_registration_fraud_detection.database_utils import insert_seller, get_all_encrypted_pan_gst
import uuid
import os

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    return render_template("indexsellerreg.html")

@app.route("/register", methods=["POST"])
def register():
    # Get form data
    name = request.form.get("name")
    pan = request.form.get("pan")
    gst = request.form.get("gst")
    doc_image = request.files.get("doc_image")
    selfie_image = request.files.get("selfie_image")

    # Validate all fields
    if not all([name, pan, gst, doc_image, selfie_image]):
        return jsonify({"status": "error", "message": "All fields are required"}), 400

    # Generate unique keys for S3
    doc_key = f"documents/{uuid.uuid4()}_{doc_image.filename}"
    selfie_key = f"selfies/{uuid.uuid4()}_{selfie_image.filename}"

    # Get existing data before uploading new files
    existing_docs = list_images("documents")
    existing_entries = get_all_encrypted_pan_gst()
    
    # Encrypt sensitive data
    try:
        enc_pan = encrypt_data(pan)
        enc_gst = encrypt_data(gst)
    except Exception as e:
        return jsonify({"status": "error", "message": f"Encryption failed: {str(e)}"}), 500

    # Upload images to S3
    try:
        upload_image(doc_image.read(), doc_key)
        upload_image(selfie_image.read(), selfie_key)
    except Exception as e:
        return jsonify({"status": "error", "message": f"Image upload failed: {str(e)}"}), 500

    # Face verification
    try:
        # 1. Match document face with selfie
        doc_match = compare_faces(BUCKET_NAME, doc_key, selfie_key)
        
        # 2. Check for duplicate face in system
        duplicate_face = False
        for existing_doc in existing_docs:
            if compare_faces(BUCKET_NAME, existing_doc, selfie_key):
                duplicate_face = True
                break
        
        # 3. Check for duplicate PAN/GST
        duplicate_data = any(
            (enc_pan == db_pan or enc_gst == db_gst) 
            for db_pan, db_gst in existing_entries
        )
    except Exception as e:
        return jsonify({"status": "error", "message": f"Face verification failed: {str(e)}"}), 500

    # Generate seller ID
    seller_id = str(uuid.uuid4())[:8]

    # Save to database
    try:
        insert_seller(seller_id, name, enc_pan, enc_gst, doc_key, selfie_key)
    except Exception as e:
        return jsonify({"status": "error", "message": f"Database error: {str(e)}"}), 500

    # Determine verification result
    if doc_match and not duplicate_face and not duplicate_data:
        return jsonify({
            "status": "success",
            "seller_id": seller_id,
            "message": "Seller verified successfully",
            "verification_details": {
                "document_selfie_match": doc_match,
                "duplicate_face_found": duplicate_face,
                "duplicate_data_found": duplicate_data
            }
        })
    else:
        return jsonify({
            "status": "fraud",
            "seller_id": seller_id,
            "message": "Verification failed - potential fraud detected",
            "verification_details": {
                "document_selfie_match": doc_match,
                "duplicate_face_found": duplicate_face,
                "duplicate_data_found": duplicate_data
            }
        })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)