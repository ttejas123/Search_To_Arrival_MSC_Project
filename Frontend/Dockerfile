FROM node:14

WORKDIR /var/app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_REACT_APP_GOOGLE_MAPS_API_KEY=<Google_API_Key> \
    VITE_REACT_APP_BASE_URL=http://localhost:3000 \
    VITE_REACT_APP_STATIC_URL=https://static.zollege.in/

RUN npm run postinstall 

EXPOSE 5173

CMD [ "npm", "run", "dev" ]