FROM centos:centos7

USER root

RUN yum install -y gcc-c++ make curl
RUN curl -sL https://rpm.nodesource.com/setup_10.x | bash -
RUN yum install -y nodejs

WORKDIR /usr/src/app

# Setup project
ADD app.js /usr/src/app/
ADD package*.json /usr/src/app/
ADD api /usr/src/app/api
ADD core /usr/src/app/core

RUN npm cache verify && npm install --no-progress

EXPOSE 3000
CMD [ "npm", "start" ]