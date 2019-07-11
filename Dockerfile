FROM foway/linux:1.0.0

WORKDIR /usr/src/app

# Setup project
ADD index.js /usr/src/app/
ADD package*.json /usr/src/app/
ADD wait-for-it.sh /usr/src/app/
ADD shared /usr/src/app/shared/
ADD core /usr/src/app/core/
ADD mode /usr/src/app/mode/
ADD tools /usr/src/app/tools/
ADD services /usr/src/app/services/
ADD middleware /usr/src/app/middleware/

RUN chmod +x /usr/src/app/wait-for-it.sh
RUN npm cache verify && npm install --no-progress

EXPOSE 3000
#CMD [ "node", "index" ]
#CMD ["/usr/src/app/wait-for-it.sh", "--", "node", "index"]
ENTRYPOINT /usr/src/app/wait-for-it.sh
