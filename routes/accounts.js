var express = require('express');
var router = express.Router();

/*
 *	Accounts
 */

//User data
router.get('/:login', function(req, req) {
	//Checks if account exists
	db.account.execute("SELECT * FROM account WHERE login=':username'", req.body, function(err, rows) {
		if(err)
			res.send(err).status(500).end();
		else if(rows.length < 1)
			res.status(404).end();
		else
			res.send(rows[0]).status(200).end();
	});
});

//User registration
router.post('/', function(req, res) {
	//Validate request

	//Checks if account exists
	db.account.execute("SELECT * FROM account WHERE login=':username'", req.body, function(err, rows) {
		if(err)
			res.send(err).status(500).end();
		else if(rows.length > 0)
			res.status(409).end();
		else {
			//Sets autoloot_expire to +2 years
			var autoloot_expire = new Date();
			autoloot_expire.setFullYear( autoloot_expire.getFullYear() + 2 );
			req.body.autoloot_expire = autoloot_expire;

			//Sends the request
			db.account.execute("INSERT INTO account (login,password,social_id,email,autoloot_expire) VALUES(':username',password(':password'),':social_id',':email',':autoloot_expire')", req.body, function(err, rows) {
				if(err)
					res.send(err).status(500).end();
				else
					res.status(201).end();
			});
		}
	});
});

//
//TODO: add put('/:login')

//User removal
router.delete('/:login', auth.isAdmin, function(req, res) {
	db.account.query("DELETE FROM account WHERE login='?'", [req.params.login], function(err, result) {
		if(err)
			res.send(err).status(500).end();
		else if(result.affectedRows.length < 1)
			res.status(404).end();
		else
			res.send(result.affectedRows).status(200).end();
	});
});

module.exports = router;