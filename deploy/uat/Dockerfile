FROM node:alpine

WORKDIR /app/frontend

COPY ./frontend/package.json ./
COPY ./frontend/yarn.lock ./
COPY ./frontend/ .

RUN yarn install

EXPOSE 3000

CMD ["sh", "-c", "yarn build && yarn start"]

