# Use a imagem oficial do Node.js na versão 22.11
FROM node:22.11

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instala as dependências
RUN npm install --production

# Copia o restante do código da aplicação para o container
COPY . .

# Exponha a porta que sua API utiliza (no seu caso, 3003)
EXPOSE 3003

# Comando para iniciar sua API. Ajuste se o seu arquivo de entrada for diferente (por exemplo, server.js ou app.js)
CMD ["node", "server.js"]
