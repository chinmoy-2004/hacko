from flask import Flask, render_template, request, redirect, url_for, session, jsonify, send_file
import os
import uuid
import qrcode
from io import BytesIO
from werkzeug.utils import secure_filename
import sqlite3
import random
from datetime import datetime
from flask_cors import CORS
import cloudinary
import cloudinary.uploader


# --- Model and Utility Imports ---
# Note: Ensure these modules are in the correct paths relative to this app.py file.
# You might need to create __init__.py files in the subdirectories.

# From Repackaging Project
from models import repack

# From Recommendation Project
from adv_recommendation.personalize import PersonalizedRecommender
from adv_recommendation.trending import TrendingRecommender
from database.data_add import add_user, add_product, add_interaction

from Badges_Grading_System.grading import grade_product_from_description


# From Seller Registration Fraud Detection Project

from seller_registration_fraud_detection.kms_utils import encrypt_data
from seller_registration_fraud_detection.rekognition_utils import compare_faces
from seller_registration_fraud_detection.s3_utils import upload_image, BUCKET_NAME
from seller_registration_fraud_detection.database_utils import insert_seller, get_all_encrypted_pan_gst, get_all_selfie_keys
import uuid
import traceback


# From Carbon Karma Project
from Carbon_Karma.carbon_image import estimate_carbon_from_image
from Carbon_Karma.carbon_dis import estimate_carbon_from_description
from Carbon_Karma import database as carbon_db # Aliased to avoid name conflicts

# From Certificate Project
from models.certificate import add_details_to_certificate, add_seller_details_to_certificate

# From Blockchain Project
from models import blockchain


# --- Flask App Initialization and Configuration ---
app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = 'super-secret-key-for-combined-app'

# Combined configurations
UPLOAD_FOLDER = 'static/uploads/'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESOURCE_FOLDER'] = 'resource'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 # 16MB max upload
app.config['RECOMM_DATABASE'] = 'database/amazon_recs.db'

# Folder for local processed images (box shapes)
BOX_FOLDER = 'static/box_shapes'
os.makedirs(BOX_FOLDER, exist_ok=True)

cloudinary.config(
    cloud_name="dtfz3ezoh",
    api_key="649135234683513",
    api_secret="An67jv6knNVTWwJC9kzXmD-k1Eo"
)


# --- Database Initializations ---
carbon_db.init_db()
blockchain.init_db()

# --- Helper Functions ---
def get_recomm_db_connection():
    """Database connection for the recommendation system."""
    conn = sqlite3.connect('database/amazon_recs.db')
    conn.row_factory = sqlite3.Row
    return conn

# --- Main Navigation Route ---
@app.route('/')
def main_index():
    """
    Purpose: Serves the main index page with links to all sub-projects.
    """
    return render_template('index.html')


# --- Shape-Based Packaging Routes (from apprepack.py) ---
@app.route('/repack', methods=['GET', 'POST'])
def repack_index():
    """
    Purpose: Handles file upload for shape detection and recommends packaging.
    """
    if request.method == 'POST':
        if 'shapeImage' not in request.files:
            return 'No file uploaded', 400
        file = request.files['shapeImage']
        if file.filename == '':
            return 'No selected file', 400

        # filename = secure_filename(file.filename)
        # filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        # file.save(filepath)

        # shape, dims, box_image = repack.detect_shape_and_box(filepath)

        # return render_template('indexrepack.html',
        #                        uploaded=True,
        #                        shape=shape,
        #                        dims=dims,
        #                        box_image=url_for('static', filename='box_shapes/' + box_image),
        #                        input_image=url_for('static', filename='uploads/' + filename))
        try:
            filename = secure_filename(file.filename)
            local_input_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(local_input_path)

            # Detect shape, dimensions, and get processed image filename
            shape, dims, box_image_filename = repack.detect_shape_and_box(local_input_path)

            # Upload original image to Cloudinary
            input_upload = cloudinary.uploader.upload(local_input_path, folder="repack/uploads")
            input_image_url = input_upload['secure_url']

        # Path to locally saved box-shaped image
            local_box_image_path = os.path.join(BOX_FOLDER, box_image_filename)

        # Upload processed image to Cloudinary
            box_upload = cloudinary.uploader.upload(local_box_image_path, folder="repack/box_shapes")
            box_image_url = box_upload['secure_url']

        
        
            return jsonify({
                'shape': shape,
                'dims': dims,
                'box_image': box_image_url,
                'input_image': input_image_url
            })

        except cloudinary.exceptions.Error as e:
            return jsonify({'error': f'Cloudinary error: {str(e)}'}), 500
        except Exception as e:
            return jsonify({'error': f'Server error: {str(e)}'}), 500


    return render_template('indexrepack.html', uploaded=False)


# --- Eco Recommendation System Routes (from apprecomm.py) ---

@app.route("/recommend", methods=["GET", "POST"])
def recomm_home():
    """
    Purpose: Displays personalized and trending eco-friendly product recommendations.
    """
    if 'user_id' not in session:
        session['user_id'] = random.randint(1, 5)
    if 'logged_in' not in session or not session['logged_in']:
        session['user_id'] = random.randint(1, 5)
    user_id = session['user_id']
    
    if request.method == "POST":
        query = request.form.get("search", "").strip()
        if query:
            add_interaction(user_id=session['user_id'], action_type='search', query=query)
        return redirect(url_for('recomm_home'))
    try:
        # FIX: Pass the database path explicitly and add logging.
        personalize_rec = PersonalizedRecommender()
        trending_rec = TrendingRecommender()

        print(f"Fetching recommendations for user_id: {user_id}")
        personalized = personalize_rec.get_recommendations(user_id) or []
        print(f"Found {len(personalized)} personalized items.")
        
        trending = trending_rec.get_trending() or []
        print(f"Found {len(trending)} trending items.")

    except Exception as e:
        # FIX: Add more detailed error logging to diagnose issues.
        print(f"ERROR in recomm_home: {e}")
        # traceback.print_exc()
        personalized, trending = [], []

    
    conn = get_recomm_db_connection()
    all_products = conn.execute("SELECT * FROM products").fetchall()
    conn.close()
    # print(personalized, trending, all_products)

    all_products_list = [dict(row) for row in all_products]
    
    # return render_template("indexrecommendation.html", 
    #     personalized=personalized, trending=trending, all_products=all_products)
    return jsonify({
        "personalized": personalized,
        "trending": trending,
        "all_products": all_products_list
    })

@app.route("/recommend/interact/<int:product_id>/<action>")
def recomm_interact(product_id, action):
    """
    Purpose: Records a user interaction (view, purchase) with a product.
    """
    if 'user_id' not in session:
        return redirect(url_for('recomm_home'))
    
    if action in ['view', 'purchase']:
        add_interaction(user_id=session['user_id'], product_id=product_id, action_type=action)
    return redirect(url_for('recomm_home'))

@app.route("/recommend/add_product", methods=["POST"])
def recomm_add_product():
    """
    Purpose: Adds a new product to the recommendation database and uploads image to Cloudinary.
    """
    # Handle file upload
    image_file = request.files.get('image_file')
    image_url = request.form.get('image_url', '')  # Default empty string
    print(f"Image file received: {image_file}, Image URL: {image_url}")
    
    # If image file was uploaded, upload to Cloudinary
    if image_file:
        try:
            upload_result = cloudinary.uploader.upload(image_file)
            image_url = upload_result['secure_url']
            print(f"Image uploaded to Cloudinary: {image_url}")
        except Exception as e:
            print(f"Error uploading to Cloudinary: {str(e)}")
            return redirect(url_for('recomm_home'))
   

    try:
        product_data = {
            'name': request.form['name'],
            'category': request.form['category'],
            'brand': request.form['brand'],
            'price': float(request.form['price']),
            'eco_score': int(request.form['eco_score']),
            'image_url': image_url,  # Use the uploaded URL or the provided one
            'description': request.form.get('description', ''),
            'grading': request.form.get('grading', ''),
            'ect_no': request.form.get('ect_no', '')
        }
        print(f"Attempting to add product with data: {product_data}")
        
        product_id = add_product(product_data)
        if product_id:
            print(f"Successfully added product with ID: {product_id}")
            return jsonify({"status": "success", "message": "Product added successfully"}), 201
        else:
            print("Failed to add product - missing required fields")
            return jsonify({"status": "error", "message": "Missing required product fields"}), 400
    except ValueError as ve:
        print(f"ValueError occurred: {str(ve)}")
        return jsonify({"status": "error", "message": "Invalid data format"}), 400
    except KeyError as ke:
        print(f"KeyError occurred - missing form field: {str(ke)}")
        return jsonify({"status": "error", "message": f"Missing required field: {str(ke)}"}), 400
    except Exception as e:
        print(f"Unexpected error occurred: {str(e)}")
        return jsonify({"status": "error", "message": "An unexpected error occurred"}), 500
    
    

# --- Seller Registration Fraud Detection Routes (from appseller.py) ---
@app.route("/seller", methods=["GET"])
def seller_index():
    """
    Purpose: Displays the seller registration form.
    """
    return render_template("indexsellerreg.html")

@app.route("/seller/register", methods=["POST"])
def register():
    """
    Purpose: Handles seller registration, performs fraud checks, and returns the result.
    """
    # 1. Get form data and validate
    name = request.form.get("name")
    pan = request.form.get("pan")
    gst = request.form.get("gst")
    doc_image_file = request.files.get("doc_image")
    selfie_image_file = request.files.get("selfie_image")

    if not all([name, pan, gst, doc_image_file, selfie_image_file]):
        return jsonify({"status": "error", "message": "All fields are required"}), 400

    # 2. Prepare unique keys and upload images to S3 first
    seller_id = str(uuid.uuid4())
    doc_key = f"sellers/{seller_id}/document.jpg"
    selfie_key = f"sellers/{seller_id}/selfie.jpg"

    try:
        upload_image(doc_image_file.read(), doc_key)
        upload_image(selfie_image_file.read(), selfie_key)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"status": "error", "message": f"Image upload failed: {str(e)}"}), 500

    # 3. Perform all verification checks
    try:
        # A. Compare the new document and selfie
        doc_selfie_comparison = compare_faces(BUCKET_NAME, doc_key, selfie_key)
        if "error" in doc_selfie_comparison:
            # Handle the error from Rekognition gracefully
            return jsonify({"status": "error", "message": doc_selfie_comparison['message']}), 500
        doc_selfie_match = doc_selfie_comparison.get("match", False)

        # B. Check for duplicate PAN/GST against the database
        encrypted_pan = encrypt_data(pan)
        encrypted_gst = encrypt_data(gst)
        existing_entries = get_all_encrypted_pan_gst()
        duplicate_data_found = any(
            (encrypted_pan == db_pan or encrypted_gst == db_gst)
            for db_pan, db_gst in existing_entries
        )

        # C. Check for duplicate faces against existing registered sellers from the database
        duplicate_face_found = False
        existing_selfie_keys = get_all_selfie_keys()
        for existing_key in existing_selfie_keys:
            comparison_result = compare_faces(BUCKET_NAME, selfie_key, existing_key)
            if "error" in comparison_result:
                return jsonify({"status": "error", "message": comparison_result['message']}), 500
            
            if comparison_result.get("match", False):
                duplicate_face_found = True
                break

    except Exception as e:
        traceback.print_exc()
        return jsonify({"status": "error", "message": f"Verification process failed: {str(e)}"}), 500

    # 4. Make a decision and finalize
    is_fraud = not doc_selfie_match or duplicate_data_found or duplicate_face_found
    
    verification_details = {
        "document_selfie_match": doc_selfie_match,
        "similarity": doc_selfie_comparison.get("similarity", 0),
        "duplicate_face_found": duplicate_face_found,
        "duplicate_data_found": duplicate_data_found
    }

    if not is_fraud:
        # All checks passed. NOW it's safe to register the seller.
        try:
            insert_seller(seller_id, name, encrypted_pan, encrypted_gst, doc_key, selfie_key)
            return jsonify({
                "status": "success",
                "seller_id": seller_id,
                "message": "Seller verified and registered successfully.",
                "verification_details": verification_details
            })
        except Exception as e:
            traceback.print_exc()
            return jsonify({"status": "error", "message": f"Failed to save seller data after verification: {str(e)}"}), 500
    else:
        # One or more checks failed. Do NOT save the seller.
        return jsonify({
            "status": "fraud",
            "message": "Verification failed - potential fraud detected.",
            "verification_details": verification_details
        })

# --- Carbon Karma Routes (from appCarbon_karma.py) ---
@app.route('/carbon')
def carbon_index():
    """
    Purpose: Displays the main page for Carbon Karma to estimate carbon footprint.
    """
    if 'user_id' not in session:
        session['user_id'] = os.urandom(16).hex()
    return render_template('indexck.html')

@app.route('/carbon/estimate', methods=['POST'])
def carbon_estimate():
    """
    Purpose: Estimates carbon footprint from either an image or a text description.
    """
    if 'image' in request.files and request.files['image'].filename != '':
        file = request.files['image']
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        result = estimate_carbon_from_image(filepath)
        print(result)
        if result:
            carbon_db.save_user_action(session['user_id'], 'image_upload', result['total_carbon'])
            # return render_template('result.html', method='image', result=result)
            return result,200
    
    # Handle text description
    elif 'description' in request.form and request.form['description'].strip():
        description = request.form['description']
        estimate = estimate_carbon_from_description(description)
        if estimate is not None:
            carbon_db.save_user_action(session['user_id'], description, estimate)
            result = {
                'total_carbon': estimate,
                'description': description
            }
        else:
            # FIX: If estimation fails, create a specific error message in the JSON
            # instead of letting the route fail.
            result = {'error': 'Could not estimate from description. Please try being more specific (e.g., "a 500ml plastic bottle" or "a pair of cotton jeans").'}
    
    if result:
        return jsonify(result)
    else:
        # This final error is now only for truly empty/malformed requests
        return jsonify({'error': 'Could not process the request. Please provide a valid image or description.'}), 400



@app.route('/carbon/history')
def carbon_history():
    """
    Purpose: Shows the user's history of carbon footprint estimations.
    """
    if 'user_id' not in session:
        return redirect(url_for('carbon_index'))
    user_history = carbon_db.get_user_history(session['user_id'])
    total_saved = sum(item[1] for item in user_history) if user_history else 0
    return render_template('history.html', history=user_history, total_saved=total_saved)


# --- Certificate Generator Routes (from appcerti.py) ---
@app.route('/certificate')
def certi_index():
    """
    Purpose: Displays the form to generate product and seller certificates.
    """
    return render_template('indexcertificate.html')

@app.route('/certificate/generate_product', methods=['POST'])
def certi_generate_product():
    """
    Purpose: Generates a PDF certificate for a product.
    """
    seller_name, product_name, product_id, ect_no, hash_no = request.form['seller_name'], request.form['product_name'], request.form['product_id'], request.form['ect_no'], request.form['hash_no']
    input_pdf = os.path.join(app.config['RESOURCE_FOLDER'], 'template-p.pdf')
    output_pdf = os.path.join(app.config['UPLOAD_FOLDER'], 'product_certificate.pdf')
    add_details_to_certificate(input_pdf, output_pdf, seller_name, product_name, product_id, ect_no, hash_no)
    return send_file(output_pdf, as_attachment=True)

@app.route('/certificate/generate_seller', methods=['POST'])
def certi_generate_seller():
    """
    Purpose: Generates a PDF certificate for a seller.
    """
    seller_name, seller_id = request.form['seller_name'], request.form['seller_id']
    input_pdf = os.path.join(app.config['RESOURCE_FOLDER'], 'template-s.pdf')
    output_pdf = os.path.join(app.config['UPLOAD_FOLDER'], 'seller_certificate.pdf')
    add_seller_details_to_certificate(input_pdf, output_pdf, seller_name, seller_id)
    return send_file(output_pdf, as_attachment=True)


# --- Eco Product Blockchain Routes (from appbc.py) ---
@app.route('/blockchain')
def bc_index():
    """
    Purpose: Displays the blockchain dashboard with all submitted products.
    """
    products = blockchain.get_all_products()
    return render_template('indexbc.html', products=products)

@app.route('/blockchain/submit', methods=['POST'])
def bc_submit():
    """
    Purpose: Submits a new product to the blockchain database.
    """
    data = request.form.to_dict()
    image = request.files.get('image')
    if not image: return jsonify({"error": "Image required"}), 400
    image_filename = os.path.join(UPLOAD_FOLDER, image.filename)
    image.save(image_filename)
    product_data = {
        **data, "carbon_kg": float(data["carbon_kg"]),
        "certifying_body": data.get("certifying_body", "Amazon GreenX"),
        "image_filename": image_filename
    }
    blockchain.submit_product(product_data)
    products = blockchain.get_all_products()
    # return redirect(url_for('index'))
    return products,201

@app.route('/blockchain/certify/<ect_id>', methods=['POST'])
def bc_certify(ect_id):
    """
    Purpose: Certifies a product on the blockchain.
    """
    blockchain.certify_product(ect_id)
    return redirect(url_for('bc_index'))

@app.route('/blockchain/product/<ect_id>', methods=['GET'])
def bc_get_product(ect_id):
    """
    Purpose: Retrieves and displays the data for a specific product from the blockchain.
    """
    data = blockchain.get_product(ect_id)
    return jsonify(data) if data else (jsonify({"error": "Product not found"}), 404)

@app.route('/blockchain/verify')
def bc_verify():
    """
    Purpose: Verifies a product by its ECT ID.
    """
    ect_id = request.args.get('ect_id')
    if not ect_id: return jsonify({"error": "ECT ID required"}), 400
    return redirect(url_for('bc_get_product', ect_id=ect_id))

@app.route('/blockchain/qr/<ect_id>', methods=['GET'])
def bc_get_qr(ect_id):
    """
    Purpose: Generates a QR code for a product's verification URL.
    """
    data = blockchain.get_product(ect_id)
    if not data: return jsonify({"error": "Product not found"}), 404
    verify_url = url_for('bc_get_product', ect_id=ect_id, _external=True)
    qr = qrcode.make(verify_url)
    buf = BytesIO()
    qr.save(buf)
    buf.seek(0)
    return send_file(buf, mimetype='image/png')

@app.route('/grading', methods=['GET', 'POST'])
def grading_index():
    """
    Purpose: Handles product description submission and displays AI-powered sustainability grade.
    """
    result = None
    error = None
    description = ""  # Initialize to empty string

    if request.method == 'POST':
        description = request.form.get('description', '').strip()
        if not description:
            error = "Please enter a product description to analyze."
        else:
            try:
                # Call the grading function from the imported module
                grading_result = grade_product_from_description(description)
                if grading_result:
                    return jsonify(grading_result)  # Return JSON response
                else:
                    error = "The grading service could not analyze the description. It might be too short or lack relevant details."
            except Exception as e:
                print(f"ERROR in grading_index: {e}")
                error = "An unexpected error occurred while contacting the grading service."

    # For GET requests or when there's an error
    return jsonify({
        'error': error,
        'description': description,
        'result': result
    })


@app.route('/get_all_product')
def getallproduct():
    """
    Purpose: gett all products of a seller.
    """
    products = blockchain.get_all_products()
    # return redirect(url_for('index'))
    return products,201


# --- Main Execution ---
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)


