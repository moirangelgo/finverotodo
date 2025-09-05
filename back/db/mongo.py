import os
import motor.motor_asyncio
from pymongo.errors import PyMongoError

# Obtener configuración desde variables de entorno
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "todo_db")

# Crear cliente de conexión global
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

# Función opcional para verificar conexión
async def check_connection():
    try:
        await client.admin.command("ping")
        return True
    except PyMongoError as e:
        print(f"Error conectando a MongoDB: {e}")
        return False
