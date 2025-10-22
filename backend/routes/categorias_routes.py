from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from schemas import CategoriaSchema
from models import Categoria
from dependencies import pegar_sessao

router = APIRouter(prefix='/categorias', tags=['categorias'])

@router.post('/add')
async def add_categoria(dados: CategoriaSchema, session = Depends(pegar_sessao)):
    nova_categoria = Categoria(nome=dados.nome, url_imagem=dados.url_imagem)
    session.add(nova_categoria)
    session.commit()
    
    return JSONResponse(
        status_code = status.HTTP_201_CREATED,
        content = {
            "id": nova_categoria.id,
            "nome": nova_categoria.nome,
            "url_imagem": nova_categoria.url_imagem,
            "message": "Categoria cadastrada com sucesso."
        }
    )

@router.get("/list")
async def list_categorias():
    sanduiches = [
        {"id": 36, "titulo": "X-Pikachu", "url": "../assets/36.png", "descricao": "Uma explosão de sabores", "valor": 27.99},
        {"id": 35, "titulo": "X-Bulbasaur", "url": "../assets/35.png", "descricao": "Uma explosão de sabores", "valor": 23.99},
        {"id": 34, "titulo": "X-Charmander", "url": "../assets/34.png", "descricao": "Uma explosão de sabores", "valor": 23.99},
        {"id": 33, "titulo": "Iniciais-X", "url": "../assets/33.png", "descricao": "Uma explosão de sabores", "valor": 69.99},
        {"id": 32, "titulo": "Dug-Trio", "url": "../assets/32.png", "descricao": "Uma explosão de sabores", "valor": 31.99},
        {"id": 31, "titulo": "X-Eevee", "url": "../assets/31.png", "descricao": "Uma explosão de sabores", "valor": 33.99},        
    ]
    
    tapiocas = [
        {"id": 30, "titulo": "Tapioca Mista", "url": "../assets/30.png", "descricao": "Uma explosão de sabores", "valor": 15.99},
        {"id": 25, "titulo": "Tapioca Com Queijo", "url": "../assets/25.png", "descricao": "Uma explosão de sabores", "valor": 11.99},
        {"id": 26, "titulo": "Tapioca Com Ovo", "url": "../assets/26.png", "descricao": "Uma explosão de sabores", "valor": 11.99},
        {"id": 27, "titulo": "Tapioca com Tucumã", "url": "../assets/27.png", "descricao": "Uma explosão de sabores", "valor": 13.99},
        {"id": 28, "titulo": "Tapioca Com Frango", "url": "../assets/28.png", "descricao": "Uma explosão de sabores", "valor": 18.99},
        {"id": 29, "titulo": "Tapioca Com Carne", "url": "../assets/29.png", "descricao": "Uma explosão de sabores", "valor": 21.99},        
    ]
    
    salgados = [
        {"id": 6, "titulo": "Coxinha", "url": "../assets/6.png", "descricao": "Uma explosão de sabores", "valor": 7.99},
        {"id": 5, "titulo": "Pastéis de Carne", "url": "../assets/5.png", "descricao": "Uma explosão de sabores", "valor": 21.99},
        {"id": 4, "titulo": "Empadumbreon", "url": "../assets/4.png", "descricao": "Uma explosão de sabores", "valor": 7.99},
        {"id": 1 ,"titulo": "Pães de Queijo", "url": "../assets/1.png", "descricao": "Uma explosão de sabores", "valor": 24.99},
        {"id": 2, "titulo": "Torta de Frango", "url": "../assets/2.png", "descricao": "Uma explosão de sabores", "valor": 17.99},
        {"id": 3, "titulo": "Esfirra Portuguesa", "url": "../assets/3.png", "descricao": "Uma explosão de sabores", "valor": 24.99},        
    ]
    
    doces = [
        {"id": 7, "titulo": "Brigagible", "url": "../assets/7.png", "descricao": "Uma explosão de sabores", "valor": 5.99},
        {"id": 8, "titulo": "Cookeevee", "url": "../assets/8.png", "descricao": "Uma explosão de sabores", "valor": 7.99},
        {"id": 9, "titulo": "Cupceeveee", "url": "../assets/9.png", "descricao": "Uma explosão de sabores", "valor": 11.99},
        {"id": 10, "titulo": "Sorvechu", "url": "../assets/10.png", "descricao": "Uma explosão de sabores", "valor": 9.99},
        {"id": 11, "titulo": "Magic Stick Furret", "url": "../assets/11.png", "descricao": "Uma explosão de sabores", "valor": 19.99},
        {"id": 12, "titulo": "Crustle Choccolato", "url": "../assets/12.png", "descricao": "Uma explosão de sabores", "valor": 17.99},        
    ]    
    
    bebidas = [
        {"id": 13, "titulo": "Café Quenchu", "url": "../assets/13.png", "descricao": "Uma explosão de sabores", "valor": 17.99},
        {"id": 14, "titulo": "Café Snorlax", "url": "../assets/14.png", "descricao": "Uma explosão de sabores", "valor": 17.99},
        {"id": 15, "titulo": "Coffeevee Gelado", "url": "../assets/15.png", "descricao": "Uma explosão de sabores", "valor": 11.99},
        {"id": 16, "titulo": "Milk-Shakeeve", "url": "../assets/16.png", "descricao": "Uma explosão de sabores", "valor": 17.99},
        {"id": 17, "titulo": "Coca-Cola 350ml", "url": "../assets/17.png", "descricao": "Uma explosão de sabores", "valor": 4.99},
        {"id": 18, "titulo": "Suco de Maracujá", "url": "../assets/18.png", "descricao": "Uma explosão de sabores", "valor": 7.99},        
    ]    
    
    gastronomiaII = [
        {"id": 19, "titulo": "Pizza de Feeijão e Ovo", "url": "../assets/19.png", "descricao": "Uma explosão de sabores", "valor": 29.99},
        {"id": 20, "titulo": "Bolo de Chocolate", "url": "../assets/20.png", "descricao": "Uma explosão de sabores", "valor": 24.99},
        {"id": 21, "titulo": "Bolo de Alface", "url": "../assets/21.png", "descricao": "Uma explosão de sabores", "valor": 24.99},
        {"id": 22, "titulo": "Bolo de Cuscuz", "url": "../assets/22.png", "descricao": "Uma explosão de sabores", "valor": 24.99},
        {"id": 23, "titulo": "Bolo de Cebola", "url": "../assets/23.png", "descricao": "Uma explosão de sabores", "valor": 24.99},
        {"id": 24, "titulo": "Cuscuz Paulista", "url": "../assets/24.png", "descricao": "Uma explosão de sabores", "valor": 24.99},        
    ]     
    
    categorias = [
        {"id": 3, "nome": "Sanduíches", "url": "../assets/cat-3.png", "produtos": sanduiches},
        {"id": 5, "nome": "Tapiocas", "url": "../assets/cat-5.png", "produtos": tapiocas},
        {"id": 4, "nome": "Salgados", "url": "../assets/cat-4.png", "produtos": salgados},
        {"id": 2, "nome": "Doces", "url": "../assets/cat-2.png", "produtos": doces},
        {"id": 6, "nome": "Bebidas", "url": "../assets/cat-6.png", "produtos": bebidas},
        {"id": 1, "nome": "Gastronomia II", "url": "../assets/cat-1.png", "produtos": gastronomiaII}

    ]
    
    return categorias
