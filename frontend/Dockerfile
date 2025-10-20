# frontend/Dockerfile
FROM node:20-alpine
WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar código
COPY . .

# Exponer puerto de Vite
EXPOSE 5173

# Comando para levantar el servidor Vite en todas las interfaces
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
