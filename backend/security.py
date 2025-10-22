from passlib.context import CryptContext
from dotenv import load_dotenv
import os

# Possibilitar criptografia e tokenização
load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
ACESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACESS_TOKEN_EXPIRE_MINUTES'))

bcrypt_context = CryptContext(schemes=['pbkdf2_sha256'], deprecated='auto')