FROM node:alpine as node

WORKDIR /

COPY ./ ./

RUN npm install

WORKDIR ./client

RUN npm install

RUN npm run build


FROM tensorflow/tensorflow:latest-py3 as tf

WORKDIR /
 
RUN pip install keras nltk pika urllib3

COPY --from=node ./ ./


FROM rabbitmq:alpine
COPY --from=tf ./ ./


CMD ["/bin/sh", "./myscript.sh"] 
