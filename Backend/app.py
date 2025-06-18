from flask import Flask, render_template, request, redirect, url_for, session, jsonify, send_file
import os
import uuid
import qrcode
from io import BytesIO
from werkzeug.utils import secure_filename
import sqlite3
import random
from datetime import datetime

# --- Model and Utility Imports ---
# Note: Ensure these modules are in the correct paths relative to this app.py file.
# You might need to create __init__.py files in the subdirectories.

# From Repackaging Project
from models import repack

# From Recommendation Project
from adv_recommendation.personalize import PersonalizeRecommender
from adv_recommendation.trending import TrendingRecommender
from database.data_add import add_user, add_product, add_interaction

# From Seller Registration Project
from seller_registration_fraud_detection.kms_utils import encrypt_data
from seller_registration_fraud_detection.rekognition_utils import compare_faces
from seller_registration_fraud_detection.s3_utils import upload_image, list_images, BUCKET_NAME
from seller_registration_fraud_detection.database_utils import insert_seller, get_all_encrypted_pan_gst

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
app.secret_key = 'super-secret-key-for-combined-app'

# Combined configurations
UPLOAD_FOLDER = 'static/uploads/'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESOURCE_FOLDER'] = 'resource'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 # 16MB max upload

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

        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        shape, dims, box_image = repack.detect_shape_and_box(filepath)

        return render_template('indexrepack.html',
                               uploaded=True,
                               shape=shape,
                               dims=dims,
                               box_image=url_for('static', filename='box_shapes/' + box_image),
                               input_image=url_for('static', filename='uploads/' + filename))

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
        personalized = PersonalizeRecommender().get_recommendations(session['user_id']) or []
        trending = TrendingRecommender().get_trending() or []
    except Exception as e:
        print(f"Error getting recommendations: {e}")
        personalized, trending = [], []
    
    conn = get_recomm_db_connection()
    all_products = conn.execute("SELECT * FROM products").fetchall()
    conn.close()
    
    return render_template("indexrecommendation.html", 
        personalized=personalized, trending=trending, all_products=all_products)

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
    Purpose: Adds a new product to the recommendation database.
    """
    product_data = {
        'name': request.form.get('name'), 'category': request.form.get('category'),
        'brand': request.form.get('brand'), 'price': float(request.form.get('price', 0)),
        'eco_score': int(request.form.get('eco_score', 80)), 'image_url': request.form.get('image_url', ''),
        'description': request.form.get('description', '')
    }
    if product_data['name'] and product_data['category'] and product_data['brand']:
        add_product(product_data)
    return redirect(url_for('recomm_home'))


# --- Seller Registration Fraud Detection Routes (from appseller.py) ---
@app.route("/seller", methods=["GET"])
def seller_index():
    """
    Purpose: Displays the seller registration form.
    """
    return render_template("indexsellerreg.html")

@app.route("/seller/register", methods=["POST"])
def seller_register():
    """
    Purpose: Handles seller registration, performs fraud checks, and returns the result.
    """
    name, pan, gst = request.form.get("name"), request.form.get("pan"), request.form.get("gst")
    doc_image, selfie_image = request.files.get("doc_image"), request.files.get("selfie_image")

    if not all([name, pan, gst, doc_image, selfie_image]):
        return jsonify({"status": "error", "message": "All fields are required"}), 400

    doc_key, selfie_key = f"documents/{uuid.uuid4()}_{doc_image.filename}", f"selfies/{uuid.uuid4()}_{selfie_image.filename}"
    existing_docs, existing_entries = list_images("documents"), get_all_encrypted_pan_gst()
    
    try:
        enc_pan, enc_gst = encrypt_data(pan), encrypt_data(gst)
        upload_image(doc_image.read(), doc_key)
        upload_image(selfie_image.read(), selfie_key)
        doc_match = compare_faces(BUCKET_NAME, doc_key, selfie_key)
        duplicate_face = any(compare_faces(BUCKET_NAME, existing_doc, selfie_key) for existing_doc in existing_docs)
        duplicate_data = any((enc_pan == db_pan or enc_gst == db_gst) for db_pan, db_gst in existing_entries)
    except Exception as e:
        return jsonify({"status": "error", "message": f"Verification process failed: {str(e)}"}), 500

    seller_id = str(uuid.uuid4())[:8]
    insert_seller(seller_id, name, enc_pan, enc_gst, doc_key, selfie_key)

    verification_details = {
        "document_selfie_match": doc_match, "duplicate_face_found": duplicate_face, "duplicate_data_found": duplicate_data
    }
    if doc_match and not duplicate_face and not duplicate_data:
        return jsonify({"status": "success", "seller_id": seller_id, "message": "Seller verified successfully", "verification_details": verification_details})
    else:
        return jsonify({"status": "fraud", "seller_id": seller_id, "message": "Verification failed - potential fraud detected", "verification_details": verification_details})


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
        if result:
            carbon_db.save_user_action(session['user_id'], 'image_upload', result['total_carbon'])
            return render_template('result.html', method='image', result=result)
    
    elif 'description' in request.form and request.form['description'].strip():
        description = request.form['description']
        estimate = estimate_carbon_from_description(description)
        if estimate is not None:
            carbon_db.save_user_action(session['user_id'], description, estimate)
            return render_template('result.html', method='description', result={'total_carbon': estimate, 'description': description})
    
    return redirect(url_for('carbon_index'))

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
    return redirect(url_for('bc_index'))

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


# --- Main Execution ---
if __name__ == '__main__':
    app.run(debug=True, port=5000)