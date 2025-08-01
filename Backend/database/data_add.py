import sqlite3
from datetime import datetime
import random

# Database connection helper
def get_db():
    conn = sqlite3.connect('database/amazon_recs.db')
    conn.row_factory = sqlite3.Row
    return conn

# 1. Function to add new users
def add_user(user_id=None, name="Anonymous", email=None):
    """
    Add a single user to the database
    Args:
        user_id: Optional, will auto-increment if None
        name: User display name
        email: User email (optional)
    Returns:
        The created user_id
    """
    conn = get_db()
    try:
        if user_id is None:
            # Auto-increment if no ID provided
            cursor = conn.execute("SELECT MAX(user_id) FROM users")
            max_id = cursor.fetchone()[0] or 0
            user_id = max_id + 1
        
        conn.execute(
            "INSERT OR REPLACE INTO users (user_id, name, email) VALUES (?, ?, ?)",
            (user_id, name, email)
        )
        conn.commit()
        print(f"Added user {user_id}: {name}")
        return user_id
    except Exception as e:
        print(f"Error adding user: {e}")
        return None
    finally:
        conn.close()

# 2. Function to add new products
def add_product(product_data):
    """
    Add a product to the database
    Args:
        product_data: Dict with keys:
            - name: Product name
            - category: Product category
            - brand: Brand name
            - price: Float price
            - eco_score: Integer 0-100
            - image_url: Product image URL
            - description: Product description
            - grading: Product grade (e.g., 'A', 'B')
            - ect_no: ECT Number
    Returns:
        The created product_id
    """
    required_fields = ['name', 'category', 'brand', 'price', 'eco_score']
    if not all(field in product_data for field in required_fields):
        print("Missing required product fields")
        return None

    conn = get_db()
    try:
        # Auto-increment product ID
        cursor = conn.execute("SELECT MAX(product_id) FROM products")
        max_id = cursor.fetchone()[0] or 0
        product_id = max_id + 1

        conn.execute(
            """INSERT INTO products 
            (product_id, name, category, brand, price, eco_score, image_url, description, grading, ect_no) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                product_id,
                product_data['name'],
                product_data['category'],
                product_data['brand'],
                product_data['price'],
                product_data['eco_score'],
                product_data.get('image_url'),
                product_data.get('description', ''),
                product_data.get('grading'),
                product_data.get('ect_no')
            )
        )
        conn.commit()
        print(f"Added product {product_id}: {product_data['name']}")
        return product_id
    except Exception as e:
        print(f"Error adding product: {e}")
        return None
    finally:
        conn.close()

# 3. Function to record user interactions
def add_interaction(user_id, product_id=None, action_type="view", query=None):
    """
    Record a user interaction with a product or search
    Args:
        user_id: ID of the user
        product_id: Optional, ID of the product
        action_type: Type of action ('view', 'purchase', 'search')
        query: Optional, search query string
    """
    conn = get_db()
    try:
        # Get current timestamp
        timestamp = int(datetime.now().timestamp())

        # Insert interaction record
        conn.execute(
            """INSERT INTO interactions (user_id, product_id, action_type, timestamp, query) 
            VALUES (?, ?, ?, ?, ?)""",
            (user_id, product_id, action_type, timestamp, query)
        )
        conn.commit()
        print(f"Recorded {action_type} interaction for user {user_id}, product {product_id}")
    except Exception as e:
        print(f"Error recording interaction: {e}")
    finally:
        conn.close()

# Example usage
if __name__ == "_main_":
    # NOTE: The original init_db.py creates a file named 'amazon_recs.db'
    # This script assumes that file exists in the same directory.
    # If you run this standalone, make sure to run init_db.py first.
    
    # Example: Add a new user
    new_user_id = add_user(name="New Eco Shopper", email="new@example.com")
    
    # Example: Add a new product
    new_product = {
        'name': 'Bamboo Hairbrush',
        'category': 'Personal Care',
        'brand': 'EcoTools',
        'price': 12.99,
        'eco_score': 85,
        'image_url': 'https://example.com/bamboo_brush.jpg',
        'description': 'Sustainable bamboo hairbrush with natural bristles',
        'grading': 'A',
        'ect_no': 'ECT-3004'
    }
    new_product_id = add_product(new_product)
    
    # Example: Record an interaction
    if new_user_id and new_product_id:
        add_interaction(new_user_id, new_product_id, 'view')
        add_interaction(new_user_id, action_type='search', query='bamboo products')
        
# # Add a new user
# user_id = add_user(name="Test User")

# # Add a new product
# product_id = add_product({
#     'name': 'Reusable Straws',
#     'category': 'Kitchen',
#     'brand': 'EcoStraw',
#     'price': 9.99,
#     'eco_score': 92
# })

# # Record interaction
# add_interaction(user_id, product_id, 'purchase')

# To integrate with your Flask app:

# python
# from database.data_add import add_interaction

# @app.route('/product/<int:product_id>')
# def view_product(product_id):
#     user_id = session.get('user_id')  # Get from session
#     if user_id:
#         add_interaction(user_id, product_id, 'view')
#     # ... rest of view logic