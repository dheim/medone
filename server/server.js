'use strict';

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
    .use('/api', require('./routes')(app))
		.use('/public', express.static(__dirname + '/../client/public'))
		.use('*', (req, res) => {
			res.sendFile(
				require('path').resolve(__dirname + '/../client/public/index.html')
			);
		});

server.listen(config.port, () => {
	console.info(`${Date()} - started on port ${config.port}`);
});