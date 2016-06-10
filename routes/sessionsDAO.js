
var crypto = require('crypto');

function sessionsDAO (db) {
	
	var collection = 'sessions';
	
	function getUserSessions(user,callback) {
		var userId = user._id ? user._id : user.name;
		console.log(user);
		db.collection(collection).find({user_id:userId}).toArray(callback);
	}
	
	function insertNewSession(user,callback) {
		
		function createSessionCode () {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for( var i=0; i < 20; i++ ) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return text;
		}
		
		var passcode = createSessionCode();
		var userId = user._id ? user._id : user.name;
		
		db.collection(collection).insert({user_id:userId,passcode:passcode},callback);
		
	}
	
	function checkCookie(cookie,callback) {
		
		function checkEach(previous,current) {
			if(!previous) {
				return cookie.passcode === current.passcode;
			}
			return previous;
		}
		
		function checkFoundSessions(err,results) {
			var foundCookie = results.reduce(checkEach,false);
			callback(foundCookie);
		}
		
		if(cookie) {
			getUserSessions({_id:cookie.user},checkFoundSessions);
		} else {
			return false;
		}
	}
	
	return {
		insertNewSession:insertNewSession,
		checkCookie:checkCookie
	}
	
}

module.exports = sessionsDAO;