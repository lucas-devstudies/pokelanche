from pydantic import BaseModel

class UsuarioSchema(BaseModel):
    email: str
    senha: str
    
    class Config:
        from_attributes = True

class CategoriaSchema(BaseModel):
    nome: str
    url_imagem: str
    
    class Config:
        from_attributes = True
    
class ProdutoSchema(BaseModel):
    nome: str
    descricao: str
    categoria_id: str
    
    class Config:
        from_attributes = True