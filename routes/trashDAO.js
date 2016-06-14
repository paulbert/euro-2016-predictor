
var fileType = require('file-type');

function trashDAO (db) {
	
	var collection = 'trash';
	
	function insertNewTrash(url,userId,callback) {
		
		function checkFileType (error,response,body) {
			response.once('data', function(chunk) {
				console.log(fileType(chunk));
			});
		}
		
		request(url,checkFileType);
		
	}
	/*
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
	*/
	return {
		insertNewTrash:insertNewTrash
	}
	
}

module.exports = trashDAO;