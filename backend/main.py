# pip install "uvicorn[standard]"
from fastapi import FastAPI
from core.config import setup_cors
from api.routes import api_router

app = FastAPI()

setup_cors(app)            # CORS vem de fora
app.include_router(api_router)  # Rotas todas organizadas
