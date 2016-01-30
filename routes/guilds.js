var express = require('express');
var router = express.Router();

/*
 *	Guilds
 */

router.get('/guilds/count', function(req, res) {
	db.player.query("SELECT COUNT(*) as count FROM guild", function(err, rows) {
		if(err)
			res.send(err).status(500).end();
		else
			res.send(rows[0].count.toString()).end();
	});
});

router.get('/guilds/list', function(req, res) {
	db.player.query("SELECT * FROM guild", function(err, rows) {
		if(err)
			res.send(err).status(500).end();
		else
			res.send(rows).end();
	});
});

module.exports = router;