var express = require('express');
var router = express.Router();

/*
 *	Players
 */

router.get('/players/count', function(req, res) {
	db.player.query("SELECT COUNT(*) as count FROM player", function(err, rows, fields) {
		if(err)
			res.status(500).end();
		else
			res.send(rows[0].count.toString()).end();
	});
});

router.get('/players/list', function(req, res) {
	db.player.query("SELECT * FROM player", function(err, rows, fields) {
		if(err)
			res.status(500).end();
		else
			res.send(rows).end();
	});
});

router.get('/players/online', function(req, res) {
	db.player.query("SELECT * FROM player WHERE DATE_SUB(NOW(), INTERVAL 5 MINUTE) < last_play;", function(err, rows) {
		if(err)
			res.status(500).end();
		else
			res.send(rows).end();
	});
});

router.get('/players/online/count', function(req, res) {
	db.player.query("SELECT COUNT(*) as count FROM player WHERE DATE_SUB(NOW(), INTERVAL 5 MINUTE) < last_play;", function(err, rows) {
		if(err)
			res.send(err).status(500).end();
		else
			res.send(rows[0].count.toString()).end();
	});
});

module.exports = router;