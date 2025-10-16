from fastapi.middleware.cors import CORSMiddleware

def setup_cors(app):
    # Configuração de CORS para permitir Angular (localhost:4200)
    origins = [
        "http://localhost:4200",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,  # ["*"] libera qualquer origem
        allow_credentials=True,
        allow_methods=["*"],     # permite GET, POST, PUT, DELETE...
        allow_headers=["*"],     # permite headers customizados
    )
