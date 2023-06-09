FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install\
    && npm install typescript -g

# RUN npm install -g typescript
COPY . .

RUN npx tsc

EXPOSE 3000

CMD [ "node", "build/app.js" ]
