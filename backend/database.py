import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
MONGODB_URL = os.getenv("MONGODB_URL")

client = MongoClient(MONGODB_URL)

database = client["ap_scheme_sahayak"]

schemes_collection = database["schemes"]
users_collection = database["users"]
saved_schemes_collection = database["saved_schemes"]    