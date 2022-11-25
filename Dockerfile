FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx prisma generate
EXPOSE 3000

CMD ["npm", "run", "dev"]