from fastapi import APIRouter, HTTPException
from typing import List
from models.task import Task, TaskCreate
from repositories import task_repository as repo

router = APIRouter()

@router.get("/tasks", response_model=List[Task])
async def get_tasks():
    return await repo.get_all_tasks()

@router.post("/tasks", response_model=Task)
async def create_task(task: TaskCreate):
    return await repo.create_task(task)

@router.put("/tasks/{task_id}", response_model=Task)
async def update_task(task_id: str, completed: bool):
    updated = await repo.update_task(task_id, completed)
    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated

@router.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    success = await repo.delete_task(task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}
