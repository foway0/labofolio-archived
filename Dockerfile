FROM centos:centos7

RUN yum install -y gcc-c++ make curl
RUN yum -y install vim-enhanced nc nmap

RUN curl -sL https://rpm.nodesource.com/setup_10.x | bash -
RUN yum install -y nodejs

WORKDIR /usr/src/app

# Setup project
ADD index.js /usr/src/app/
ADD package*.json /usr/src/app/
ADD wait-for-it.sh /usr/src/app/
ADD shared /usr/src/app/shared/
ADD utils /usr/src/app/utils/
ADD core /usr/src/app/core/
ADD mode /usr/src/app/mode/

RUN chmod +x /usr/src/app/wait-for-it.sh
RUN npm cache verify && npm install --no-progress

EXPOSE 3000
#CMD [ "node", "index" ]
#CMD ["/usr/src/app/wait-for-it.sh", "--", "node", "index"]
ENTRYPOINT /usr/src/app/wait-for-it.sh
