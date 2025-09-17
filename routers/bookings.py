from fastapi import APIRouter, Depends, HTTPException, status
from models import Booking, BookingCreate, APIResponse
from database import get_bookings_collection
from auth import get_current_user

router = APIRouter(prefix="/bookings", tags=["Bookings"])

@router.post("/", response_model=APIResponse)
async def create_booking(booking: BookingCreate, current_user: dict = Depends(get_current_user)):
    """
    Create a new booking.
    """
    if current_user["role"] != "customer":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only customers can create a booking"
        )
    
    bookings_collection = await get_bookings_collection()
    booking_dict = booking.dict()
    booking_dict["user_id"] = str(current_user["_id"])
    
    result = await bookings_collection.insert_one(booking_dict)
    
    return APIResponse(
        status_code=status.HTTP_201_CREATED,
        message="Booking created successfully",
        data={
            "id": str(result.inserted_id)
        }
    )

@router.get("/me", response_model=APIResponse)
async def get_my_bookings(current_user: dict = Depends(get_current_user)):
    """
    Get a list of bookings for the current user.
    """
    bookings_collection = await get_bookings_collection()
    bookings_list = await bookings_collection.find({"user_id": str(current_user["_id"])}).to_list(100)
    
    return APIResponse(
        status_code=status.HTTP_200_OK,
        message="Bookings retrieved successfully",
        data={
            "bookings": bookings_list
        }
    )




from fastapi import APIRouter, Depends, HTTPException, status
from models import Booking, BookingCreate, APIResponse
from database import get_bookings_collection
from auth import get_current_user

router = APIRouter(prefix="/bookings", tags=["Bookings"])

@router.post("/", response_model=APIResponse)
async def create_booking(booking: BookingCreate, current_user: dict = Depends(get_current_user)):
    """
    Create a new booking.
    """
    if current_user["role"] != "customer":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only customers can create a booking"
        )
    
    bookings_collection = await get_bookings_collection()
    booking_dict = booking.dict()
    booking_dict["user_id"] = str(current_user["_id"])
    
    result = await bookings_collection.insert_one(booking_dict)
    
    return APIResponse(
        status_code=status.HTTP_201_CREATED,
        message="Booking created successfully",
        data={
            "id": str(result.inserted_id)
        }
    )

@router.get("/me", response_model=APIResponse)
async def get_my_bookings(current_user: dict = Depends(get_current_user)):
    """
    Get a list of bookings for the current user.
    """
    bookings_collection = await get_bookings_collection()
    bookings_list = await bookings_collection.find({"user_id": str(current_user["_id"])}).to_list(100)
    
    return APIResponse(
        status_code=status.HTTP_200_OK,
        message="Bookings retrieved successfully",
        data={
            "bookings": bookings_list
        }
    )