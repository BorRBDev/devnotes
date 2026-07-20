# ---- Etapa 1: construir la app ----
FROM node:22-alpine AS build
WORKDIR /app

# Copiamos solo los package primero (aprovecha la caché de Docker)
COPY package*.json ./
RUN npm ci

# Copiamos el resto del código y construimos
COPY . .

# Las variables VITE_ se necesitan al construir (Vite las compila dentro)
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
RUN npm run build

# ---- Etapa 2: servir la app ----
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]