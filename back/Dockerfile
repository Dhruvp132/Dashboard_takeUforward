FROM node:20 

WORKDIR /app

COPY package*.json . 
COPY ./prisma ./prisma

RUN npm install 
RUN npx prisma generate

COPY . . 

RUN npm run deploy 

EXPOSE 8787

CMD [ "npm", "run", "dev"]