from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from fastapi.staticfiles import StaticFiles
import uvicorn
import os
from dotenv import load_dotenv

from database import connect_to_mongo, close_mongo_connection
from routers import auth, workers, bookings

# Load environment variables
load_dotenv()

app = FastAPI(
    title="LabourHub API",
    description="Professional Labour Service Platform Backend",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Events
@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

# Frontend (Static Files) mount
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")


# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(workers.router, prefix="/api/workers", tags=["Workers"])
app.include_router(bookings.router, prefix="/api/bookings", tags=["Bookings"])

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {
        "status": "OK",
        "message": "LabourHub API is healthy!",
        "version": "1.0.0"
    }