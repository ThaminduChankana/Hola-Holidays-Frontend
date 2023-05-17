FROM node:18-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install --legacy-peer-deps
COPY . /usr/src/app/
EXPOSE 3000
CMD ["npm", "start"]