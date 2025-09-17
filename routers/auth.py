from fastapi import APIRouter, HTTPException, status, Depends
from datetime import timedelta
import random
import string

from models import UserCreate, UserLogin, Token, APIResponse, User
from database import get_users_collection
from auth import verify_password, get_password_hash, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, get_current_user

router = APIRouter()

@router.post("/register", response_model=APIResponse)
async def register_user(user: UserCreate):
    users_collection = await get_users_collection()
    
    # Check if user exists
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    # Hash password
    hashed_password = get_password_hash(user.password)
    
    # Create user document
    user_dict = user.dict()
    user_dict["password"] = hashed_password
    user_dict["is_verified"] = False
    user_dict["cart"] = []
    
    # Insert user
    result = await users_collection.insert_one(user_dict)
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(result.inserted_id)}, 
        expires_delta=access_token_expires
    )
    
    return APIResponse(
        status_code=status.HTTP_201_CREATED, # Use 201 for resource creation
        message="User registered successfully",
        data={
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": str(result.inserted_id),
                "name": user.name,
                "email": user.email,
                "role": user.role
            }
        }
    )

@router.post("/login", response_model=APIResponse)
async def login_user(user_credentials: UserLogin):
    users_collection = await get_users_collection()
    
    # Find user
    user = await users_collection.find_one({"email": user_credentials.email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Verify password
    if not verify_password(user_credentials.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user["_id"])}, 
        expires_delta=access_token_expires
    )
    
    return APIResponse(
        status_code=status.HTTP_200_OK,
        message="Login successful",
        data={
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": str(user["_id"]),
                "name": user["name"],
                "email": user["email"],
                "role": user["role"]
            }
        }
    )

@router.get("/me", response_model=APIResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return APIResponse(
        status_code=status.HTTP_200_OK,
        message="User info retrieved successfully",
        data={
            "user": {
                "id": str(current_user["_id"]),
                "name": current_user["name"],
                "email": current_user["email"],
                "phone": current_user["phone"],
                "role": current_user["role"],
                "cart": current_user.get("cart", [])
            }
        }
    )