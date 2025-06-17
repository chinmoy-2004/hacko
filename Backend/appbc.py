# # File: app.py
# from flask import Flask, request, jsonify, send_file
# import os
# import qrcode
# from io import BytesIO
# from models import blockchain
# from flask import render_template




# app = Flask(__name__)
# UPLOAD_FOLDER = 'uploads'
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# # Initialize DB on startup
# blockchain.init_db()

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/submit', methods=['POST'])
# def submit():
#     data = request.form.to_dict()
#     image = request.files['image']

#     if not image:
#         return jsonify({"error": "Image required"}), 400

#     image_filename = os.path.join(UPLOAD_FOLDER, image.filename)
#     image.save(image_filename)

#     required_keys = ["product_id", "product_name", "manufacturer", "location", "materials",
#                      "carbon_kg", "notes", "category"]
#     for key in required_keys:
#         if key not in data:
#             return jsonify({"error": f"Missing field: {key}"}), 400

#     product_data = {
#         **data,
#         "carbon_kg": float(data["carbon_kg"]),
#         "certifying_body": data.get("certifying_body", "Amazon GreenX"),
#         "image_filename": image_filename
#     }

#     ect_id = blockchain.submit_product(product_data)
#     return jsonify({"message": "Product submitted", "ect_id": ect_id})

# @app.route('/certify/<ect_id>', methods=['POST'])
# def certify(ect_id):
#     blockchain.certify_product(ect_id)
#     return jsonify({"message": f"Product {ect_id} certified."})

# @app.route('/product/<ect_id>', methods=['GET'])
# def get_product(ect_id):
#     data = blockchain.get_product(ect_id)
#     if not data:
#         return jsonify({"error": "Product not found"}), 404
#     return jsonify(data)

# @app.route('/qr/<ect_id>', methods=['GET'])
# def get_qr(ect_id):
#     data = blockchain.get_product(ect_id)
#     if not data:
#         return jsonify({"error": "Product not found"}), 404

#     verify_url = f"http://localhost:5000/product/{ect_id}"
#     qr = qrcode.make(verify_url)
#     buf = BytesIO()
#     qr.save(buf)
#     buf.seek(0)
#     return send_file(buf, mimetype='image/png')

# if __name__ == '__main__':
#     app.run(debug=True)

# File: app.py
from flask import Flask, request, jsonify, send_file, render_template, redirect, url_for
import os
import qrcode
from io import BytesIO
from models import blockchain

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize DB on startup
blockchain.init_db()

@app.route('/')
def index():
    products = blockchain.get_all_products()
    return render_template('index.html', products=products)

@app.route('/submit', methods=['POST'])
def submit():
    data = request.form.to_dict()
    image = request.files.get('image')

    if not image:
        return jsonify({"error": "Image required"}), 400

    image_filename = os.path.join(UPLOAD_FOLDER, image.filename)
    image.save(image_filename)

    required_keys = ["product_id", "product_name", "manufacturer", "location", "materials",
                     "carbon_kg", "notes", "category"]
    for key in required_keys:
        if key not in data:
            return jsonify({"error": f"Missing field: {key}"}), 400

    product_data = {
        **data,
        "carbon_kg": float(data["carbon_kg"]),
        "certifying_body": data.get("certifying_body", "Amazon GreenX"),
        "image_filename": image_filename
    }

    ect_id = blockchain.submit_product(product_data)
    return redirect(url_for('index'))

@app.route('/certify/<ect_id>', methods=['POST'])
def certify(ect_id):
    blockchain.certify_product(ect_id)
    return redirect(url_for('index'))

@app.route('/product/<ect_id>', methods=['GET'])
def get_product(ect_id):
    data = blockchain.get_product(ect_id)
    if not data:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(data)

@app.route('/verify')
def verify():
    ect_id = request.args.get('ect_id')
    if not ect_id:
        return jsonify({"error": "ECT ID required"}), 400
    return redirect(url_for('get_product', ect_id=ect_id))

@app.route('/qr/<ect_id>', methods=['GET'])
def get_qr(ect_id):
    data = blockchain.get_product(ect_id)
    if not data:
        return jsonify({"error": "Product not found"}), 404

    verify_url = f"http://localhost:5000/product/{ect_id}"
    qr = qrcode.make(verify_url)
    buf = BytesIO()
    qr.save(buf)
    buf.seek(0)
    return send_file(buf, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
