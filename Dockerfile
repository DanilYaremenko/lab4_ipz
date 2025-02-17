FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000
EXPOSE 8001

CMD ["npm", "run", "start"]
