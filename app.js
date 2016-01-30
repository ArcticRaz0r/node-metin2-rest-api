GLOBAL.config = require('./config.json');

var express = require('express');
var bodyparser = require('body-parser');
var app = express();

app.use(bodyparser);

GLOBAL.mysql = require('mysql2');
GLOBAL.db = {};

GLOBAL.test = function(req, res, string) {
	db.player.query(string, function(err, rows, fields) {
		if(err)
			res.send(err).end();
		else
			res.send({
				rows: rows,
				fields: fields
			}).end();
	});
};

//Connects to databases
db.player = mysql.createConnection({
	user: config.db.user,
	password: config.db.password,
	host: config.db.hostname,
	port: config.db.port,
	database: 'player'
});

db.account = mysql.createConnection({
	user: config.db.user,
	password: config.db.password,
	host: config.db.hostname,
	port: config.db.port,
	database: 'account'
});

app.use('/users', require('./routes/users'));
app.use('/accounts', require('./routes/accounts'));
app.use('/ranking', require('./routes/ranking'));

app.listen(config.api.port);