#!/bin/bash

echo -e 'build webpack stuff'
npm run build

echo -e

echo -e 'start mongo and put it in background'
mongod --dbpath ./server/db/mongod &

echo -e

echo -e 'import users'
node server/db/setup-users.js