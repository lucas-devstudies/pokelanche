from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.responses import JSONResponse
from models import User
from dependencies import pegar_sessao
from security import bcrypt_context
from schemas import UsuarioSchema

router = APIRouter(prefix='/auth', tags=['auth'])

@router.post('/')
async def create_user(dados: UsuarioSchema, session = Depends(pegar_sessao)):    
    usuario = session.query(User).filter(User.email==dados.email).first()

    if usuario:
        # Já existe um usuário com este e-mail
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, # Código de conflito
            detail='Já existe usuário cadastrado com este e-mail.'
        )
    
    # Cria usuário e retorna
    senha_criptografada = bcrypt_context.hash(dados.senha)
    novo_usuario = User(email=dados.email, senha=senha_criptografada)
    session.add(novo_usuario)
    session.commit()
   
    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content={
            "id": novo_usuario.id,
            "email": novo_usuario.email,
            "message": "Usuário cadastrado com sucesso."
        }
    )


@router.get('/')
async def list_all_users(session = Depends(pegar_sessao)):
    users = session.query(User).all()
    return users
    
@router.patch('/{id}')
async def edit_user(id: int, dados: UsuarioSchema, session = Depends(pegar_sessao)):
    pass

@router.delete('/{id}')
async def delete_user(id: int, session = Depends(pegar_sessao)):
    pass
    
@router.get('/autenticar')
async def autenticar(dados: UsuarioSchema, session = Depends(pegar_sessao)):
    pass    