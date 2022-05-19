FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG API_URL=http://35.175.64.41:8080/api/v1
ENV API_URL=${API_URL}
ARG APP_NAME
ENV APP_NAME=${APP_NAME}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=prod

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
