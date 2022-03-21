from curses.ascii import HT
from fastapi import FastAPI, Depends, status, Response, HTTPException
from .schemas import Blog
from .models import Base
from . import models
from .database import engine, sessionLocal
from sqlalchemy.orm import Session

app = FastAPI()

Base.metadata.create_all(engine)

def get_db():
    db = sessionLocal()

    try:
        yield db
    finally:
        db.close()
# 全件取得
@app.get('/blog')
def all_fetch(db: Session = Depends(get_db)):
    blogs = db.query(models.Blog).all()
    return blogs


# 新規登録
@app.post('/blog', status_code=status.HTTP_201_CREATED)
def create(blog: Blog, db: Session = Depends(get_db)):
    new_blog = models.Blog(title=blog.title, body=blog.body)
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)
    return new_blog

# id取得
@app.get('/blot/{id}', status_code=status.HTTP_200_OK)
def show(id: int, response: Response, db: Session = Depends(get_db)):
    blog = db.query(models.Blog).filter(models.Blog.id == id).first()
    if not blog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Blogのid={id}はないよ(・∀・)')
    return blog

# 更新
@app.put('/blog/{id}', status_code=status.HTTP_202_ACCEPTED)
def update(id, request: Blog, db: Session = Depends(get_db)):
    blog = db.query(models.Blog).filter(models.Blog.id == id)
    if not blog.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Blogのid={id}は無いよ(・∀・)')
    blog.update(request.dict())
    db.commit()

    return 'Update completed'

# 削除
@app.delete('/blog/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete(id: int, db: Session = Depends(get_db)):
    blog = db.query(models.Blog).filter(models.Blog.id == id)
    if not blog.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Blogのid={id}は無いよ(・∀・)')
    blog.delete(synchronize_session=False)
    db.commit()

    return "deletion completed"
