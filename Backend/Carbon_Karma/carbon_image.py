

# import boto3
# from PIL import Image
# from Carbon_Karma.config import AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION, CARBON_FACTORS
# import io
# import os
# import google.generativeai as genai
# import re
# from dotenv import load_dotenv

# # Load environment variables from .env file
# load_dotenv()

# # --- Gemini API Configuration ---
# try:
#     GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
#     if not GEMINI_API_KEY:
#         raise ValueError("GEMINI_API_KEY not found in .env file or environment variables.")
    
#     genai.configure(api_key=GEMINI_API_KEY)
    
#     # Initialize the generative model. 'gemini-1.5-flash-latest' is a fast and capable model.
#     model = genai.GenerativeModel('gemini-1.5-flash-latest')
    
# except Exception as e:
#     print(f"Error initializing Gemini API: {e}")
#     model = None

# def estimate_carbon_from_description(description):
#     """
#     Estimates carbon footprint from a text description using the Gemini API.
#     """
#     if not model:
#         print("Gemini model not initialized. Cannot perform estimation.")
#         return None

#     prompt = f"""What is the estimated manufacturing carbon footprint for a typical consumer item identified as '{description}'?
#     Provide the answer in grams of CO2 equivalent (gCO2e).
#     Consider the raw material extraction, manufacturing, and processing. Do not include transportation to the consumer or end-of-life emissions.
    
#     Respond ONLY with a single integer.
#     For example, if the item is 'Cotton T-Shirt', a valid response is '2500'.
#     If a reasonable estimate cannot be determined, respond with '0'.
#     Item: {description}"""
    
#     try:
#         response = model.generate_content(
#             prompt,
#             generation_config={
#                 "temperature": 0.1 # A low temperature for more predictable, factual responses
#             }
#         )
        
#         result_text = response.text.strip()

#         # Extract the first number found in the response for robustness.
#         numbers = re.findall(r'\d+', result_text)
        
#         if numbers:
#             carbon_value = int(numbers[0])
#             # As per the prompt, a '0' response means the model could not estimate.
#             if carbon_value > 0:
#                 return carbon_value
        
#         # Return None if no valid number is found or if the model returns 0.
#         return None

#     except Exception as e:
#         print(f"An error occurred while calling the Gemini API: {e}")
#         return None

# def analyze_image(image_bytes):
#     """Analyze image using AWS Rekognition"""
#     try:
#         client = boto3.client(
#             'rekognition',
#             aws_access_key_id=AWS_ACCESS_KEY,
#             aws_secret_access_key=AWS_SECRET_KEY,
#             region_name=AWS_REGION
#         )
        
#         response = client.detect_labels(
#             Image={'Bytes': image_bytes},
#             MaxLabels=10,
#             MinConfidence=70
#         )
#         return response['Labels']
#     except Exception as e:
#         print(f"Error analyzing image: {e}")
#         return None

# def process_image_file(image_path):
#     """Convert image to proper format if needed"""
#     try:
#         img = Image.open(image_path)
#         if img.format != 'JPEG':
#             img = img.convert("RGB")
#             byte_arr = io.BytesIO()
#             img.save(byte_arr, format='JPEG')
#             return byte_arr.getvalue()
#         else:
#             with open(image_path, 'rb') as f:
#                 return f.read()
#     except Exception as e:
#         print(f"Error processing image: {e}")
#         return None

# def estimate_carbon_from_image(image_path):
#     """Estimate carbon footprint from image using AWS Rekognition and Gemini."""
#     image_bytes = process_image_file(image_path)
#     if not image_bytes:
#         return None
    
#     labels = analyze_image(image_bytes)
#     if not labels:
#         return None
    
#     carbon_estimate = 0
#     matched_items = []
#     unmatched_items = []
    
#     for label in labels:
#         label_name_lower = label['Name'].lower()
#         label_name_original = label['Name']
#         confidence = label['Confidence']
#         matched = False
        
#         # 1. Check for local exact matches first
#         for item, carbon in CARBON_FACTORS.items():
#             if item in label_name_lower:
#                 carbon_estimate += carbon
#                 matched_items.append({
#                     'item': label_name_original,
#                     'confidence': confidence,
#                     'carbon': carbon,
#                     'source': 'local'
#                 })
#                 matched = True
#                 break
        
#         # 2. If not matched locally, use Gemini if it's available
#         if not matched and model:
#             print(f"Item '{label_name_original}' not in local DB. Querying Gemini...")
#             gemini_carbon = estimate_carbon_from_description(label_name_original)
            
#             if gemini_carbon:
#                 carbon_estimate += gemini_carbon
#                 matched_items.append({
#                     'item': label_name_original,
#                     'confidence': confidence,
#                     'carbon': gemini_carbon,
#                     'source': 'gemini'
#                 })
#                 matched = True
#             else:
#                 print(f"Gemini could not estimate carbon for '{label_name_original}'.")

#         # 3. If still not matched, add to unmatched list
#         if not matched:
#             unmatched_items.append({
#                 'name': label_name_original,
#                 'confidence': confidence
#             })
    
#     return {
#         'total_carbon': carbon_estimate,
#         'matched_items': matched_items,
#         'unmatched_items': unmatched_items,
#         'all_labels': [{'name': l['Name'], 'confidence': l['Confidence']} for l in labels]
#     }

import boto3
from PIL import Image
from Carbon_Karma.config import AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION, CARBON_FACTORS
import io
import os
import google.generativeai as genai
import re
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# --- Gemini API Configuration ---
try:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY not found in .env file or environment variables.")
    
    genai.configure(api_key=GEMINI_API_KEY)
    
    # Initialize the generative model. 'gemini-1.5-flash-latest' is a fast and capable model.
    model = genai.GenerativeModel('gemini-1.5-flash-latest')
    
except Exception as e:
    print(f"Error initializing Gemini API: {e}")
    model = None

def estimate_carbon_from_description(description):
    """
    Estimates carbon footprint from a text description using the Gemini API.
    """
    if not model:
        print("Gemini model not initialized. Cannot perform estimation.")
        return None

    prompt = f"""What is the estimated manufacturing carbon footprint for a typical consumer item identified as '{description}'?
    Provide the answer in grams of CO2 equivalent (gCO2e).
    Consider the raw material extraction, manufacturing, and processing. Do not include transportation to the consumer or end-of-life emissions.
    if you cannot determine a reasonable estimate, respond with some creativity to any value between 100-400 based on the item.
    Respond ONLY with a single integer.
    For example, if the item is 'Cotton T-Shirt', a valid response is '2500'.
    If a reasonable estimate cannot be determined, then Think creatively and tell some accurate value between 100 and 460 and nothing else.
    some examples of items are:
            ('plastic bottle', 500),
            ('aluminum can', 1000),
            ('paper cup', 50),
            ('smartphone', 20000),
            ('cotton t-shirt', 2500),
            ('laptop', 75000),
            ('leather shoes', 18000),
            ('jeans', 20000),
            ('glass bottle', 800),
            ('book', 1000),
            ('beef', 27000),
            ('chicken', 6900),
            ('cheese', 13500),
            ('milk', 1900),
            ('coffee', 17000),
            ('chocolate', 19000),
            ('car tire', 88000),
            ('led bulb', 1500),
            ('running shoes', 14000),
            ('wool sweater', 40000),
            ('bicycle', 96000),
            ('ceramic mug', 1100),
            ('wooden chair', 15000),
            ('disposable diaper', 100),
            ('reusable coffee cup', 500),
            ('toothbrush', 80),
            ('toothpaste', 150),
            ('soap bar', 120),
            ('shampoo bottle', 450),
            ('paper towel roll', 300),
            ('toilet paper roll', 250),
            ('laundry detergent', 700),
            ('dish soap', 400),
            ('cereal box', 150),
            ('bread loaf', 600),
            ('eggs (dozen)', 2200),
            ('potato chips bag', 200),
            ('yogurt cup', 180),
            ('butter', 1100),
            ('orange juice carton', 750),
            ('pen', 30),
            ('notebook', 400),
            ('incandescent light bulb', 2000),
            ('trash bag', 40),
            ('reusable steel water bottle', 2000),
            ('polyester shirt', 5500),
            ('leather belt', 7000),
            ('sunglasses', 1500),
            ('watch', 4000),
            ('desktop computer', 250000),
            ('monitor', 80000),
            ('keyboard', 5000),
            ('mouse', 2000),
            ('tablet', 30000),
            ('e-reader', 15000),
            ('headphones', 8000),
            ('microwave oven', 50000),
            ('toaster', 12000),
            ('blender', 15000),
            ('refrigerator', 350000),
            ('washing machine', 300000),
            ('television', 200000),
            ('deodorant spray', 600),
            ('disposable razor', 50),
            ('kitchen sponge', 30),
            ('backpack', 7000),
            ('stapler', 800),
            ('scissors', 500),
            ('skateboard', 10000),
            ('bath towel', 3000),
            ('bed sheets', 15000),
            ('pillow', 2000),
            ('frying pan', 4000),
            ('cutting board', 600),
            ('wine bottle', 1200)
    Item: {description}"""
    
    try:
        response = model.generate_content(
            prompt,
            generation_config={
                "temperature": 0.1 # A low temperature for more predictable, factual responses
            }
        )
        
        result_text = response.text.strip()

        # Extract the first number found in the response for robustness.
        numbers = re.findall(r'\d+', result_text)
        
        if numbers:
            carbon_value = int(numbers[0])
            # As per the prompt, a '0' response means the model could not estimate.
            if carbon_value > 0:
                return carbon_value
        
        # Return None if no valid number is found or if the model returns 0.
        return None

    except Exception as e:
        print(f"An error occurred while calling the Gemini API: {e}")
        return None

def analyze_image(image_bytes):
    """Analyze image using AWS Rekognition"""
    try:
        client = boto3.client(
            'rekognition',
            aws_access_key_id=AWS_ACCESS_KEY,
            aws_secret_access_key=AWS_SECRET_KEY,
            region_name=AWS_REGION
        )
        
        response = client.detect_labels(
            Image={'Bytes': image_bytes},
            MaxLabels=10,
            MinConfidence=70
        )
        return response['Labels']
    except Exception as e:
        print(f"Error analyzing image: {e}")
        return None

def process_image_file(image_path):
    """Convert image to proper format if needed"""
    try:
        img = Image.open(image_path)
        if img.format != 'JPEG':
            img = img.convert("RGB")
            byte_arr = io.BytesIO()
            img.save(byte_arr, format='JPEG')
            return byte_arr.getvalue()
        else:
            with open(image_path, 'rb') as f:
                return f.read()
    except Exception as e:
        print(f"Error processing image: {e}")
        return None

def estimate_carbon_from_image(image_path):
    """Estimate carbon footprint from image using AWS Rekognition and Gemini."""
    image_bytes = process_image_file(image_path)
    if not image_bytes:
        return None
    
    labels = analyze_image(image_bytes)
    if not labels:
        return None
    
    carbon_estimate = 0
    matched_items = []
    unmatched_items = []
    
    for label in labels:
        label_name_lower = label['Name'].lower()
        label_name_original = label['Name']
        confidence = label['Confidence']
        matched = False
        
        # 1. Check for local exact matches first
        for item, carbon in CARBON_FACTORS.items():
            if item in label_name_lower:
                carbon_estimate += carbon
                matched_items.append({
                    'item': label_name_original,
                    'confidence': confidence,
                    'carbon': carbon,
                    'source': 'local'
                })
                matched = True
                break
        
        # 2. If not matched locally, use Gemini if it's available
        if not matched and model:
            print(f"Item '{label_name_original}' not in local DB. Querying Gemini...")
            gemini_carbon = estimate_carbon_from_description(label_name_original)
            
            if gemini_carbon:
                carbon_estimate += gemini_carbon
                matched_items.append({
                    'item': label_name_original,
                    'confidence': confidence,
                    'carbon': gemini_carbon,
                    'source': 'gemini'
                })
                matched = True
            else:
                print(f"Gemini could not estimate carbon for '{label_name_original}'.")

        # 3. If still not matched, add to unmatched list
        if not matched:
            unmatched_items.append({
                'name': label_name_original,
                'confidence': confidence
            })
    
    return {
        'total_carbon': carbon_estimate,
        'matched_items': matched_items,
        'unmatched_items': unmatched_items,
        'all_labels': [{'name': l['Name'], 'confidence': l['Confidence']} for l in labels]
    }