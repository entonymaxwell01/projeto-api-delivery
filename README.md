# projeto-api-delivery

## Descrição

**O que o app faz:**  
Este projeto é uma API para restaurantes com delivery. Ele possibilita o gerenciamento de operações como pedidos, clientes, entregas e outros aspectos essenciais para um serviço de delivery.

**Com o que foi construído:**

- **Linguagem:** JavaScript
- **Framework:** NodeJS
- **Banco de Dados:** PostgreSQL
- **Documentação:** Swagger
- **Testes Automatizados:** Cypress e Robot Framework

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

*Obs: Com o docker aberto em segundo plano, faça os seguintes passos a seguir*

3. **Criar (ou reconstruir) as imagens dos containers**

 ```bash
 docker-compose build
 ```

Isso irá construir as imagens baseadas na configuração do docker-compose.yml.

4. **Subir os containers em segundo plano**

```bash
docker-compose up -d
```

5. **Verificar se os containers estão rodando**


```bash
docker ps
```

*Obs: Caso estejam rodando corretamente as imagens aparecereção desta forma (exemplo):*
```bash
CONTAINER ID   IMAGE                      COMMAND                  CREATED      STATUS          PORTS                    NAMES
2c5a871c0ef3   projeto-api-delivery-app   "docker-entrypoint.s…"   2 days ago   Up 58 seconds   0.0.0.0:3003->3003/tcp   projeto-api-delivery-app-1
de3bdb102267   postgres:17                "docker-entrypoint.s…"   2 days ago   Up 8 minutes    0.0.0.0:5432->5432/tcp   projeto-api-delivery-db-1
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
    "password": "123"
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

## Testes Automatizados na API
Estes são os testes automatizados que foram realizados nesta mesma API, visando garantir a qualidade da mesma.

### Tecnologias Utilizadas 
- **Cypress**: Testes de ponta a ponta para validar a interação com a API de forma programática.
- **Robot Framework**: Testes baseados em palavras-chave para automação de fluxos complexos e validação de respostas da API.

### Execução dos Testes
- Acesse o diretório dos testes que quer que sejam executados

#### Cypress:

```bash
cd projeto-api-delivery/testes-api-delivery-cypress
```

- Para rodar os testes com Cypress, execute:
```bash
npx cypress open
```

- Ou para execução em modo headless:
```bash
npx cypress run
```

#### Robot Framework:

```bash
cd projeto-api-delivery/testes-api-delivery-robot
```

- Para rodar os testes com Robot, execute:
```bash
robot -d results testcases/
```

### Relatórios
- Os resultados dos testes são gerados automaticamente e podem ser acessados nos seguintes arquivos:
- **Cypress**: cypress/reports/
- **Robot Framework**: testcases/*{perfil_exemplo}*/*{test_exemplo}*/results/log.html

**A seguir serão apresentados alguns relátorios de testes**

#### Relatórios testes com Cypress:



#### Relatórios testes com Robot:






