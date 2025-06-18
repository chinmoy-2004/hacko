import os
from dotenv import load_dotenv

load_dotenv()

# AWS Credentials (Note: In production, use environment variables or AWS secrets manager)
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY_ID_GENERAL")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_ACCESS_KEY_GENERAL")
AWS_REGION = 'us-east-1'

# Database configuration
DB_NAME = 'carbon_data.db'

# Carbon footprint estimates (grams CO2 per item)
CARBON_FACTORS = {
    # Plastics
    'bottle': 500,
    'water bottle': 500,
    'plastic': 500,
    
    # Metals
    'shaker': 1000,
    'metal': 1000,
    'aluminum': 1000,
    
    # Paper
    'cup': 50,
    'paper': 50,
    
    # Glass
    'glass': 600,
    
    # Electronics
    'electronics': 2000,
    
    # Textiles
    'textile': 800,
    'cloth': 800,
    
    # Default fallbacks
    'container': 300,
    'packaging': 200
}