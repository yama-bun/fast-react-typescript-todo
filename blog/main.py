from curses.ascii import HT
from fastapi import FastAPI
from .models import Base
from .database import engine
from .routes import todo
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    'http://localhost:3000',
    'http://localhost',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todo.router)

Base.metadata.create_all(engine)
