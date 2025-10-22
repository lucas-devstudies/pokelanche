from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from models import User
from dependencies import pegar_sessao, verificar_token
from security import bcrypt_context, SECRET_KEY, ACESS_TOKEN_EXPIRE_MINUTES, ALGORITHM
from schemas import UsuarioSchema
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone

router = APIRouter(prefix='/auth', tags=['auth'])

def criar_token(id_usuario, duracao_token=timedelta(minutes=ACESS_TOKEN_EXPIRE_MINUTES)):
    data_expiracao = datetime.now(timezone.utc) + duracao_token
    dict_info = {'sub': str(id_usuario), 'exp': data_expiracao}
    jwt_codificade = jwt.encode(dict_info, SECRET_KEY, ALGORITHM)
    return jwt_codificade

def autenticar_user(email, senha, session: Session):
    usuario = session.query(User).filter(User.email==email).first()
    
    if not usuario: 
        return False
    
    if not bcrypt_context.verify(senha, usuario.senha):
        return False 
    
    return usuario

@router.post('/create')
async def create_user(dados: UsuarioSchema, session: Session = Depends(pegar_sessao)):    
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


@router.get('/list')
async def list_all_users(session: Session = Depends(pegar_sessao)):
    users = session.query(User).all()
    return users
    
@router.patch('/edit/{id}')
async def edit_user(id: int, dados: UsuarioSchema, session: Session = Depends(pegar_sessao)):
    pass

@router.delete('/delete/{id}')
async def delete_user(id: int, session: Session = Depends(pegar_sessao)):
    pass
    
@router.post('/login')
async def login(dados: UsuarioSchema, session: Session = Depends(pegar_sessao)):
    usuario = autenticar_user(dados.email, dados.senha, session)
    
    if not usuario:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST, 
            detail = 'Usuário não encontrado ou credenciais incorretas.'
        )
    
    acess_token = criar_token(usuario.id)
    refresh_token = criar_token(usuario.id, duracao_token=timedelta(days=7))
    return {
        'access_token': acess_token,
        'refresh_token': refresh_token,
        'token_type': 'Bearer'
        }
    
@router.get('/refresh')
async def use_refresh_token(usuario: User = Depends(verificar_token)):
    access_token = criar_token(usuario.id)
    
    return {
        'access_token': access_token,
        'token_type': 'Bearer'
    }