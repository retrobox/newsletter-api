FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
ENV LISTEN_PORT 80
ENV LISTEN_HOST 0.0.0.0
ENV DISCORD_WH_URL https://discordapp.com/api/webhooks/464391406522466304/8bHrnqTKu4eAV0DwfEc99075NzZgV9t8HjMZBLy294JHF8iZ6DeifMX_YrR5xHk5ifFU
COPY . .
EXPOSE 80
CMD [ "npm", "start" ]
