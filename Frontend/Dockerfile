FROM node:14

WORKDIR /var/app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyCtAtFTYTpduPIXVcR4eMAnkSI_6hTnc7M \
    VITE_REACT_APP_BASE_URL=http://localhost:3000 \
    VITE_REACT_APP_STATIC_URL=https://static.zollege.in/

RUN npm run postinstall 

EXPOSE 5173

CMD [ "npm", "run", "dev" ]