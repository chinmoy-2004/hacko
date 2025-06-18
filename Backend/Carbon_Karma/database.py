import sqlite3
from Carbon_Karma.config import DB_NAME

def init_db():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    
    # Create tables if they don't exist
    c.execute('''CREATE TABLE IF NOT EXISTS products
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT,
                  carbon_footprint REAL)''')
                  
    c.execute('''CREATE TABLE IF NOT EXISTS user_actions
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  user_id TEXT,
                  product_name TEXT,
                  carbon_saved REAL,
                  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')
    
    # Insert some sample products if empty
    c.execute("SELECT COUNT(*) FROM products")
    if c.fetchone()[0] == 0:
        sample_products = [
            ('plastic bottle', 500),
            ('aluminum can', 1000),
            ('paper cup', 50),
            ('smartphone', 2000),
            ('cotton t-shirt', 800)
        ]
        c.executemany("INSERT INTO products (name, carbon_footprint) VALUES (?, ?)", sample_products)
    
    conn.commit()
    conn.close()

def get_carbon_estimate(product_name):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    
    # Search for exact match first
    c.execute("SELECT carbon_footprint FROM products WHERE name=?", (product_name.lower(),))
    result = c.fetchone()
    
    if not result:
        # Search for partial match
        c.execute("SELECT carbon_footprint FROM products WHERE name LIKE ?", (f'%{product_name.lower()}%',))
        result = c.fetchone()
    
    conn.close()
    return result[0] if result else None

def save_user_action(user_id, product_name, carbon_saved):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    
    c.execute("INSERT INTO user_actions (user_id, product_name, carbon_saved) VALUES (?, ?, ?)",
              (user_id, product_name, carbon_saved))
    
    conn.commit()
    conn.close()

def get_user_history(user_id):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    
    c.execute("SELECT product_name, carbon_saved, timestamp FROM user_actions WHERE user_id=? ORDER BY timestamp DESC", (user_id,))
    results = c.fetchall()
    
    conn.close()
    return results