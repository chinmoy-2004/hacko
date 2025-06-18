import sqlite3
from datetime import datetime, timedelta

def init_db():
    conn = sqlite3.connect('database/amazon_recs.db')
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
        description TEXT
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
         "https://m.media-amazon.com/images/I/71q3J-wT1gL._AC_UL320_.jpg",
         "Biodegradable bamboo handle with BPA-free bristles"),
        
        (2, "Reusable Silicone Bags", "Household", "Stasher", 12.99, 95,
         "https://m.media-amazon.com/images/I/61Z8Jor5wIL._AC_UL320_.jpg",
         "Airtight, freezer-safe silicone storage bags"),
        
        (3, "Natural Dish Sponge", "Household", "Zero Waste Club", 5.49, 85,
         "https://m.media-amazon.com/images/I/71yFp5W2RVL._AC_UL320_.jpg",
         "Plant-based cellulose sponge with loofah"),
        
        (4, "Swedish Dishcloths", "Household", "Skoy", 9.99, 92,
         "https://m.media-amazon.com/images/I/81XeWz+GqmL._AC_UL320_.jpg",
         "Replaces 15 rolls of paper towels, biodegradable"),
        
        # Clothing & Fashion
        (5, "Organic Cotton T-Shirt", "Fashion", "PACT", 24.99, 88,
         "https://m.media-amazon.com/images/I/61+5XQhRKbL._AC_UL320_.jpg",
         "Fair trade certified, GOTS organic cotton"),
        
        (6, "Recycled Backpack", "Fashion", "Patagonia", 89.99, 94,
         "https://m.media-amazon.com/images/I/81B1XxX2mYL._AC_UL320_.jpg",
         "Made from recycled plastic bottles"),
        
        (7, "Cork Wallet", "Fashion", "Corkor", 29.99, 91,
         "https://m.media-amazon.com/images/I/71Z4gN7X-7L._AC_UL320_.jpg",
         "Vegan leather alternative, water resistant"),
        
        # Personal Care
        (8, "Shampoo Bar", "Personal Care", "Ethique", 14.99, 97,
         "https://m.media-amazon.com/images/I/61+5XQhRKbL._AC_UL320_.jpg",
         "Zero waste, lasts 80+ washes"),
        
        (9, "Reusable Makeup Pads", "Personal Care", "Greenzla", 12.49, 93,
         "https://m.media-amazon.com/images/I/71yFp5W2RVL._AC_UL320_.jpg",
         "Machine washable bamboo rounds"),
        
        (10, "Toothpaste Tablets", "Personal Care", "Bite", 19.99, 96,
          "https://m.media-amazon.com/images/I/71q3J-wT1gL._AC_UL320_.jpg",
          "Plastic-free mint toothpaste bits"),
        
        # Lifestyle
        (11, "Solar Charger", "Lifestyle", "Anker", 49.99, 89,
          "https://m.media-amazon.com/images/I/81B1XxX2mYL._AC_UL320_.jpg",
          "21W portable solar panel for devices"),
        
        (12, "Reusable Water Bottle", "Lifestyle", "Hydro Flask", 34.99, 98,
          "https://m.media-amazon.com/images/I/71Z4gN7X-7L._AC_UL320_.jpg",
          "Double-wall vacuum insulation")
    ]
    cursor.executemany("""
    INSERT INTO products 
    (product_id, name, category, brand, price, eco_score, image_url, description) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
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
    import random
    init_db()

# import sqlite3
# import random
# from faker import Faker
# from datetime import datetime

# def init_db():
#     fake = Faker()
#     conn = sqlite3.connect('database/amazon_recs.db')
#     cursor = conn.cursor()

#     # Drop existing tables
#     cursor.executescript("""
#     DROP TABLE IF EXISTS users;
#     DROP TABLE IF EXISTS products;
#     DROP TABLE IF EXISTS interactions;
#     """)

#     # Create tables with proper schema
#     cursor.execute("""
#     CREATE TABLE users (
#         user_id INTEGER PRIMARY KEY,
#         name TEXT NOT NULL,
#         location TEXT NOT NULL
#     )
#     """)

#     cursor.execute("""
#     CREATE TABLE products (
#         product_id INTEGER PRIMARY KEY,
#         name TEXT NOT NULL,
#         category TEXT NOT NULL,
#         price REAL NOT NULL,
#         eco_score INTEGER NOT NULL,
#         brand TEXT NOT NULL
#     )
#     """)

#     cursor.execute("""
#     CREATE TABLE interactions (
#         interaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
#         user_id INTEGER NOT NULL,
#         product_id INTEGER,
#         action TEXT NOT NULL,
#         query TEXT,
#         timestamp DATETIME NOT NULL,
#         FOREIGN KEY (user_id) REFERENCES users(user_id),
#         FOREIGN KEY (product_id) REFERENCES products(product_id)
#     )
#     """)

#     # Insert 100 users with guaranteed data
#     users = [(i, fake.name(), fake.country()) for i in range(1, 101)]
#     cursor.executemany("INSERT INTO users VALUES (?, ?, ?)", users)

#     # Insert 500 products with guaranteed data
#     categories = ["Kitchen", "Fashion", "Electronics", "Home", "Beauty"]
#     brands = ["EcoEarth", "GreenLife", "BioTech", "PureHome", "OrganicWear"]
#     products = [
#         (i, f"{random.choice(brands)} {random.choice(categories)} Item {i}", 
#          random.choice(categories), round(random.uniform(10, 200), 2),
#          random.randint(50, 100), random.choice(brands))
#         for i in range(1, 501)
#     ]
#     cursor.executemany("INSERT INTO products VALUES (?, ?, ?, ?, ?, ?)", products)

#     # Insert interactions ensuring at least some purchase history
#     actions = ["view", "purchase", "search"]
#     for user_id in range(1, 101):
#         # Ensure each user has at least one purchase
#         product_id = random.randint(1, 500)
#         cursor.execute(
#             "INSERT INTO interactions VALUES (NULL, ?, ?, ?, ?, ?)",
#             (user_id, product_id, "purchase", None, datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#         )
        
#         # Add random other interactions
#         for _ in range(random.randint(5, 20)):
#             product_id = random.randint(1, 500) if random.random() > 0.3 else None
#             action = random.choice(actions)
#             query = fake.word() if action == "search" else None
#             cursor.execute(
#                 "INSERT INTO interactions VALUES (NULL, ?, ?, ?, ?, ?)",
#                 (user_id, product_id, action, query, fake.date_time_between("-90d", "now").strftime("%Y-%m-%d %H:%M:%S"))
#             )

#     conn.commit()
#     conn.close()
#     print("Database initialized successfully with guaranteed purchase data!")

# if __name__ == "__main__":
#     init_db()