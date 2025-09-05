from bson import ObjectId
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from pydantic import ConfigDict
from pydantic.functional_validators import field_validator

class Task(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: Optional[str] = Field(default=None, alias="_id")
    title: str
    description: Optional[str] = None
    completed: bool = False
    creation_date: datetime = Field(default_factory=datetime.utcnow)

    @field_validator("id", mode="before")
    @classmethod
    def validate_object_id(cls, v):
        if v is None:
            return None
        if isinstance(v, ObjectId):
            return str(v)
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return str(v)

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
