from fastapi import APIRouter, Depends, status, Response
from ..schemas import Blog
from ..database import get_db
from ..functions import blog
from sqlalchemy.orm import Session

router = APIRouter(
    prefix='/blog',
    tags=['blogs'],
)

# 全件取得
@router.get('/')
def all_fetch(db: Session = Depends(get_db)):
    return blog.get_all(db)

# 新規登録
@router.post('/', status_code=status.HTTP_201_CREATED)
def create(request: Blog, db: Session = Depends(get_db)):
    return blog.create(request, db)

# id取得
@router.get('/{id}', status_code=status.HTTP_200_OK)
def show(id: int, db: Session = Depends(get_db)):
    return blog.show(id, db)

# 更新
@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
def update(id, request: Blog, db: Session = Depends(get_db)):
    return blog.update(id, request, db)

# 削除
@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete(id: int, db: Session = Depends(get_db)):
    return blog.destroy(id, db)
