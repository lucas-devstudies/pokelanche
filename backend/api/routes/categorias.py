from fastapi import APIRouter

router = APIRouter()

@router.get("/categorias")
def listar_categorias():
    sanduiches = [
        {"titulo": "X-Pikachu", "url": "../assets/36.png", "descricao": "Uma explosão de sabores", "valor": 27.99},
        {"titulo": "X-Bulbasaur", "url": "../assets/35.png", "descricao": "Uma explosão de sabores", "valor": 23.99},
        {"titulo": "X-Charmander", "url": "../assets/34.png", "descricao": "Uma explosão de sabores", "valor": 23.99},
        {"titulo": "Iniciais-X", "url": "../assets/33.png", "descricao": "Uma explosão de sabores", "valor": 69.99},
        {"titulo": "Dug-Trio", "url": "../assets/32.png", "descricao": "Uma explosão de sabores", "valor": 31.99},
        {"titulo": "X-Eevee", "url": "../assets/31.png", "descricao": "Uma explosão de sabores", "valor": 33.99},        
    ]
    
    tapiocas = [
        {"titulo": "Tapioca Mista", "url": "../assets/30.png", "descricao": "Uma explosão de sabores", "valor": 15.99},
        {"titulo": "Tapioca Com Queijo", "url": "../assets/25.png", "descricao": "Uma explosão de sabores", "valor": 11.99},
        {"titulo": "Tapioca Com Ovo", "url": "../assets/26.png", "descricao": "Uma explosão de sabores", "valor": 11.99},
        {"titulo": "Tapioca com Tucumã", "url": "../assets/27.png", "descricao": "Uma explosão de sabores", "valor": 13.99},
        {"titulo": "Tapioca Com Frango", "url": "../assets/28.png", "descricao": "Uma explosão de sabores", "valor": 18.99},
        {"titulo": "Tapioca Com Carne", "url": "../assets/29.png", "descricao": "Uma explosão de sabores", "valor": 21.99},        
    ]
    
    salgados = [
        {"titulo": "Coxinha", "url": "../assets/6.png", "descricao": "Uma explosão de sabores", "valor": 7.99},
        {"titulo": "Pastéis de Carne", "url": "../assets/5.png", "descricao": "Uma explosão de sabores", "valor": 21.99},
        {"titulo": "Empadumbreon", "url": "../assets/4.png", "descricao": "Uma explosão de sabores", "valor": 7.99},
        {"titulo": "Pães de Queijo", "url": "../assets/1.png", "descricao": "Uma explosão de sabores", "valor": 24.99},
        {"titulo": "Torta de Frango", "url": "../assets/2.png", "descricao": "Uma explosão de sabores", "valor": 17.99},
        {"titulo": "Esfirra Portuguesa", "url": "../assets/3.png", "descricao": "Uma explosão de sabores", "valor": 24.99},        
    ]
    
    doces = [
        {"titulo": "Brigagible", "url": "../assets/7.png", "descricao": "Uma explosão de sabores", "valor": 5.99},
        {"titulo": "Cookeevee", "url": "../assets/8.png", "descricao": "Uma explosão de sabores", "valor": 7.99},
        {"titulo": "Cupceeveee", "url": "../assets/9.png", "descricao": "Uma explosão de sabores", "valor": 11.99},
        {"titulo": "Sorvechu", "url": "../assets/10.png", "descricao": "Uma explosão de sabores", "valor": 9.99},
        {"titulo": "Magic Stick Furret", "url": "../assets/11.png", "descricao": "Uma explosão de sabores", "valor": 19.99},
        {"titulo": "Crustle Choccolato", "url": "../assets/12.png", "descricao": "Uma explosão de sabores", "valor": 17.99},        
    ]    
    
    bebidas = [
        {"titulo": "Café Quenchu", "url": "../assets/13.png", "descricao": "Uma explosão de sabores", "valor": 17.99},
        {"titulo": "Café Snorlax", "url": "../assets/14.png", "descricao": "Uma explosão de sabores", "valor": 17.99},
        {"titulo": "Coffeevee Gelado", "url": "../assets/15.png", "descricao": "Uma explosão de sabores", "valor": 11.99},
        {"titulo": "Milk-Shakeeve", "url": "../assets/16.png", "descricao": "Uma explosão de sabores", "valor": 17.99},
        {"titulo": "Coca-Cola 350ml", "url": "../assets/17.png", "descricao": "Uma explosão de sabores", "valor": 4.99},
        {"titulo": "Suco de Maracujá", "url": "../assets/18.png", "descricao": "Uma explosão de sabores", "valor": 7.99},        
    ]    
    
    gastronomiaII = [
        {"titulo": "Pizza de Feeijão e Ovo", "url": "../assets/19.png", "descricao": "Uma explosão de sabores", "valor": 29.99},
        {"titulo": "Bolo de Chocolate", "url": "../assets/20.png", "descricao": "Uma explosão de sabores", "valor": 24.99},
        {"titulo": "Bolo de Alface", "url": "../assets/21.png", "descricao": "Uma explosão de sabores", "valor": 24.99},
        {"titulo": "Bolo de Cuscuz", "url": "../assets/22.png", "descricao": "Uma explosão de sabores", "valor": 24.99},
        {"titulo": "Bolo de Cebola", "url": "../assets/23.png", "descricao": "Uma explosão de sabores", "valor": 24.99},
        {"titulo": "Cuscuz Paulista", "url": "../assets/24.png", "descricao": "Uma explosão de sabores", "valor": 24.99},        
    ]     
    
    categorias = [
        {"nome": "Sanduíches", "url": "../assets/cat-3.png", "produtos": sanduiches},
        {"nome": "Tapiocas", "url": "../assets/cat-5.png", "produtos": tapiocas},
        {"nome": "Salgados", "url": "../assets/cat-4.png", "produtos": salgados},
        {"nome": "Doces", "url": "../assets/cat-2.png", "produtos": doces},
        {"nome": "Bebidas", "url": "../assets/cat-6.png", "produtos": bebidas},
        {"nome": "Gastronomia II", "url": "../assets/cat-1.png", "produtos": gastronomiaII}

    ]
    
    return categorias
