# pip install "uvicorn[standard]"
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuração de CORS para permitir Angular (localhost:4200)
origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # ["*"] libera qualquer origem
    allow_credentials=True,
    allow_methods=["*"],     # permite GET, POST, PUT, DELETE...
    allow_headers=["*"],     # permite headers customizados
)

@app.get("/categorias")
def listar_categorias():
    produtos = [
        {"titulo": "Pão de Queijo", "url": "../assets/1.png", "descricao": "Uma explosão de sabores", "valor": 22.99}
        for _ in range(10)
    ]
    
    categorias = [
        {"nome": "Bebidas", "url": "../assets/cat-1.png", "produtos": produtos},
        {"nome": "Lanches", "url": "../assets/cat-2.png", "produtos": produtos},
        {"nome": "Doces", "url": "../assets/cat-3.png", "produtos": produtos}
    ]
    
    return categorias

@app.get("/produtos/{id}")
def get_produto_by_id(id: int):
    return {"titulo": "X-Pikachu", "url": "../assets/1.png", "descricao": "Uma explosão de sabores", "valor": 22.99}
