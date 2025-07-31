

import boto3
import base64
import os
from dotenv import load_dotenv

load_dotenv()

kms_client = boto3.client(
    'kms',
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID_GENERAL"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY_GENERAL"),
    region_name='ap-south-1'
)

KEY_ID = 'arn:aws:kms:ap-south-1:471112800688:key/d4ffcc41-6bf9-4c71-a92a-c860111e936e'  # Example: arn:aws:kms:ap-south-1:123456789:key/xxxx  # Example: arn:aws:kms:ap-south-1:123456789:key/xxxx


def encrypt_data(plaintext):
    if not plaintext:
        raise ValueError("Plaintext cannot be empty")
    
    response = kms_client.encrypt(
        KeyId=KEY_ID,
        Plaintext=plaintext.encode('utf-8')
    )
    return base64.b64encode(response['CiphertextBlob']).decode('utf-8')