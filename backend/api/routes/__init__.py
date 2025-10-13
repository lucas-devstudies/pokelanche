from fastapi import APIRouter
from .categorias import router as categorias_router
from .produtos import router as produtos_router

api_router = APIRouter()
api_router.include_router(categorias_router)
api_router.include_router(produtos_router)
