from flask import Flask, request, render_template, send_file, redirect, url_for
from certificate import add_details_to_certificate, add_seller_details_to_certificate
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static'
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_product_certificate', methods=['POST'])
def generate_product_certificate():
    seller_name = request.form['seller_name']
    product_name = request.form['product_name']
    product_id = request.form['product_id']
    ect_no = request.form['ect_no']
    hash_no = request.form['hash_no']

    template_path = "template-p.pdf"
    output_path = os.path.join(app.config['UPLOAD_FOLDER'], 'product_certificate.pdf')

    add_details_to_certificate(template_path, output_path, seller_name, product_name, product_id, ect_no, hash_no)
    return send_file(output_path, as_attachment=True)

@app.route('/generate_seller_certificate', methods=['POST'])
def generate_seller_certificate():
    seller_name = request.form['seller_name']
    seller_id = request.form['seller_id']

    template_path = "template-s.pdf"
    output_path = os.path.join(app.config['UPLOAD_FOLDER'], 'seller_certificate.pdf')

    add_seller_details_to_certificate(template_path, output_path, seller_name, seller_id)
    return send_file(output_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
