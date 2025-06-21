import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

# --- Environment and API Configuration ---
# Load environment variables from the .env file in the project root.
load_dotenv()

try:
    # Securely fetch the API key from environment variables.
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY not found in .env file. Please ensure it is set.")
    
    genai.configure(api_key=GEMINI_API_KEY)
    
    # Initialize the generative model. 'gemini-1.5-flash-latest' is fast and cost-effective.
    model = genai.GenerativeModel('gemini-1.5-flash-latest')
    print("Gemini model initialized successfully.")
    
except Exception as e:
    print(f"Error initializing Gemini API: {e}")
    model = None

# --- Grading System Definition ---
# Define the 8 core sustainability metrics for evaluation.
SUSTAINABILITY_METRICS = [
    "Material Sourcing (Recycled, Organic, Sustainable)",
    "Manufacturing Process (Low-energy, Water-saving, Chemical-free)",
    "Packaging (Plastic-free, Recyclable, Compostable, Minimalist)",
    "Supply Chain & Logistics (Local sourcing, Carbon-neutral shipping)",
    "Durability & Lifespan (Built to last, Repairable, Reusable)",
    "End-of-Life (Recyclable, Biodegradable, Compostable)",
    "Certifications (Fair Trade, FSC, GOTS, B-Corp, etc.)",
    "Social & Ethical Impact (Ethical labor, Community support, Cruelty-free)"
]

# Define the grading rubric that the AI will follow.
GRADING_RUBRIC = """
- A++: Outstanding performance across all 8 metrics. A truly circular and regenerative product.
- A+: Excels in the vast majority of metrics with only negligible room for improvement.
- A: Strong sustainability profile with excellent performance in key areas; may have minor, acceptable trade-offs.
- B: Good overall performance but with clear areas for improvement in several metrics.
- C: Meets basic sustainability criteria but falls short in many areas. Significant improvements needed.
- D: Below expectations. Fails to meet basic sustainability standards and has poor eco-compliance.
"""

def grade_product_from_description(description: str) -> dict | None:
    """
    Analyzes a product description to assign a sustainability grade using the Gemini API.

    Args:
        description: The product description text to be evaluated.

    Returns:
        A dictionary containing the grade, a summary, and a detailed metric analysis,
        or None if an error occurs.
    """
    if not model:
        print("Error: Gemini model is not initialized. Cannot perform grading.")
        return None

    # Construct a detailed, structured prompt for the AI.
    prompt = f"""
    As a sustainability expert for an e-commerce platform, your task is to analyze the following product description and assign it a sustainability grade.

    *Your Evaluation Framework:*

    1.  *Metrics to Evaluate:*
        {', '.join(SUSTAINABILITY_METRICS)}

    2.  *Grading Scale:*
        {GRADING_RUBRIC}

    *Product Description to Analyze:*
    ---
    {description}
    ---

    *Instructions:*
    Carefully analyze the description against each of the 8 metrics. Provide a concise rationale for your final grade.
    Respond ONLY with a valid JSON object in the following format. Do not include any other text or markdown formatting.

    {{
      "grade": "YOUR_GRADE",
      "summary": "A brief, one-sentence summary explaining the final grade.",
      "metrics_analysis": {{
        "Material Sourcing": "Your analysis here.",
        "Manufacturing Process": "Your analysis here.",
        "Packaging": "Your analysis here.",
        "Supply Chain & Logistics": "Your analysis here.",
        "Durability & Lifespan": "Your analysis here.",
        "End-of-Life": "Your analysis here.",
        "Certifications": "Your analysis here.",
        "Social & Ethical Impact": "Your analysis here."
      }}
    }}
    """
    
    try:
        # Configure the model for a consistent, JSON-based response.
        response = model.generate_content(
            prompt,
            generation_config={
                "temperature": 0.0,  # Set to 0 for deterministic and factual output.
                "response_mime_type": "application/json",
            }
        )
        
        # The model is configured to return JSON, so we can parse it directly.
        result = json.loads(response.text)
        return result

    except Exception as e:
        print(f"An error occurred while calling the Gemini API or parsing its response: {e}")
        return None

# # --- Example Usage ---
# if __name__ == "_main_":
#     # Example product description for testing.
#     example_description = """
#     Introducing our new 'Earth-Tee'. Made from 100% GOTS-certified organic cotton, grown without pesticides. 
#     This t-shirt is manufactured in a Fair Trade certified factory that ensures living wages for all workers. 
#     We ship it to you in a 100% recycled and recyclable cardboard mailer, completely free of plastic. 
#     It's designed for durability, so you can wear it for years to come.
#     """
    
#     print("--- Analyzing Product Description ---")
#     print(f"Description:\n{example_description}\n")
    
#     grading_result = grade_product_from_description(example_description)
    
#     if grading_result:
#         print("--- Grading Complete ---")
#         print(f"Final Grade: {grading_result.get('grade')}")
#         print(f"Summary: {grading_result.get('summary')}")
#         print("\nDetailed Analysis:")
#         for metric, analysis in grading_result.get('metrics_analysis', {}).items():
#             print(f"- {metric}: {analysis}")
#     else:
#         print("--- Grading Failed ---")
#         print("Could not retrieve a grade for the product.")