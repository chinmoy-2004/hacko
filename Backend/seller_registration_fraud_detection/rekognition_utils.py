

import boto3
import os
from dotenv import load_dotenv

load_dotenv()

rekognition = boto3.client(
    'rekognition',
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID_GENERAL"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY_GENERAL"),
    region_name='ap-south-1' # FIX: Changed to ap-south-1 to match the S3 bucket region.
)

def compare_faces(bucket, source_key, target_key, threshold=90):
    try:
        response = rekognition.compare_faces(
            SourceImage={'S3Object': {'Bucket': bucket, 'Name': source_key}},
            TargetImage={'S3Object': {'Bucket': bucket, 'Name': target_key}},
            SimilarityThreshold=threshold,
            QualityFilter='AUTO'
        )
        
        # Return match status and confidence score
        if response['FaceMatches']:
            best_match = max(response['FaceMatches'], key=lambda x: x['Similarity'])
            return {
                "match": True,
                "similarity": best_match['Similarity'],
                "confidence": best_match['Face']['Confidence']
            }
        return {"match": False, "similarity": 0, "confidence": 0}
    except rekognition.exceptions.InvalidS3ObjectException as e:
        # This is the specific error. Return a structured error message.
        print(f"REKOGNITION ERROR: Cannot access S3 object. Check IAM permissions. Details: {e}")
        return {"error": "InvalidS3ObjectException", "message": "Rekognition service denied access to the S3 object. Please check the IAM user's S3 read permissions."}
    except rekognition.exceptions.InvalidParameterException:
        # This means an image might not contain a face.
        print(f"REKOGNITION WARNING: No face found in {source_key} or {target_key}.")
        return {"error": "NoFaceFound", "message": "Could not find a face in one of the uploaded images. Please upload clear, front-facing photos."}
    except Exception as e:
        print(f"REKOGNITION ERROR: An unexpected error occurred: {e}")
        raise RuntimeError(f"Rekognition error: {str(e)}")