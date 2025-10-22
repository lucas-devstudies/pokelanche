from passlib.context import CryptContext
from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer
import os

# Possibilitar criptografia e tokenização
load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
ACESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACESS_TOKEN_EXPIRE_MINUTES'))

oauth2_schema = OAuth2PasswordBearer(tokenUrl='auth/login')

bcrypt_context = CryptContext(schemes=['pbkdf2_sha256'], deprecated='auto')