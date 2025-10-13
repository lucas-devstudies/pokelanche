from fastapi import APIRouter

router = APIRouter()


@router.get("/produtos/{id}")
def get_produto_by_id(id: int):
    return {"titulo": "X-Pikachu", "url": "../assets/1.png", "descricao": "Uma explosão de sabores", "valor": 22.99}
