FROM node:16
ARG VERSION=1.0.0
WORKDIR /u01/app
COPY ./dist /u01/app/
COPY ./package.json /u01/app/
COPY ./package-lock.json /u01/app/

RUN npm install

EXPOSE 4000
WORKDIR /u01/app/

ENV NODE_ENV=production
CMD ["node", "index.js"]