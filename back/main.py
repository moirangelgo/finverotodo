from fastapi import FastAPI
from routes import tasks
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Finvero TO-DO API",
    description="API REST para gestionar una lista de tareas con FastAPI + MongoDB",
    version="1.0.0",
    contact={
        "name": "Moisés Rangel",
        "url": "https://moirangelgo.github.io",
        "email": "moises.rangel.go@gmail.com",
    },
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(tasks.router)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
