FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy file inside dist into ./dist folder (from outside into container dist)
COPY . .

CMD ["sh", "-c", "npm run db:deploy && npm run start:dev"]