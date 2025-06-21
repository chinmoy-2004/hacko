


import sqlite3
import os
from contextlib import closing

DB_PATH = os.path.join(os.path.dirname(__file__), 'sellers.db')

def create_connection():
    """Create and return a database connection."""
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        return conn
    except sqlite3.Error as e:
        raise RuntimeError(f"Database connection failed: {str(e)}")

def initialize_database():
    """Initialize the database and create tables if they don't exist."""
    try:
        with closing(create_connection()) as conn:
            cursor = conn.cursor()
            
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS sellers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                seller_id TEXT NOT NULL UNIQUE,
                name TEXT NOT NULL,
                pan TEXT NOT NULL,
                gst TEXT NOT NULL,
                doc_key TEXT NOT NULL,
                selfie_key TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """)
            
            # Create indexes for faster lookups
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_pan ON sellers (pan)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_gst ON sellers (gst)")
            
            conn.commit()
    except sqlite3.Error as e:
        raise RuntimeError(f"Database initialization failed: {str(e)}")

def insert_seller(seller_id, name, pan, gst, doc_key, selfie_key):
    """Insert a new seller into the database."""
    try:
        with closing(create_connection()) as conn:
            cursor = conn.cursor()
            
            cursor.execute("""
            INSERT INTO sellers (seller_id, name, pan, gst, doc_key, selfie_key)
            VALUES (?, ?, ?, ?, ?, ?)
            """, (seller_id, name, pan, gst, doc_key, selfie_key))
            
            conn.commit()
    except sqlite3.Error as e:
        raise RuntimeError(f"Insert failed: {str(e)}")

def get_all_encrypted_pan_gst():
    """Retrieve all encrypted PAN and GST numbers from the database."""
    try:
        with closing(create_connection()) as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT pan, gst FROM sellers")
            return [(row['pan'], row['gst']) for row in cursor.fetchall()]
    except sqlite3.Error as e:
        raise RuntimeError(f"Data retrieval failed: {str(e)}")

def get_all_selfie_keys():
    """Retrieve all selfie S3 keys from the database."""
    try:
        with closing(create_connection()) as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT selfie_key FROM sellers")
            # Return a flat list of keys, which is exactly what's needed for comparison
            return [row['selfie_key'] for row in cursor.fetchall()]
    except sqlite3.Error as e:
        raise RuntimeError(f"Selfie key retrieval failed: {str(e)}")


# Initialize database on import
initialize_database()