from fastapi import FastAPI
from routes import tasks
from fastapi.middleware.cors import CORSMiddleware
from sentry_sdk import capture_exception

import os
import sentry_sdk

from sentry_sdk.integrations.asgi import SentryAsgiMiddleware

sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN"),  
    traces_sample_rate=1.0,       
)


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

# envuelve la app en Sentry
app.add_middleware(SentryAsgiMiddleware)

@app.get("/error")
def generate_error():
    print("*"*50)
    print("SENTRY_DSN:", os.getenv("SENTRY_DSN"))
    print("*"*50)

    try:
        1 / 0
    except Exception as e:
        capture_exception(e)
        return {"status": "captured"}

app.include_router(tasks.router)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
