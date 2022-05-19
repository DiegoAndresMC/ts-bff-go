FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG API_URL
ENV API_URL=${API_URL}
ARG APP_NAME
ENV APP_NAME=${APP_NAME}

WORKDIR /usr/src/app

COPY package*.json ./

EXPOSE 3000:3000
RUN npm install --only=prod --force

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
