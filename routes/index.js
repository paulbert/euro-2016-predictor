
var usersDAO = require('./usersDAO'),
	path = require('path'),
	sessionsDAO = require('./sessionsDAO'),
	fixturesDAO = require('./fixturesDAO');
	trashDAO = require('./trashDAO');
	
module.exports = exports = function(app,db) {
	
	var users = usersDAO(db),
		sessions = sessionsDAO(db),
		fixtures = fixturesDAO(db,app);
		trash = trashDAO(db,app);
	
	
	function addResponseCookie(res,user,passcode) {
		res.cookie('user',user,{expires: new Date(2016,8,1),httpOnly:false});
		res.cookie('passcode',passcode,{expires: new Date(2016,8,1),httpOnly:false});
		res.set('Access-Control-Allow-Origin','*');
		res.set('Access-Control-Allow-Credentials','true');
	}
	
	function cookieCallback (err,newCookie,res) {
		//console.log(newCookie);
		if(err) {
			res.json({'message':err});
		} else {
			addResponseCookie(res,newCookie.user_id,newCookie.passcode);
			res.json({'message':'Success'});
		}
	}
	
	app.post('/signup', function(req,res) {
		var user = req.body;
		console.log(user);
		users.insertUser(user,function(err,newUser) {
			console.log('New User:');
			console.log(newUser);
			if(err) {
				res.json({'message':err});
			} else {
				sessions.insertNewSession(newUser.ops[0],function(err,newCookie) {
					console.log('Starting session...');
					cookieCallback(err,newCookie.ops[0],res);
				});
			}
		});
	});
	
	app.post('/login', function(req,res) {
		var user = req.body;
		users.checkPassword(user,function(err,passed) {
			if(passed) {
				sessions.insertNewSession(user,function(err,newCookie) {
					cookieCallback(err,newCookie.ops[0],res);
				});
			} else {
				res.json({'message':'Username or password do not match'});
			}
		});	
	});
	
	app.post('/savePrediction', function(req,res) {
		var predictions = req.body;
		var user = req.cookies.user;
		//console.log(user);
		users.updatePrediction(predictions,user,function(err,result) {
			if(err) {
				res.json({'message':'Error'});
			} else {
				fixtures.getFixtures(function(err,fixtures) {
					users.scoreAndGetUsers(fixtures,function(err,users) {
						if(err) {
							res.json({'message':'Error'});
						} else {
							res.json(users);
						}
					});
				});
			}
		});
	});
	
	app.post('/trashpreview', function(req,res) {
		var previewUrl = req.body.previewUrl;
		
		trash.checkNewTrash(previewUrl,function(result) {
			res.json({'message':result});
		});
		
	});
	
	app.post('/trash', function(req,res) {
		var insertUrl = req.body.insertUrl;
		sessions.checkCookie(req.cookies,function(foundCookie) {
			if(foundCookie) {
				trash.insertNewTrash(insertUrl,req.cookies.user,function(err,result) {
					if(err) {
						res.json({'message':err});
					} else {
						console.log('Inserted one trash talk post');
						res.json({'message':'OK'});
					}
				});
			} else {
				res.json({'message':'Error. Try reloading page.'});
			}
		});
		
	});
	
	app.post('/userUpdate', function(req,res) {
		var updateFields = req.body.updateFields;
		sessions.checkCookie(req.cookies,function(foundCookie) {
			if(foundCookie) {
				users.updateUser(req.cookies.user,updateFields,function(err,result) {
					if(err) {
						res.json({'message':'There was an error updating your settings, please try again.'});
					} else {
						console.log('Updated user: ' + req.cookies.user);
						res.json({'message':'Success'});
					}
				});
			} else {
				res.json({'message':'Error. Try reloading page.'});
			}
		});
		
	});
	
	app.get('/getPrediction', function(req,res) {
		var user = req.cookies.user;
		users.getUser({_id:user},function(err,result) {
			if(err) {
				res.json({'message':'Error'});
			} else {
				//console.log(result);
				res.json(result);
			}
		});
	});
	
	app.get('/getFixtures', function(req,res) {
		fixtures.sendFixtures(function(err,result) {
			if(err) {
				res.json({'message':'Error'});
			} else {
				res.json(result);
			}
		});
		
	});
	
	app.get('/getUsers', function(req,res) {
		fixtures.getFixtures(function(err,fixtures) {
			users.scoreAndGetUsers(fixtures,function(err,result) {
				if(err) {
					res.json({'message':'Error'});
				} else {
					res.json(result);
				}
			});
		});
		
	});
	
	app.get('/getTrash', function(req,res) {
		trash.getTrash(function(err,posts) {
			if(err) {
				res.json({'message':'Error'});
			} else {
				res.json(posts);
			}
		});
		
	});
	
	app.get('*', function(req,res) {
		/*
		sessions.checkCookie(req.cookies,function(foundCookie) {
			if(foundCookie) {
				app.set('username',req.cookies.user);
				res.sendFile(path.join(__dirname + '/../builds/templates/index.html'));
			} else {
				res.sendFile(path.join(__dirname + '/../builds/templates/login.html'));
			}
		});
		*/
		res.sendFile(path.join(__dirname + '/../builds/templates/index.html'));
	});
}