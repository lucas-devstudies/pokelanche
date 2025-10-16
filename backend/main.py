from fastapi import FastAPI

from config import setup_cors
from routes import api_router


# Criação do APP
app = FastAPI()

# Configuração das rotas
setup_cors(app)             
app.include_router(api_router)  
