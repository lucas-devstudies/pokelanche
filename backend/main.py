from fastapi import FastAPI

from config import setup_cors
from routes import api_router
from fastapi.middleware.cors import CORSMiddleware

import os

# Criação do APP
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # URL do front
    allow_credentials=True,
    allow_methods=["*"],   
    allow_headers=["*"],   
)

# Configuração das rotas
app.include_router(api_router)  

# Pasta de uploads para imagens
