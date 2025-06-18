# # Note: You'll need to install the Gemini package and set up API keys
# # pip install google-generativeai

# import google.generativeai as genai
# from config import CARBON_FACTORS
# import re

# # Configure with your actual Gemini API key
# GEMINI_API_KEY = 'AIzaSyDMCXugVyrMIFP4KH1DJ56uBE6wMDWODgc'
# genai.configure(api_key=GEMINI_API_KEY)

# # Use the correct model name for the stable version
# model = genai.GenerativeModel(model_name='models/gemini-1.5-pro')  # updated model name

# def estimate_carbon_from_description(description):
#     prompt = f"""Analyze this product description and estimate its carbon footprint in grams of CO2.
#     Focus on identifying materials and typical carbon footprints for similar items.
#     Description: {description}
    
#     Respond only with a number representing the estimated carbon footprint in grams of CO2, 
#     or 'unknown' if you can't make a reasonable estimate."""
    
#     try:
#         response = model.generate_content(prompt)
#         result = response.text.strip().lower()
        
#         # Extract numbers from response
#         numbers = re.findall(r'\d+', result)
#         if numbers:
#             return int(numbers[0])
#         return None
#     except Exception as e:
#         print(f"Error with Gemini API: {e}")
#         return None


# Note: You'll need to install the Gemini package and set up API keys
# pip install google-generativeai

from google import genai
from Carbon_Karma.config import CARBON_FACTORS
import re
import os
from dotenv import load_dotenv

load_dotenv()

# Configure with your actual Gemini API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY)

def estimate_carbon_from_description(description):
    prompt = f"""Analyze this product description and estimate its carbon footprint in grams of CO2.
    Focus on identifying materials and typical carbon footprints for similar items.
    Description: {description}
    
    Respond only with a number representing the estimated carbon footprint in grams of CO2, 
    or 'unknown' if you can't make a reasonable estimate."""
    
    try:
        response = client.models.generate_content(
            model="models/gemini-1.5-pro",  # or "models/gemini-2.5-flash" for faster/lighter response
            contents=prompt
        )
        result = response.text.strip().lower()

        # Extract numbers from response
        numbers = re.findall(r'\d+', result)
        if numbers:
            return int(numbers[0])
        return None
    except Exception as e:
        print(f"Error with Gemini API: {e}")
        return None
