FROM node:16 AS build
WORKDIR /app
ARG REACT_APP_API_URL
COPY package.json .
RUN npm install
COPY . /app
ENV REACT_APP_API_URL $REACT_APP_API_URL
RUN npm run build
FROM nginx:1.26
COPY --from=build /app/build /usr/share/nginx/html