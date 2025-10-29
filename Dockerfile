# Etapa 1: Construcción
FROM node:22 AS build
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
RUN npm install

# Copiar todo el código fuente
COPY . .

# Construir la aplicación con SSR
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/pokemon-ngxs/browser /usr/share/nginx/html

EXPOSE 4201
CMD ["nginx", "-g", "daemon off;"]