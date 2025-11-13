from typing import List
from fastapi import File, Form, UploadFile
from pydantic import BaseModel

class UsuarioSchema(BaseModel):
    email: str
    senha: str
    
    class Config:
        from_attributes = True
        

class ProdutoSchema(BaseModel):
    id: int
    nome: str
    descricao: str
    url_imagem: str
    disponivel: bool
    valor: float
    

    class Config:
        orm_mode = True

class CategoriaComProdutosSchema(BaseModel):
    id: int
    nome: str
    url_imagem: str
    produtos: List[ProdutoSchema] = []

    class Config:
        orm_mode = True
