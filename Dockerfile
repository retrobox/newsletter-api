FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
ENV LISTEN_PORT 80
ENV LISTEN_HOST 0.0.0.0
COPY . .
EXPOSE 80
CMD [ "npm", "start" ]
