# # File: models/blockchain.py
# import sqlite3, json, hashlib, os
# from datetime import datetime

# DB_PATH = 'eco_blockchain.db'
# UPLOAD_DIR = 'uploads'
# os.makedirs(UPLOAD_DIR, exist_ok=True)

# def connect_db():
#     return sqlite3.connect(DB_PATH)

# def init_db():
#     conn = connect_db()
#     c = conn.cursor()
#     c.execute('''
#         CREATE TABLE IF NOT EXISTS ledger (
#             block_id INTEGER PRIMARY KEY AUTOINCREMENT,
#             ect_id TEXT,
#             product_id TEXT,
#             product_name TEXT,
#             manufacturer TEXT,
#             location TEXT,
#             category TEXT,
#             materials TEXT,
#             carbon_kg REAL,
#             notes TEXT,
#             eco_certified INTEGER,
#             certifying_body TEXT,
#             issued_at TEXT,
#             image_filename TEXT,
#             previous_hash TEXT,
#             block_hash TEXT
#         )
#     ''')
#     conn.commit()
#     conn.close()

# def calculate_hash(data):
#     block_string = json.dumps(data, sort_keys=True).encode()
#     return hashlib.sha256(block_string).hexdigest()

# def get_previous_hash():
#     conn = connect_db()
#     c = conn.cursor()
#     c.execute("SELECT block_hash FROM ledger ORDER BY block_id DESC LIMIT 1")
#     row = c.fetchone()
#     conn.close()
#     return row[0] if row else "0"

# def generate_ect_id(product_id):
#     return f"ECT-{product_id}-{int(datetime.utcnow().timestamp())}"

# def submit_product(data):
#     conn = connect_db()
#     c = conn.cursor()

#     ect_id = generate_ect_id(data["product_id"])
#     timestamp = datetime.utcnow().isoformat()
#     previous_hash = get_previous_hash()

#     block_data = {
#         "ect_id": ect_id,
#         "product_id": data["product_id"],
#         "product_name": data["product_name"],
#         "manufacturer": data["manufacturer"],
#         "location": data["location"],
#         "category": data["category"],
#         "materials": data["materials"],
#         "carbon_kg": data["carbon_kg"],
#         "notes": data["notes"],
#         "eco_certified": 0,
#         "certifying_body": data["certifying_body"],
#         "issued_at": timestamp,
#         "image_filename": data["image_filename"],
#         "previous_hash": previous_hash
#     }

#     block_hash = calculate_hash(block_data)

#     c.execute('''INSERT INTO ledger (
#         ect_id, product_id, product_name, manufacturer, location, category, materials,
#         carbon_kg, notes, eco_certified, certifying_body, issued_at,
#         image_filename, previous_hash, block_hash
#     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
#               (ect_id, data["product_id"], data["product_name"], data["manufacturer"],
#                data["location"], data["category"], data["materials"],
#                data["carbon_kg"], data["notes"], 0, data["certifying_body"],
#                timestamp, data["image_filename"], previous_hash, block_hash))

#     conn.commit()
#     conn.close()
#     return ect_id

# def certify_product(ect_id):
#     conn = connect_db()
#     c = conn.cursor()
#     c.execute("UPDATE ledger SET eco_certified = 1 WHERE ect_id = ?", (ect_id,))
#     conn.commit()
#     conn.close()

# def get_product(ect_id):
#     conn = connect_db()
#     c = conn.cursor()
#     c.execute("SELECT * FROM ledger WHERE ect_id = ?", (ect_id,))
#     row = c.fetchone()
#     conn.close()
#     if not row:
#         return None
#     fields = [desc[0] for desc in c.description]
#     return dict(zip(fields, row))

# # File: models/blockchain.py
# import sqlite3, json, hashlib, os
# from datetime import datetime

# DB_PATH = 'eco_blockchain.db'
# UPLOAD_DIR = 'uploads'
# os.makedirs(UPLOAD_DIR, exist_ok=True)

# def connect_db():
#     return sqlite3.connect(DB_PATH)

# def init_db():
#     conn = connect_db()
#     c = conn.cursor()
#     c.execute('''
#         CREATE TABLE IF NOT EXISTS ledger (
#             block_id INTEGER PRIMARY KEY AUTOINCREMENT,
#             ect_id TEXT,
#             product_id TEXT,
#             product_name TEXT,
#             manufacturer TEXT,
#             location TEXT,
#             category TEXT,
#             materials TEXT,
#             carbon_kg REAL,
#             notes TEXT,
#             eco_certified INTEGER,
#             certifying_body TEXT,
#             issued_at TEXT,
#             image_filename TEXT,
#             previous_hash TEXT,
#             block_hash TEXT
#         )
#     ''')
#     conn.commit()
#     conn.close()

# def calculate_hash(data):
#     block_string = json.dumps(data, sort_keys=True).encode()
#     return hashlib.sha256(block_string).hexdigest()

# def get_previous_hash():
#     conn = connect_db()
#     c = conn.cursor()
#     c.execute("SELECT block_hash FROM ledger ORDER BY block_id DESC LIMIT 1")
#     row = c.fetchone()
#     conn.close()
#     return row[0] if row else "0"

# def generate_ect_id(product_id):
#     return f"ECT-{product_id}-{int(datetime.utcnow().timestamp())}"

# def submit_product(data):
#     conn = connect_db()
#     c = conn.cursor()

#     ect_id = generate_ect_id(data["product_id"])
#     timestamp = datetime.utcnow().isoformat()
#     previous_hash = get_previous_hash()

#     block_data = {
#         "ect_id": ect_id,
#         "product_id": data["product_id"],
#         "product_name": data["product_name"],
#         "manufacturer": data["manufacturer"],
#         "location": data["location"],
#         "category": data["category"],
#         "materials": data["materials"],
#         "carbon_kg": data["carbon_kg"],
#         "notes": data["notes"],
#         "eco_certified": 0,
#         "certifying_body": data["certifying_body"],
#         "issued_at": timestamp,
#         "image_filename": data["image_filename"],
#         "previous_hash": previous_hash
#     }

#     block_hash = calculate_hash(block_data)

#     c.execute('''INSERT INTO ledger (
#         ect_id, product_id, product_name, manufacturer, location, category, materials,
#         carbon_kg, notes, eco_certified, certifying_body, issued_at,
#         image_filename, previous_hash, block_hash
#     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
#               (ect_id, data["product_id"], data["product_name"], data["manufacturer"],
#                data["location"], data["category"], data["materials"],
#                data["carbon_kg"], data["notes"], 0, data["certifying_body"],
#                timestamp, data["image_filename"], previous_hash, block_hash))

#     conn.commit()
#     conn.close()
#     return ect_id

# def certify_product(ect_id):
#     conn = connect_db()
#     c = conn.cursor()
#     c.execute("UPDATE ledger SET eco_certified = 1 WHERE ect_id = ?", (ect_id,))
#     conn.commit()
#     conn.close()

# def get_product(ect_id):
#     conn = connect_db()
#     c = conn.cursor()
#     c.execute("SELECT * FROM ledger WHERE ect_id = ?", (ect_id,))
#     row = c.fetchone()
#     if not row:
#         conn.close()
#         return None
#     fields = [desc[0] for desc in c.description]
#     result = dict(zip(fields, row))
#     conn.close()
#     return result

# def get_all_products():
#     conn = connect_db()
#     c = conn.cursor()
#     c.execute("SELECT * FROM ledger ORDER BY block_id DESC")
#     rows = c.fetchall()
#     fields = [desc[0] for desc in c.description]
#     conn.close()
#     return [dict(zip(fields, row)) for row in rows]


# File: models/blockchain.py
import sqlite3, json, hashlib, os
from datetime import datetime

DB_PATH = 'eco_blockchain.db'
UPLOAD_DIR = 'uploads'
os.makedirs(UPLOAD_DIR, exist_ok=True)

def connect_db():
    return sqlite3.connect(DB_PATH)

def init_db():
    conn = connect_db()
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS ledger (
            block_id INTEGER PRIMARY KEY AUTOINCREMENT,
            ect_id TEXT,
            product_id TEXT,
            product_name TEXT,
            manufacturer TEXT,
            location TEXT,
            category TEXT,
            materials TEXT,
            carbon_kg REAL,
            notes TEXT,
            eco_certified INTEGER,
            certifying_body TEXT,
            issued_at TEXT,
            image_filename TEXT,
            previous_hash TEXT,
            block_hash TEXT
        )
    ''')
    conn.commit()
    conn.close()

def calculate_hash(data):
    block_string = json.dumps(data, sort_keys=True).encode()
    return hashlib.sha256(block_string).hexdigest()

def get_previous_hash():
    conn = connect_db()
    c = conn.cursor()
    c.execute("SELECT block_hash FROM ledger ORDER BY block_id DESC LIMIT 1")
    row = c.fetchone()
    conn.close()
    return row[0] if row else "0"

def generate_ect_id(product_id):
    return f"ECT-{product_id}-{int(datetime.utcnow().timestamp())}"

def submit_product(data):
    conn = connect_db()
    c = conn.cursor()

    ect_id = generate_ect_id(data["product_id"])
    timestamp = datetime.utcnow().isoformat()
    previous_hash = get_previous_hash()

    block_data = {
        "ect_id": ect_id,
        "product_id": data["product_id"],
        "product_name": data["product_name"],
        "manufacturer": data["manufacturer"],
        "location": data["location"],
        "category": data["category"],
        "materials": data["materials"],
        "carbon_kg": data["carbon_kg"],
        "notes": data["notes"],
        "eco_certified": 0,
        "certifying_body": data["certifying_body"],
        "issued_at": timestamp,
        "image_filename": data["image_filename"],
        "previous_hash": previous_hash
    }

    block_hash = calculate_hash(block_data)

    c.execute('''INSERT INTO ledger (
        ect_id, product_id, product_name, manufacturer, location, category, materials,
        carbon_kg, notes, eco_certified, certifying_body, issued_at,
        image_filename, previous_hash, block_hash
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
              (ect_id, data["product_id"], data["product_name"], data["manufacturer"],
               data["location"], data["category"], data["materials"],
               data["carbon_kg"], data["notes"], 0, data["certifying_body"],
               timestamp, data["image_filename"], previous_hash, block_hash))

    conn.commit()
    conn.close()
    return ect_id

def certify_product(ect_id):
    conn = connect_db()
    c = conn.cursor()
    c.execute("UPDATE ledger SET eco_certified = 1 WHERE ect_id = ?", (ect_id,))
    conn.commit()
    conn.close()

def get_product(ect_id):
    conn = connect_db()
    c = conn.cursor()
    c.execute("SELECT * FROM ledger WHERE ect_id = ?", (ect_id,))
    row = c.fetchone()
    if not row:
        conn.close()
        return None
    fields = [desc[0] for desc in c.description]
    result = dict(zip(fields, row))
    conn.close()
    return result

def get_all_products():
    conn = connect_db()
    c = conn.cursor()
    c.execute("SELECT * FROM ledger ORDER BY block_id DESC")
    rows = c.fetchall()
    fields = [desc[0] for desc in c.description]
    conn.close()
    return [dict(zip(fields, row)) for row in rows]
