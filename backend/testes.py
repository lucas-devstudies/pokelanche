import requests

headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNCIsImV4cCI6MTc2MTc0ODkyMX0.CNqCoLpfq7A9Uiwo9Z1BFbhoWV5NebmMdYQy8wJFDJw'
}

requisicao = requests.get('http://127.0.0.1:8000/auth/refresh', headers=headers)

print(requisicao)
print(requisicao.json)