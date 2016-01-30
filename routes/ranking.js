var express = require('express');
var router = express.Router();

//Players
router.get('/players', function(req, res) {
	db.player.query("SELECT * FROM player WHERE level>'0' ORDER BY level,exp DESC", function(err, rows) {
		if(err)
			res.send(err).status(500).end();
		else
			res.send(rows).end();
	});
});

router.get('/guilds', function(req, res) {
	db.player.query("SELECT * FROM guild ORDER BY ladder_point,exp DESC", function(err, guilds) {
		if(err)
			res.send(err).status(500).end();
		else
			//Loads the Guild Masters' names
			for(var i = 0; i < guilds.length; i++) {
				var guild = guilds[i];

				db.player.query("SELECT name FROM player WHERE id = '?'", [guild.master], function(err, master) {
					if(err)
						res.send(err).status(500).end();
					else
						guild.master_name = master;
				});
			}
	});
});

module.exports = router;