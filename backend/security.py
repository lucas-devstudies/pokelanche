from passlib.context import CryptContext
from dotenv import load_dotenv
import os

# Possibilitar criptografia
load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')
bcrypt_context = CryptContext(schemes=['pbkdf2_sha256'], deprecated='auto')