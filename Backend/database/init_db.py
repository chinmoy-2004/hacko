import sqlite3
import random
from datetime import datetime, timedelta

def init_db():
    conn = sqlite3.connect('amazon_recs.db')
    cursor = conn.cursor()

    # Drop existing tables
    cursor.executescript("""
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS interactions;
    """)

    # Create tables with image support
    cursor.execute("""
    CREATE TABLE users (
        user_id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE products (
        product_id INTEGER PRIMARY KEY,
        name TEXT,
        category TEXT,
        brand TEXT,
        price REAL,
        eco_score INTEGER,
        image_url TEXT,
        description TEXT,
        grading TEXT,
        ect_no TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE interactions (
        interaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        product_id INTEGER,
        action TEXT,
        timestamp DATETIME
    )
    """)

    # Insert 5 simple users
    users = [
        (1, "Eco Enthusiast", "eco@example.com"),
        (2, "Sustainable Shopper", "sustainable@example.com"),
        (3, "Green Beginner", "green@example.com"),
        (4, "Zero Waste Advocate", "zerowaste@example.com"),
        (5, "Climate Conscious", "climate@example.com")
    ]
    cursor.executemany("INSERT INTO users VALUES (?, ?, ?)", users)

    # Insert 20 curated eco-products with images
    products = [
        # Household & Kitchen
        (1, "Bamboo Toothbrush", "Household", "Brush with Bamboo", 4.99, 90, 
         "https://m.media-amazon.com/images/I/71q3J-wT1gL.AC_UL320.jpg",
         "Biodegradable bamboo handle with BPA-free bristles", "A", "ECT-1001"),
        
        (2, "Reusable Silicone Bags", "Household", "Stasher", 12.99, 95,
         "https://m.media-amazon.com/images/I/61Z8Jor5wIL.AC_UL320.jpg",
         "Airtight, freezer-safe silicone storage bags", "A+", "ECT-1002"),
        
        (3, "Natural Dish Sponge", "Household", "Zero Waste Club", 5.49, 85,
         "https://m.media-amazon.com/images/I/71yFp5W2RVL.AC_UL320.jpg",
         "Plant-based cellulose sponge with loofah", "B", "ECT-1003"),
        
        (4, "Swedish Dishcloths", "Household", "Skoy", 9.99, 92,
         "https://m.media-amazon.com/images/I/81XeWz+GqmL.AC_UL320.jpg",
         "Replaces 15 rolls of paper towels, biodegradable", "A", "ECT-1004"),
        
        # Clothing & Fashion
        (5, "Organic Cotton T-Shirt", "Fashion", "PACT", 24.99, 88,
         "https://m.media-amazon.com/images/I/61+5XQhRKbL.AC_UL320.jpg",
         "Fair trade certified, GOTS organic cotton", "A+", "ECT-2001"),
        
        (6, "Recycled Backpack", "Fashion", "Patagonia", 89.99, 94,
         "https://m.media-amazon.com/images/I/81B1XxX2mYL.AC_UL320.jpg",
         "Made from recycled plastic bottles", "A", "ECT-2002"),
        
        (7, "Cork Wallet", "Fashion", "Corkor", 29.99, 91,
         "https://m.media-amazon.com/images/I/71Z4gN7X-7L.AC_UL320.jpg",
         "Vegan leather alternative, water resistant", "A", "ECT-2003"),
        
        # Personal Care
        (8, "Shampoo Bar", "Personal Care", "Ethique", 14.99, 97,
         "https://m.media-amazon.com/images/I/61+5XQhRKbL.AC_UL320.jpg",
         "Zero waste, lasts 80+ washes", "A++", "ECT-3001"),
        
        (9, "Reusable Makeup Pads", "Personal Care", "Greenzla", 12.49, 93,
         "https://m.media-amazon.com/images/I/71yFp5W2RVL.AC_UL320.jpg",
         "Machine washable bamboo rounds", "A", "ECT-3002"),
        
        (10, "Toothpaste Tablets", "Personal Care", "Bite", 19.99, 96,
          "https://m.media-amazon.com/images/I/71q3J-wT1gL.AC_UL320.jpg",
          "Plastic-free mint toothpaste bits", "A+", "ECT-3003"),
        
        # Lifestyle
        (11, "Solar Charger", "Lifestyle", "Anker", 49.99, 89,
          "https://m.media-amazon.com/images/I/81B1XxX2mYL.AC_UL320.jpg",
          "21W portable solar panel for devices", "B", "ECT-4001"),
        
        (12, "Reusable Water Bottle", "Lifestyle", "Hydro Flask", 34.99, 98,
          "https://m.media-amazon.com/images/I/71Z4gN7X-7L.AC_UL320.jpg",
          "Double-wall vacuum insulation", "A+", "ECT-4002")
    ]
    cursor.executemany("""
    INSERT INTO products 
    (product_id, name, category, brand, price, eco_score, image_url, description, grading, ect_no) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, products)

    # Create realistic interactions
    actions = ["view", "purchase"]
    for user_id in range(1, 6):
        # Each user purchases 2-3 random products
        purchased = random.sample(range(1, 13), random.randint(2, 3))
        for pid in purchased:
            cursor.execute("""
            INSERT INTO interactions (user_id, product_id, action, timestamp)
            VALUES (?, ?, ?, ?)
            """, (user_id, pid, "purchase", datetime.now() - timedelta(days=random.randint(1, 30))))
        
        # Each user views 5-8 products
        viewed = random.sample(range(1, 13), random.randint(5, 8))
        for pid in viewed:
            if pid not in purchased:  # Don't duplicate purchases
                cursor.execute("""
                INSERT INTO interactions (user_id, product_id, action, timestamp)
                VALUES (?, ?, ?, ?)
                """, (user_id, pid, "view", datetime.now() - timedelta(days=random.randint(1, 30))))

    conn.commit()
    conn.close()
    print("Success! Created database with:")
    print("- 5 demo users")
    print("- 12 curated eco-products with images")
    print("- Realistic purchase/view interactions")

if __name__ == "__main__":
    init_db()