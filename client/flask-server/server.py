from flask import Flask
from flask_cors import CORS, cross_origin
import boto3
from botocore.exceptions import ClientError
from pprint import pprint
from decimal import Decimal
import time

app = Flask(__name__)
client = boto3.client('dynamodb')
CORS(app)

# Members API route


@app.route("/members")
def members():
    return {
        "members": [
            {
                "userName": "Aman",
                "serviceTitle": "Manage Dynamo DB Services"

            },
            {
                "userName": "Neha",
                "serviceTitle": "Manage EC2 Services"
            },
            {
                "userName": "Shradha",
                "serviceTitle": "Manage S3 Services"
            },
            {
                "userName": "Vinoth",
                "serviceTitle": "Manage ECS Services",
            }
        ]
    }

# Services API route


@app.route("/services")
def services():
    return {
        "services": [
            {
                "userName": "Neha",
                "serviceTitle": "Manage EC2 Services",
                "tasks": ["Create EC2", "Delete EC2", "Edit EC2"]
            },
            {
                "userName": "Shradha",
                "serviceTitle": "Manage S3 Services",
                "tasks": ["Create S3", "Delete S3", "Edit S3"]
            },
            {
                "userName": "Aman",
                "serviceTitle": "Manage Dynamo DB Services",
                "tasks": ["Create DB", "Delete DB", "Edit DB"]
            },
            {
                "userName": "Vinoth",
                "serviceTitle": "Manage ECS Services",
                "tasks": ["Create ECS", "Delete ECS", "Edit ECS"]
            }
        ]
    }


# Services for create dynamo DB route

@app.route("/createDB")
# Create DynamoDB table
def create_movie_table():
    print("Create DynamoDB start............")
    table = client.create_table(
        TableName='ccproj2/DE-Movies',
        KeySchema=[
            {
                'AttributeName': 'year',
                'KeyType': 'HASH'  # Partition key
            },
            {
                'AttributeName': 'title',
                'KeyType': 'RANGE'  # Sort key
            }
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'year',
                'AttributeType': 'N'
            },
            {
                'AttributeName': 'title',
                'AttributeType': 'S'
            },

        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 10,
            'WriteCapacityUnits': 10
        }
    )
    print("Create DynamoDB ended............")
    return table


if __name__ == "__main__":
    app.run(debug=True)
