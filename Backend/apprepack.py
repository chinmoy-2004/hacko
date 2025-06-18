# from flask import Flask, render_template, request, redirect, url_for
# import os
# from models import repack 
# from werkzeug.utils import secure_filename
# from flask_cors import CORS

# app = Flask(__name__)

# UPLOAD_FOLDER = 'static/uploads/'
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# CORS(app, supports_credentials=True)

# @app.route('/', methods=['GET', 'POST'])

# @app.route('/upload', methods=[ 'POST'])
# def index():
#     if request.method == 'POST':
#         if 'shapeImage' not in request.files:
#             return 'No file uploaded', 400

#         file = request.files['shapeImage']
#         if file.filename == '':
#             return 'No selected file', 400

#         filename = secure_filename(file.filename)
#         filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#         file.save(filepath)

#         shape, dims, box_image = repack.detect_shape_and_box(filepath)

#         return render_template('indexrepack.html',
#                                uploaded=True,
#                                shape=shape,
#                                dims=dims,
#                                box_image=url_for('static', filename='box_shapes/' + box_image),
#                                input_image=url_for('static', filename='uploads/' + filename))

#     return render_template('indexrepack.html', uploaded=False)

# if __name__ == '__main__':
#     app.run(debug=True, host="0.0.0.0", port=5000)


#change for second time

# from flask import Flask, request, jsonify, url_for
# from flask_cors import CORS
# from werkzeug.utils import secure_filename
# import os
# from models import repack  # make sure repack.py has detect_shape_and_box

# app = Flask(__name__)
# CORS(app, supports_credentials=True)

# UPLOAD_FOLDER = 'static/uploads/'
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# @app.route('/upload', methods=['POST'])
# def upload_image():
#     if 'shapeImage' not in request.files:
#         return jsonify({'error': 'No file uploaded'}), 400

#     file = request.files['shapeImage']
#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400

#     filename = secure_filename(file.filename)
#     filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#     file.save(filepath)

#     # Call your OpenCV processing function
#     shape, dims, box_image = repack.detect_shape_and_box(filepath)

#     return jsonify({
#         'shape': shape,
#         'dims': dims,
#         'box_image': url_for('static', filename='box_shapes/' + box_image),
#         'input_image': url_for('static', filename='uploads/' + filename)
#     })

# if __name__ == '__main__':
#     app.run(debug=True, host="0.0.0.0", port=5000)


#configure with cloudinary

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import cloudinary
import cloudinary.uploader
from models import repack  # ensure this file has detect_shape_and_box function

# Initialize Flask app
app = Flask(__name__)
CORS(app, supports_credentials=True)

# Folder for temporary local uploads
UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Folder for local processed images (box shapes)
BOX_FOLDER = 'static/box_shapes'
os.makedirs(BOX_FOLDER, exist_ok=True)

# Cloudinary config (✅ You MUST use correct credentials here)
cloudinary.config(
    cloud_name="dtfz3ezoh",
    api_key="649135234683513",
    api_secret="An67jv6knNVTWwJC9kzXmD-k1Eo"
)

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'shapeImage' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['shapeImage']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Save uploaded file locally
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


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
