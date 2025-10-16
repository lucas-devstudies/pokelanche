from pydantic import BaseModel

class UsuarioSchema(BaseModel):
    email: str
    senha: str