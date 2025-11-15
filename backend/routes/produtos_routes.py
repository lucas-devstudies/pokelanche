import shutil
from fastapi import APIRouter, File, Form, HTTPException, UploadFile, status
from sqlalchemy.orm import Session
from fastapi import Depends
from fastapi.responses import JSONResponse
from dependencies import pegar_sessao, verificar_token
from models import Produto, User
import os

router = APIRouter(prefix='/produtos', tags=['produtos'])

UPLOAD_DIR = 'assets'
os.makedirs(UPLOAD_DIR, exist_ok=True)

def buscar_por_id(id: int, session: Session):
    produto = session.query(Produto).filter(Produto.id==id).first()
    
    if not produto:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Produto não encontrado.'
        )
        
    return produto

@router.post("/cadastrar")
async def cadastrar_produto(nome: str = Form(...), 
                            descricao: str = Form(...),
                            categoria_id: int = Form(...),
                            imagem: UploadFile = File(...),
                            valor: float = Form(...),
                            session: Session = Depends(pegar_sessao), 
                            usuario: User = Depends(verificar_token)):
    
    novo_produto = Produto(nome=nome, valor=valor, descricao=descricao, url_imagem="", categoria_id=categoria_id)    
    session.add(novo_produto)
    session.commit()
    session.refresh(novo_produto)
    
    # Salva a imagem no servidor
    extensao = imagem.filename.split('.')[-1]
    nome_arquivo = f'produto_{novo_produto.id}.{extensao}'
    url_imagem = os.path.join(UPLOAD_DIR, nome_arquivo)
    
    with open(url_imagem, "wb") as buffer:
        shutil.copyfileobj(imagem.file, buffer)
    
    # Atualiza url da imagem no banco
    novo_produto.url_imagem = f"{UPLOAD_DIR}/{nome_arquivo}"
    session.commit()
    session.refresh(novo_produto)
    
    return JSONResponse(
        status_code = status.HTTP_201_CREATED,
        content = {
            "id": novo_produto.id,
            "nome": novo_produto.nome,
            "url_imagem": novo_produto.url_imagem,
            "categoria": novo_produto.categoria.nome,
            "disponivel": novo_produto.disponivel,
            "valor": novo_produto.valor,
            "message": "Produto cadastrado com sucesso."
        }
    )
    
@router.get('/listar')
async def listar_produtos(session: Session = Depends(pegar_sessao), 
                        usuario: User = Depends(verificar_token)):
    produtos = session.query(Produto).all()
    return produtos

@router.get("/buscar_por_id/{id}")
async def buscar_produto_por_id(id: int,
                            session: Session = Depends(pegar_sessao),
                            usuario: User = Depends(verificar_token)):
    
    produto = buscar_por_id(id, session)
      
    return JSONResponse(
        status_code = status.HTTP_200_OK,
        content = {
            "produto": {
                "id": produto.id,
                "nome": produto.nome,
                "descricao": produto.descricao,
                "url_imagem": produto.url_imagem,
                "categoria": produto.categoria.nome,
                "disponivel": produto.disponivel,
                "valor": produto.valor,
            }, 
            "categoria": produto.categoria.id 
        }
    )

@router.patch('/editar/{id}')
async def editar_produto(id: int,
               nome: str = Form(None),
               descricao: str = Form(None),
               #coloquei pra tentar deixar a edição sem colocar a categoria do produto alterável
               #categoria_id: int = Form(None),
               imagem: UploadFile = File(None),
               valor: float = Form(None),
               session: Session = Depends(pegar_sessao),
               usuario: User = Depends(verificar_token)):
    
    produto = buscar_por_id(id, session)
    if nome is not None: produto.nome = nome 
    if descricao is not None: produto.descricao = descricao
    if valor is not None: produto.valor = valor
    
    # Salva a nova imagem no servidor (em caso de alteração)
    if imagem is not None:
        extensao = imagem.filename.split('.')[-1]
        nome_arquivo = f'produto_{produto.id}.{extensao}'
        url_imagem = os.path.join(UPLOAD_DIR, nome_arquivo)
        
        with open(url_imagem, "wb") as buffer:
            shutil.copyfileobj(imagem.file, buffer)
            
        produto.url_imagem = f"/{UPLOAD_DIR}/{nome_arquivo}"
    
    session.commit()
    session.refresh(produto)
    
    return JSONResponse(
        status_code = status.HTTP_200_OK,
        content = {
            "id": produto.id,
            "nome": produto.nome,
            "url_imagem": produto.url_imagem,
            "categoria": produto.categoria.nome,
            "disponivel": produto.disponivel,
            "valor": produto.valor,
            "message": "Produto atualizado com sucesso."
        }
    )
    
@router.delete('/deletar/{id}')
async def deletar_produto_por_id(id: int,
                                 session: Session = Depends(pegar_sessao),
                                 usuario: User = Depends(verificar_token)):
    
    produto = buscar_por_id(id, session)
    
    caminho = produto.url_imagem
    if os.path.exists(caminho):
        os.remove(caminho)
    
    session.delete(produto)
    session.commit()
    
    return JSONResponse(
        status_code = status.HTTP_200_OK,
        content = {
            "message": "Produto deletado com sucesso."
        }
    )

@router.patch('/alterar_estado/{id}')
async def alterar_estado(id: int,
               session: Session = Depends(pegar_sessao),
               usuario: User = Depends(verificar_token)):
    
    produto = buscar_por_id(id, session)
    if produto.disponivel == True: produto.disponivel = False 
    else: produto.disponivel = True
    
    session.commit()
    session.refresh(produto)
    
    return JSONResponse(
        status_code = status.HTTP_200_OK,
        content = {
            "id": produto.id,
            "nome": produto.nome,
            "descricao": produto.descricao,
            "valor": produto.valor,
            "url_imagem": produto.url_imagem,
            "categoria": produto.categoria.nome,
            "disponivel": produto.disponivel,
            "message": "Produto com estado alterado."
        }
    )