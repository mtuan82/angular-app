FROM node:20.11.0-slim as builder

RUN npm install -g @angular/cli

RUN mkdir /webapp
WORKDIR /webapp

COPY . /webapp
RUN npm install 

COPY . /webapp

EXPOSE 4200

CMD ["ng","serve","--host", "0.0.0.0", "--disable-host-check"]
