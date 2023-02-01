FROM node:18-alpine as build

WORKDIR /usr/project

COPY package*.json ./

RUN apk add --no-cache make gcc g++ python3
RUN npm install
RUN npm rebuild bcrypt
RUN apk del make gcc g++ python3

COPY . .

RUN npm run build

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/project

COPY package*.json ./

RUN apk add --no-cache make gcc g++ python3
RUN npm install
RUN npm rebuild bcrypt
RUN apk del make gcc g++ python3

COPY --from=build /usr/project/dist ./dist

CMD ["node", "dist/main"]
