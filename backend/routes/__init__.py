from fastapi import APIRouter
from routes.categorias_routes import router as categorias_router
from routes.produtos_routes import router as produtos_router
from routes.auth_routes import router as auth_router

api_router = APIRouter()

api_router.include_router(categorias_router)
api_router.include_router(produtos_router)
api_router.include_router(auth_router)