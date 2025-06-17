from flask import Flask, request, render_template, send_file
from models.certificate import add_details_to_certificate, add_seller_details_to_certificate
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static'
app.config['RESOURCE_FOLDER'] = 'resource'

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

    input_pdf = os.path.join(app.config['RESOURCE_FOLDER'], 'template-p.pdf')
    output_pdf = os.path.join(app.config['UPLOAD_FOLDER'], 'product_certificate.pdf')

    add_details_to_certificate(input_pdf, output_pdf, seller_name, product_name, product_id, ect_no, hash_no)
    return send_file(output_pdf, as_attachment=True)

@app.route('/generate_seller_certificate', methods=['POST'])
def generate_seller_certificate():
    seller_name = request.form['seller_name']
    seller_id = request.form['seller_id']

    input_pdf = os.path.join(app.config['RESOURCE_FOLDER'], 'template-s.pdf')
    output_pdf = os.path.join(app.config['UPLOAD_FOLDER'], 'seller_certificate.pdf')

    add_seller_details_to_certificate(input_pdf, output_pdf, seller_name, seller_id)
    return send_file(output_pdf, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
