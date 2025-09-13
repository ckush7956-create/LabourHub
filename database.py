import motor.motor_asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

class Database:
    client: AsyncIOMotorClient = None

db = Database()

async def get_database() -> AsyncIOMotorClient:
    return db.client

async def connect_to_mongo():
    """Create database connection"""
    db.client = AsyncIOMotorClient(
        os.getenv("MONGODB_URI", "mongodb://localhost:27017/labourhub")
    )
    print("✅ Connected to MongoDB")

async def close_mongo_connection():
    """Close database connection"""
    if db.client:
        db.client.close()
        print("❌ Disconnected from MongoDB")

async def get_users_collection():
    database = await get_database()
    return database.labourhub.users

async def get_workers_collection():
    database = await get_database()
    return database.labourhub.workers

async def get_bookings_collection():
    database = await get_database()
    return database.labourhub.bookings