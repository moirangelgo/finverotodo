from db.mongo import db
from models.task import Task, TaskCreate
from bson import ObjectId
from typing import List, Optional

COLLECTION = db.tasks

async def get_all_tasks() -> List[Task]:
    cursor = COLLECTION.find({})
    return [Task(**doc) async for doc in cursor]


async def create_task(task: TaskCreate) -> Task:
    task_dict = {**task.dict(), "completed": False}
    result = await COLLECTION.insert_one(task_dict)
    new_task = await COLLECTION.find_one({"_id": result.inserted_id})
    return Task(**new_task)


async def update_task(task_id: str, completed: bool) -> Optional[Task]:
    result = await COLLECTION.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": {"completed": completed}}
    )

    if result.modified_count == 0:
        return None

    updated_doc = await COLLECTION.find_one({"_id": ObjectId(task_id)})
    return Task(**updated_doc) if updated_doc else None


async def delete_task(task_id: str):
    result = await COLLECTION.delete_one({"_id": ObjectId(task_id)})
    return result.deleted_count > 0
