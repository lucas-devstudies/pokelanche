from sqlalchemy import Boolean, create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

# Conexão do Banco
db = create_engine('sqlite:///database/banco.db')

# Base do Banco de Dados
Base = declarative_base()

class Categoria(Base):
    __tablename__ = 'categorias'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String, nullable=False)
    url_imagem = Column(String, nullable=False)

    produtos = relationship("Produto", back_populates="categoria")        

class Produto(Base):
    __tablename__ = 'produtos'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String, nullable=False)
    descricao = Column(String, nullable=False)
    url_imagem = Column(String, nullable=False)
    categoria_id = Column(Integer, ForeignKey('categorias.id'), nullable=False)
    ativo = Column(Boolean, default=True)

    categoria = relationship("Categoria", back_populates="produtos")
        
class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, nullable=False)
    senha = Column(String, nullable=False)

Base.metadata.create_all(bind=db)
