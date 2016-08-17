const express         = require('express');
const bodyParser      = require('body-parser');
const app             = express();
const config          = require('./config');
const server          = require('http').Server(app);

app.use(express.static(__dirname + '/../client/public', {
    dotfiles: 'ignore'
}));

app
    .use(bodyParser.json())
    .use('/api', require('./routes')(app));

server.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
});