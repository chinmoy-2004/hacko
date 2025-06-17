from flask import Flask, render_template, request, redirect, url_for
import os
from models import repack 
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = 'static/uploads/'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/', methods=['GET', 'POST'])
def index():
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

        return render_template('index.html',
                               uploaded=True,
                               shape=shape,
                               dims=dims,
                               box_image=url_for('static', filename='box_shapes/' + box_image),
                               input_image=url_for('static', filename='uploads/' + filename))

    return render_template('index.html', uploaded=False)

if __name__ == "__main__":
    app.run(debug=True)
