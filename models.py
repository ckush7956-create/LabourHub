from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from bson import ObjectId

# For ObjectId validation
class PyObjectId(ObjectId):
    @classmethod
    def get_validators(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def modify_schema(cls, field_schema):
        field_schema.update(type="string")

class UserCreate(BaseModel):
    name: str = Field(...)
    email: EmailStr = Field(...)
    role: str = Field(..., pattern="^(customer|labour)$")
    phone: str = Field(..., pattern="^[0-9]{10}$")

    class Config:
        json_encoders = {ObjectId: str}
        arbitrary_types_allowed = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

    class Config:
        arbitrary_types_allowed = True

class Token(BaseModel):
    access_token: str
    token_type: str

    class Config:
        arbitrary_types_allowed = True

class APIResponse(BaseModel):
    status_code: int
    message: str
    data: Optional[dict] = None

    class Config:
        arbitrary_types_allowed = True

class User(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    email: EmailStr
    role: str
    phone: str

    class Config:
        json_encoders = {ObjectId: str}
        arbitrary_types_allowed = True

class Worker(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    email: str
    phone: str
    skills: List[str]
    is_available: bool = True
    user_id: str

    class Config:
        json_encoders = {ObjectId: str}
        arbitrary_types_allowed = True

# New WorkerCreate model added here
class WorkerCreate(BaseModel):
    name: str
    email: str
    phone: str
    skills: List[str]
    is_available: bool = True

    class Config:
        arbitrary_types_allowed = True
        
class Booking(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    worker_id: str
    customer_id: str
    date: str
    status: str = "pending"
    # Other booking details

    class Config:
        json_encoders = {ObjectId: str}
        arbitrary_types_allowed = True

# New BookingCreate model added here
class BookingCreate(BaseModel):
    worker_id: str
    customer_id: str
    date: str
    status: str = "pending"

    class Config:
        arbitrary_types_allowed = True
