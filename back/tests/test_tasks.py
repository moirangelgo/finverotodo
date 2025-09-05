import pytest_asyncio
import httpx
from back.main import app
from motor.motor_asyncio import AsyncIOMotorClient

TEST_DB_URI = "mongodb://localhost:27017"
TEST_DB_NAME = "todo_test_db"

@pytest_asyncio.fixture(scope="session", autouse=True)
async def setup_db():
    """
    Crea y limpia la base de datos de pruebas.
    Se ejecuta antes y después de todos los tests.
    """
    client = AsyncIOMotorClient(TEST_DB_URI)
    db = client[TEST_DB_NAME]
    await db.tasks.delete_many({})  
    yield db
    await db.tasks.delete_many({})  
    client.close()

@pytest_asyncio.fixture
async def client():
    """
    Fixture para un cliente HTTP asíncrono que utiliza ASGITransport.
    Permite testear la app sin levantar servidor real.
    """
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac

import pytest

@pytest.mark.asyncio
async def test_create_task(client, setup_db):
    response = await client.post("/tasks", json={
        "title": "Tarea de prueba",
        "description": "Descripción de prueba"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Tarea de prueba"
    assert data["completed"] is False
    assert "_id" in data or "id" in data
