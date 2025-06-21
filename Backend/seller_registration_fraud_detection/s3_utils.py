import boto3
import os
from botocore.exceptions import ClientError
from dotenv import load_dotenv

load_dotenv()

s3 = boto3.client(
    's3',
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID_S3"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY_S3"),
    region_name='ap-south-1' # ADDED: Ensures consistency with other services
)

BUCKET_NAME = 'hackon0101'


def upload_image(file_bytes, key):
    try:
        s3.put_object(
            Bucket=BUCKET_NAME,
            Key=key,
            Body=file_bytes,
            ContentType='image/jpeg',
            ACL='private'
        )
        return key
    except ClientError as e:
        raise RuntimeError(f"S3 upload failed: {e.response['Error']['Message']}")

# def list_images(prefix):
#     try:
#         response = s3.list_objects_v2(
#             Bucket=BUCKET_NAME,
#             Prefix=prefix + '/' if not prefix.endswith('/') else prefix,
#             MaxKeys=1000
#         )
#         return [obj['Key'] for obj in response.get('Contents', []) 
#                 if obj['Key'].lower().endswith(('jpg', 'jpeg', 'png'))]
#     except ClientError as e:
#         raise RuntimeError(f"S3 list failed: {e.response['Error']['Message']}")