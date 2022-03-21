from curses.ascii import HT
from fastapi import FastAPI
from .models import Base
from .database import engine
from .routes import blog

app = FastAPI()

app.include_router(blog.router)

Base.metadata.create_all(engine)
