FROM node
MAINTAINER Loïc Serafin

COPY test_data.json /test_data.json
COPY init_test_db.js /init_test_db.js
COPY node_modules /node_modules

CMD node /init_test_db.js
