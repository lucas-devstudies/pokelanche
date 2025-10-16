from fastapi import APIRouter

router = APIRouter(prefix='/produtos', tags=['produtos'])

@router.get("/{id}")
async def get_produto_by_id(id: int):
    return {"titulo": "X-Pikachu", "url": "../assets/1.png", "descricao": "Uma explosão de sabores", "valor": 22.99}
