
var usersDAO = require('./usersDAO'),
	path = require('path');
	
module.exports = exports = function(app,db) {
	
	var users = usersDAO(db);
	
	app.get('/', function(req,res) { 
		if(req.cookies.user == 'joe') {
			console.log(req.cookies);
			res.sendFile(path.join(__dirname + '/builds/templates/index.html'));
		} else {
			console.log(req.cookies);
			res.sendFile(path.join(__dirname + '/builds/templates/login.html'));
		}
	});
	
	function addResponseCookie(res,user,passcode) {
		res.cookie('user',user,{expire: new Date(2016,8,1),httpOnly:true});
		res.cookie('user',user,{expire: new Date(2016,8,1),httpOnly:true});
		res.set('Access-Control-Allow-Origin','*');
		res.set('Access-Control-Allow-Credentials','true');
	}
	
	app.post('/signup', function(req,res) {
		users.insertUser(req.body,function(err,result) {
			if(err) {
				res.json({'message':err});
			} else {
				
			}
		}
	});
	
	app.post('/login', function(req,res) {
		console.log(req.body);
		res.cookie('user','joe',{maxAge: 9000000,httpOnly:false});
		res.set('Access-Control-Allow-Origin','*');
		res.set('Access-Control-Allow-Credentials','true');
		res.json({'message':'Login success'});
	});
	
}