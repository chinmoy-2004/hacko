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



import google.generativeai as genai
import re
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# --- Gemini API Configuration ---
try:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY not found in .env file.")
    
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

    prompt = f"""Analyze this product description and estimate its carbon footprint in grams of CO2.
    Focus on identifying materials and typical carbon footprints for similar items.
    Description: {description}
    
    Respond ONLY with an integer representing the estimated grams of CO2. 
    If you cannot make a reasonable estimate, respond with the number 0."""
    
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