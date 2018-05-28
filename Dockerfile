FROM node:latest
ENV NPM_CONFIG_LOGLEVEL warn
RUN mkdir -p /frontend
WORKDIR /frontend
COPY ./public ./
CMD [ "node", "server.js"]

