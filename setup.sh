#!/bin/bash

echo -e 'start mongo and put it in background'
mongod --dbpath ./server/db/mongodb &

echo -e 'build webpack stuff'
npm run build

echo -e

echo -e 'import users'
node server/db/setup-users.js