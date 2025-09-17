from fastapi import APIRouter, HTTPException, status, Query, Depends
from typing import Optional, List
from bson import ObjectId
from datetime import datetime

from models import Worker, APIResponse, WorkerCreate
from database import get_workers_collection, get_users_collection
from auth import get_current_user

router = APIRouter(prefix="/workers", tags=["Workers"])

@router.post("/", response_model=APIResponse)
async def create_worker(worker: WorkerCreate, current_user: dict = Depends(get_current_user)):
    """
    Create a new worker profile.
    """
    if current_user["role"] != "labour":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only labourers can create a worker profile"
        )
    
    workers_collection = await get_workers_collection()
    worker_dict = worker.dict()
    worker_dict["user_id"] = str(current_user["_id"])
    worker_dict["created_at"] = datetime.utcnow()
    
    result = await workers_collection.insert_one(worker_dict)
    
    return APIResponse(
        status_code=status.HTTP_201_CREATED,
        message="Worker profile created successfully",
        data={
            "id": str(result.inserted_id),
            "name": worker.name,
            "email": worker.email
        }
    )

@router.get("/", response_model=APIResponse)
async def get_all_workers(
    trade: Optional[str] = Query(None),
    location: Optional[str] = Query(None),
    rating: Optional[float] = Query(None),
    search: Optional[str] = Query(None)
):
    workers_collection = await get_workers_collection()
    
    # Build query
    query = {"is_verified": True, "is_available": True}
    
    if trade:
        query["trade"] = {"$regex": trade, "$options": "i"}
    if location:
        query["location"] = {"$regex": location, "$options": "i"}
    if rating:
        query["rating"] = {"$gte": rating}
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"trade": {"$regex": search, "$options": "i"}},
            {"location": {"$regex": search, "$options": "i"}}
        ]
    
    # Get workers
    workers = await workers_collection.find(query).sort([("rating", -1), ("total_jobs", -1)]).to_list(length=50)
    
    # Convert ObjectId to string
    for worker in workers:
        worker["id"] = str(worker["_id"])
        del worker["_id"]
    
    return APIResponse(
        status_code=status.HTTP_200_OK,
        message="Workers retrieved successfully",
        data={"workers": workers, "count": len(workers)}
    )

@router.get("/{worker_id}", response_model=APIResponse)
async def get_worker_by_id(worker_id: str):
    workers_collection = await get_workers_collection()
    
    if not ObjectId.is_valid(worker_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid worker ID"
        )
    
    worker = await workers_collection.find_one({"_id": ObjectId(worker_id)})
    if not worker:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Worker not found"
        )
    
    worker["id"] = str(worker["_id"])
    del worker["_id"]
    
    return APIResponse(
        status_code=status.HTTP_200_OK,
        message="Worker retrieved successfully",
        data={"worker": worker}
    )

@router.post("/cart/{worker_id}", response_model=APIResponse)
async def add_worker_to_cart(worker_id: str, current_user: dict = Depends(get_current_user)):
    workers_collection = await get_workers_collection()
    users_collection = await get_users_collection()
    
    # Validate worker ID
    if not ObjectId.is_valid(worker_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid worker ID"
        )
    
    # Check if worker exists
    worker = await workers_collection.find_one({"_id": ObjectId(worker_id)})
    if not worker:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Worker not found"
        )
    
    # Check if worker already in cart
    user_cart = current_user.get("cart", [])
    if any(item.get("worker_id") == worker_id for item in user_cart):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Worker already in cart"
        )
    
    # Add to cart
    cart_item = {
        "worker_id": worker_id,
        "added_at": datetime.utcnow()
    }
    user_cart.append(cart_item)
    
    # Update user
    await users_collection.update_one(
        {"_id": ObjectId(current_user["_id"])},
        {"$set": {"cart": user_cart}}
    )
    
    return APIResponse(
        status_code=status.HTTP_200_OK,
        message="Worker added to cart successfully",
        data={"cart_count": len(user_cart)}
    )

# Sample data endpoint (for testing)
@router.post("/sample-data", response_model=APIResponse)
async def create_sample_workers():
    workers_collection = await get_workers_collection()
    
    sample_workers = [
        {
            "name": "Ramesh Kumar",
            "email": "ramesh@example.com",
            "phone": "9999911111",
            "trade": "Plumbing",
            "experience": "7 years",
            "location": "Delhi NCR",
            "price": "₹400/day",
            "rating": 5.0,
            "is_verified": True,
            "is_available": True,
            "total_jobs": 120
        },
        {
            "name": "Sita Devi",
            "email": "sita@example.com",
            "phone": "9876543210",
            "trade": "Carpentry",
            "experience": "4 years",
            "location": "Gurgaon",
            "price": "₹500/day",
            "rating": 5.0,
            "is_verified": True,
            "is_available": True,
            "total_jobs": 85
        },
        {
            "name": "Rahul Yadav",
            "email": "rahul@example.com",
            "phone": "9810012132",
            "trade": "Electrician",
            "experience": "8 years",
            "location": "Noida",
            "price": "₹550/day",
            "rating": 5.0,
            "is_verified": True,
            "is_available": True,
            "total_jobs": 150
        },
        {
            "name": "Ajit Kumar",
            "email": "ajit@example.com",
            "phone": "9543210000",
            "trade": "Painting",
            "experience": "6 years",
            "location": "Delhi",
            "price": "₹350/day",
            "rating": 4.0,
            "is_verified": True,
            "is_available": True,
            "total_jobs": 95
        }
    ]
    
    result = await workers_collection.insert_many(sample_workers)
    
    return APIResponse(
        status_code=status.HTTP_201_CREATED,
        message=f"Created {len(result.inserted_ids)} sample workers",
        data={"count": len(result.inserted_ids)}
    )


from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from models import Worker, APIResponse, WorkerCreate
from database import get_workers_collection
from auth import get_current_user

router = APIRouter(prefix="/workers", tags=["Workers"])

@router.post("/", response_model=APIResponse)
async def create_worker(worker: WorkerCreate, current_user: dict = Depends(get_current_user)):
    """
    Create a new worker.
    """
    if current_user["role"] != "labour":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only labourers can create a worker profile"
        )
    
    workers_collection = await get_workers_collection()
    worker_dict = worker.dict()
    worker_dict["user_id"] = str(current_user["_id"])
    
    result = await workers_collection.insert_one(worker_dict)
    
    return APIResponse(
        status_code=status.HTTP_201_CREATED,
        message="Worker profile created successfully",
        data={
            "id": str(result.inserted_id),
            "name": worker.name,
            "email": worker.email
        }
    )
    
@router.get("/", response_model=APIResponse)
async def get_all_workers():
    """
    Get a list of all workers.
    """
    workers_collection = await get_workers_collection()
    workers_list = await workers_collection.find().to_list(100)
    
    return APIResponse(
        status_code=status.HTTP_200_OK,
        message="Workers list retrieved successfully",
        data={
            "workers": workers_list
        }
    )