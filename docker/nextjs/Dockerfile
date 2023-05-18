FROM node:alpine

WORKDIR /app/frontend


COPY ./frontend/package.json ./

# COPY ./frontend/yarn.lock ./


RUN yarn install --frozen-lockfile 

COPY ./frontend/ ./

RUN yarn build

EXPOSE 3000


USER node

CMD [  "yarn", "start" ]