from .. import models
from ..schemas import Blog
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

# 全件取得
def get_all(db: Session):
    blogs = db.query(models.Blog).all()
    return blogs

# 新規登録
def create(blog: Blog, db: Session):
    new_blog = models.Blog(title=blog.title, body=blog.body)
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)
    return new_blog

# id検索
def show(id:int, db: Session):
    blog = db.query(models.Blog).filter(models.Blog.id == id).first()
    if not blog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Blogのid={id}はないよ(・∀・)')
    return blog

# 更新
def update(id:int, request: Blog, db: Session):
    blog = db.query(models.Blog).filter(models.Blog.id == id)
    if not blog.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Blogのid={id}は無いよ(・∀・)')
    blog.update(request.dict())
    db.commit()

    return 'Update completed'

# 削除
def destroy(id:int, db:Session):
    blog = db.query(models.Blog).filter(models.Blog.id == id)
    if not blog.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Blogのid={id}は無いよ(・∀・)')
    blog.delete(synchronize_session=False)
    db.commit()

    return "deletion completed"
