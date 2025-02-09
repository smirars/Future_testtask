# Используем официальный образ Node.js для сборки
FROM node:18-alpine AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --frozen-lockfile

# Копируем весь код проекта
COPY . .

# Собираем приложение
RUN npm run build

# Используем лёгкий веб-сервер для продакшена
FROM nginx:alpine

# Копируем файлы сборки в nginx
COPY --from=build /app/build /usr/share/nginx/html

# Открываем порт для сервера
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
