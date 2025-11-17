import shutil
from typing import List
from fastapi import APIRouter, Depends, File, Form, UploadFile, status, HTTPException
from fastapi.responses import JSONResponse
from models import Categoria
from dependencies import pegar_sessao, verificar_token
from models import User 
from sqlalchemy.orm import Session, joinedload
import os
from models import Produto
from sqlalchemy import select


from schemas import CategoriaComProdutosSchema

router = APIRouter(prefix='/categorias', tags=['categorias'])

UPLOAD_DIR = 'assets'
os.makedirs(UPLOAD_DIR, exist_ok=True)

def categoria_por_id(id: int, session: Session):
    categoria = session.query(Categoria).filter(Categoria.id==id).first()
    if not categoria:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Categoria não encontrada."
        )
    
    return categoria

@router.post('/cadastrar')
async def cadastrar_categoria(nome: str = Form(...),
                              imagem: UploadFile = File(...),
                              session: Session = Depends(pegar_sessao), 
                              usuario: User = Depends(verificar_token)):
    
    nova_categoria = Categoria(nome=nome, url_imagem="")
    session.add(nova_categoria)
    session.commit()
    session.refresh(nova_categoria)
    
    # Salva imagem no servidor
    extensao = imagem.filename.split('.')[-1]
    nome_arquivo = f'categoria_{nova_categoria.id}.{extensao}'
    url_imagem = os.path.join(UPLOAD_DIR, nome_arquivo)
    
    with open(url_imagem, "wb") as buffer:
        shutil.copyfileobj(imagem.file, buffer)
        
    # Atualiza url da imagem no banco
    nova_categoria.url_imagem = f"{UPLOAD_DIR}/{nome_arquivo}"
    session.commit()
    session.refresh(nova_categoria)
    
    return JSONResponse(
        status_code = status.HTTP_201_CREATED,
        content = {
            "id": nova_categoria.id,
            "nome": nova_categoria.nome,
            "url_imagem": nova_categoria.url_imagem,
            "message": "Categoria cadastrada com sucesso."
        }
    )

@router.get("/listar")
async def listar_categorias(session: Session = Depends(pegar_sessao), 
                            usuario: User = Depends(verificar_token)):
    categorias = session.query(Categoria).all()
    return categorias

@router.get("/listar_com_produtos", response_model=List[CategoriaComProdutosSchema])

async def listar_categorias_com_produtos(session: Session = Depends(pegar_sessao),):
    categorias = session.query(Categoria).options(joinedload(Categoria.produtos)).all()
    return categorias

@router.get('/buscar_por_id/{id}')
async def buscar_categoria_por_id(id: int, 
                                  session: Session = Depends(pegar_sessao), 
                                  usuario: User = Depends(verificar_token)):
    
    return categoria_por_id(id, session)

@router.patch('/editar/{id}')
async def editar_categoria(id: int,
               nome: str = Form(None),
               imagem: UploadFile = File(None),
               session: Session = Depends(pegar_sessao),
               usuario: User = Depends(verificar_token)):
    
    categoria = categoria_por_id(id, session)
    if nome is not None: categoria.nome = nome 
    
    # Salva a nova imagem no servidor (em caso de alteração)
    if imagem is not None:
        extensao = imagem.filename.split('.')[-1]
        nome_arquivo = f'categoria_{categoria.id}.{extensao}'
        url_imagem = os.path.join(UPLOAD_DIR, nome_arquivo)
        
        with open(url_imagem, "wb") as buffer:
            shutil.copyfileobj(imagem.file, buffer)
            
        categoria.url_imagem = f"{UPLOAD_DIR}/{nome_arquivo}"
    
    session.commit()
    session.refresh(categoria)
    
    return JSONResponse(
        status_code = status.HTTP_200_OK,
        content = {
            "id": categoria.id,
            "nome": categoria.nome,
            "url_imagem": categoria.url_imagem,
            "message": "Categoria atualizada com sucesso."
        }
    )
    
@router.delete('/deletar/{id}')
async def deletar_categoria_por_id(id: int,
                                 session: Session = Depends(pegar_sessao),
                                 usuario: User = Depends(verificar_token)):
    
    categoria = categoria_por_id(id, session)
    
    # verifica se há produtos usando essa categoria
    produtos = session.execute(
        select(Produto).where(Produto.categoria_id == id)
    ).scalars().all()

    if produtos:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Não é possível deletar a categoria, pois há produtos vinculados a ela."
        )
    
    caminho = categoria.url_imagem
    if os.path.exists(caminho):
        os.remove(caminho)
    
    session.delete(categoria)
    session.commit()
    
    return JSONResponse(
        status_code = status.HTTP_200_OK,
        content = {
            "message": "Categoria deletada com sucesso."
        }
    )