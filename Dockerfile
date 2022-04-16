FROM node:16
ARG VERSION=1.0.0

WORKDIR /u01/tmp
COPY . /u01/tmp/
RUN npm install
RUN npm run build

WORKDIR /u01/app
RUN cp -r ../tmp/dist/* /u01/app/
RUN cp ../tmp/package.json /u01/app/
RUN cp ../tmp/package-lock.json /u01/app/
RUN npm install

RUN rm -rf /tmp

EXPOSE 4000
WORKDIR /u01/app/

ENV NODE_ENV=production
CMD ["node", "index.js"]