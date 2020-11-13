FROM alpine:latest

RUN apk add --update git nginx nodejs nodejs-npm

WORKDIR /app

COPY package.json .
RUN npm install --quiet

COPY .. .

RUN ls -a

EXPOSE 3000
CMD ["npm", "run", "start"]
