FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./app/package.json /usr/src/app/
RUN npm install
RUN apt-get update
RUN apt-get install nano
COPY ./app /usr/src/app
EXPOSE 3000
CMD ["npm", "start"]