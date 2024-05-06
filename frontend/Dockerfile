FROM node:16 AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm build

FROM nginx:1.26
COPY build/ /usr/share/nginx/html