# projeto-api-delivery

## Descrição

**O que o app faz:**  
Este projeto é uma API para restaurantes com delivery. Ele possibilita o gerenciamento de operações como pedidos, clientes, entregas e outros aspectos essenciais para um serviço de delivery.

**Com o que foi construído:**

- **Linguagem:** JavaScript
- **Framework:** NodeJS
- **Banco de Dados:** PostgreSQL
- **Documentação:** Swagger
- **Testes Automatizados:** Cypress

**Por que:**  
O projeto foi desenvolvido para fins de portfólio e prática, demonstrando habilidades na criação de APIs robustas, na documentação de endpoints e na implementação de testes automatizados.

## Tecnologias e Linguagens Utilizadas

![NodeJS](https://img.shields.io/badge/NodeJS-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)

## Como Instalar

### Pré-requisitos

- **Docker:**  
  Certifique-se de ter o Docker instalado em sua máquina. Se você ainda não possui o Docker, consulte a [documentação oficial do Docker](https://docs.docker.com/get-docker/) para realizar o download e a instalação.

### Etapas

1. **Clonar o repositório:**

   ```bash
   git clone https://github.com/entonymaxwell01/projeto-api-delivery


   ```

2. **Entrar no diretório do projeto:**

   ```bash
   cd projeto-api-delivery

   ```

3. **Fazendo build do Docker:**

   ```bash
   Obs.: Ainda estou configurando o Docker, em breve as instruções completas serão atualizadas
   # Comandos de build do Docker serão adicionados aqui
   ```

## Como usar

1.**Acessar a API:**
A API pode ser acessada através de uma ferramenta de sua escolha (como o Postman) ou diretamente pelo navegador:

API: <http://localhost:3003>
Documentação (Swagger): <http://localhost:3003/api-docs>

2.**Realizar Login:**
Utilize as credenciais que serão definidas:

    {
    "email": "test@test.com",
    "password": "123
    }

3.**Utilizando o Token:**
Após o login, um token será retornado no body:

    {
    "token: "token_aleatorio"
    }

No Postman: Adicione o token no header utilizando a chave Authorization.
No Swagger: Clique em "Authorize" e insira o token para autenticar as rotas.

4.**Acessar os Endpoints:**
Consulte a documentação completa no Swagger para acessar e testar os endpoints desejados.
Documentação (Swagger): <http://localhost:3003/api-docs>
