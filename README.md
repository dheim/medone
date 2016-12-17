# Automatic setup (runs on port 3000)
./setup.sh && node server/server.js

# Manual setup
npm run build // build package

mongod --dbpath ./server/db/mongodb/ // keep running

node server/db/setup-users.js // import users

node server/server.js


# run dev-env (runs on port 8080 and proxies /api to 3000)
npm run dev

node server/server.js

mongod --dbpath ./server/db/mongodb/


# References

Material-UI http://www.material-ui.com/

Mongoose http://mongoosejs.com/

ExpressJS http://expressjs.com/de/