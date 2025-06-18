from flask import Flask, render_template, request, redirect, url_for, session
from adv_recommendation.personalize import PersonalizeRecommender
from adv_recommendation.trending import TrendingRecommender
from database.data_add import add_user, add_product, add_interaction
import random
from datetime import datetime
import sqlite3

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # For session management

# Initialize database connection
def get_db_connection():
    conn = sqlite3.connect('database/amazon_recs.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/", methods=["GET", "POST"])
def home():
    # Initialize session for demo user
    if 'user_id' not in session:
        # Create a new demo user
        session['user_id'] = add_user(name="Demo User", email="demo@example.com")
        session['user_id'] = random.randint(1, 5)  # Randomly assign a user ID for demo purposes
    
    # Always switch demo user on each refresh (if not logged in)
    if 'logged_in' not in session or not session['logged_in']:
        session['user_id'] = random.randint(1, 5)  # Random demo user ID each time

    user_id = session['user_id']
    
    # Handle search
    if request.method == "POST":
        query = request.form.get("search", "").strip()
        if query:
            add_interaction(
                user_id=session['user_id'],
                action_type='search',
                query=query
            )
        return redirect(url_for('home'))
    
    # Get recommendations
    try:
        personalized = PersonalizeRecommender().get_recommendations(session['user_id']) or []
        trending = TrendingRecommender().get_trending() or []
    except Exception as e:
        print(f"Error getting recommendations: {e}")
        personalized = []
        trending = []
    
    # Get all products for display
    conn = get_db_connection()
    all_products = conn.execute("SELECT * FROM products").fetchall()
    conn.close()
    
    return render_template("indexrecommendation.html", 
        personalized=personalized,
        trending=trending,
        all_products=all_products
    )

@app.route("/interact/<int:product_id>/<action>")
def interact(product_id, action):
    """Record a user interaction with a product"""
    if 'user_id' not in session:
        return redirect(url_for('home'))
    
    valid_actions = ['view', 'purchase']
    if action in valid_actions:
        add_interaction(
            user_id=session['user_id'],
            product_id=product_id,
            action_type=action
        )
    return redirect(url_for('home'))

@app.route("/add_product", methods=["POST"])
def add_new_product():
    """Add a new product to the database"""
    product_data = {
        'name': request.form.get('name'),
        'category': request.form.get('category'),
        'brand': request.form.get('brand'),
        'price': float(request.form.get('price', 0)),
        'eco_score': int(request.form.get('eco_score', 80)),
        'image_url': request.form.get('image_url', ''),
        'description': request.form.get('description', '')
    }
    
    if product_data['name'] and product_data['category'] and product_data['brand']:
        add_product(product_data)
    
    return redirect(url_for('home'))

if __name__ == "__main__":
    app.run(debug=True)

# from flask import Flask, render_template, request, redirect, url_for
# from adv_recommendation.personalize import PersonalizeRecommender
# from adv_recommendation.trending import TrendingRecommender
# import sqlite3

# app = Flask(__name__)

# # Initialize database connection
# def get_db_connection():
#     conn = sqlite3.connect('database/amazon_recs.db')
#     conn.row_factory = sqlite3.Row
#     return conn

# @app.route("/", methods=["GET", "POST"])
# def home():
#     user_id = 2  # Demo user - in production would come from auth
    
#     # Handle search
#     if request.method == "POST":
#         query = request.form.get("search", "").strip()
#         if query:
#             try:
#                 conn = get_db_connection()
#                 conn.execute(
#                     "INSERT INTO interactions (user_id, action, query, timestamp) VALUES (?, ?, ?, datetime('now'))",
#                     (user_id, "search", query)
#                 )
#                 conn.commit()
#                 conn.close()
#             except Exception as e:
#                 print(f"Error logging search: {e}")
#         return redirect(url_for("home"))
    
#     # Get recommendations (with error handling)
#     try:
#         personalized = PersonalizeRecommender().get_recommendations(user_id) or []
#         trending = TrendingRecommender().get_trending() or []
#     except Exception as e:
#         print(f"Error getting recommendations: {e}")
#         personalized = []
#         trending = []
    
#     return render_template("index.html", 
#         personalized=personalized,
#         trending=trending
#     )

# if __name__ == "__main__":
#     app.run(debug=True)
    
 