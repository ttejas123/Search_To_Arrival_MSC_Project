FROM node:14

WORKDIR /var/app

COPY package*.json ./

RUN npm install

COPY . .

ENV DATABASE_URL="mysql://root:password@localhost:3309/CollegeTripV1" 

RUN npx tsc

EXPOSE 3000

CMD [ "npm", "run", "start" ]