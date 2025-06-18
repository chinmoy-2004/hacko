from flask import Flask, render_template, request, redirect, url_for, session
from Carbon_Karma.carbon_image import estimate_carbon_from_image
from Carbon_Karma.carbon_dis import estimate_carbon_from_description
from Carbon_Karma.database import init_db, get_carbon_estimate, save_user_action, get_user_history
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Initialize database
init_db()

@app.route('/')
def index():
    # Assign a simple user ID if none exists
    if 'user_id' not in session:
        session['user_id'] = os.urandom(16).hex()
    return render_template('indexck.html')

@app.route('/estimate', methods=['POST'])
def estimate():
    if 'image' in request.files and request.files['image'].filename != '':
        # Handle image upload
        file = request.files['image']
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        result = estimate_carbon_from_image(filepath)
        if result:
            save_user_action(session['user_id'], 'image_upload', result['total_carbon'])
            return render_template('result.html', 
                                  method='image',
                                  result=result)
    
    elif 'description' in request.form and request.form['description'].strip():
        # Handle text description
        description = request.form['description']
        estimate = estimate_carbon_from_description(description)
        
        if estimate is not None:
            save_user_action(session['user_id'], description, estimate)
            return render_template('result.html',
                                method='description',
                                result={
                                    'total_carbon': estimate,
                                    'description': description
                                })
    
    return redirect(url_for('index'))

@app.route('/history')
def history():
    if 'user_id' not in session:
        return redirect(url_for('index'))
    
    user_history = get_user_history(session['user_id'])
    total_saved = sum(item[1] for item in user_history) if user_history else 0
    
    return render_template('history.html',
                         history=user_history,
                         total_saved=total_saved)

if __name__ == '__main__':
    app.run(debug=True)