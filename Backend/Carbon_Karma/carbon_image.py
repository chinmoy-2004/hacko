import boto3
from PIL import Image
from Carbon_Karma.config import AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION, CARBON_FACTORS
import io
import os

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
    """Estimate carbon footprint from image"""
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
        label_name = label['Name'].lower()
        matched = False
        
        # Check for exact matches first
        for item, carbon in CARBON_FACTORS.items():
            if item in label_name:
                carbon_estimate += carbon
                matched_items.append({
                    'item': label['Name'],
                    'confidence': label['Confidence'],
                    'carbon': carbon
                })
                matched = True
                break
        
        if not matched:
            unmatched_items.append({
                'name': label['Name'],
                'confidence': label['Confidence']
            })
    
    return {
        'total_carbon': carbon_estimate,
        'matched_items': matched_items,
        'unmatched_items': unmatched_items,
        'all_labels': [{'name': l['Name'], 'confidence': l['Confidence']} for l in labels]
    }