# Automatic setup (runs on port 3000)
1. ./setup.sh && node server/server.js
2. Open web browser: http://localhost:3000

# Manual setup
1. npm run build // build package
2. mongod --dbpath ./server/db/mongodb/ // keep running
3. node server/db/setup-users.js // import users
4. node server/server.js
5. Open web browser: http://localhost:3000

# Developer mode (runs on port 8080 and proxies /api to 3000)
1. npm run dev
2. mongod --dbpath ./server/db/mongodb/
3. node server/server.js
4. Open web browser: http://localhost:8080

# References
* Material-UI http://www.material-ui.com/
* Mongoose http://mongoosejs.com/
* ExpressJS http://expressjs.com/de/