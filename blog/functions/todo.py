from .. import models
from ..schemas import Todo
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

# 全件取得
def get_all(db: Session):
    todos = db.query(models.Todo).all()
    return todos

# 新規登録
def create(todo: Todo, db: Session):
    new_blog = models.Todo(title=todo.title, body=todo.body)
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)
    return new_blog

# id検索
def show(id:int, db: Session):
    todo = db.query(models.Todo).filter(models.Todo.id == id).first()
    if not todo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Blogのid={id}はないよ(・∀・)')
    return todo

# 更新
def update(id:int, request: Todo, db: Session):
    todo = db.query(models.Todo).filter(models.Todo.id == id)
    if not todo.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Blogのid={id}は無いよ(・∀・)')
    todo.update(request.dict())
    db.commit()

    return 'Update completed'

# 削除
def destroy(id:int, db:Session):
    todo = db.query(models.Todo).filter(models.Todo.id == id)
    if not todo.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Blogのid={id}は無いよ(・∀・)')
    todo.delete(synchronize_session=False)
    db.commit()

    return "deletion completed"
