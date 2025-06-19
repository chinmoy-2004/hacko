

import boto3
import os
from dotenv import load_dotenv

load_dotenv()

rekognition = boto3.client(
    'rekognition',
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID_GENERAL"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY_GENERAL"),
    region_name='ap-south-1' # UPDATED: Changed from us-east-1 to match other services
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
    except rekognition.exceptions.InvalidParameterException:
        return {"match": False, "similarity": 0, "confidence": 0}
    except Exception as e:
        raise RuntimeError(f"Rekognition error: {str(e)}")