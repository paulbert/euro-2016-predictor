
var fileType = require('file-type');
var request = require('request');

function trashDAO (db) {
	
	var collection = 'trash';
	
	function insertNewTrash(url,userId,callback) {
		db.collection(collection).insert({trash:url,userId:userId,date:new Date(Date.now())},callback);
	}
	
	function checkNewTrash(url,callback) {
		function checkFileType (error,response,body) {
			if(error) {
				callback('File not found');
			} else {
				var fullContentType = response.headers['content-type'];
				var isImage = fullContentType.substr(0,5) === 'image';
				if(isImage) {
					callback('OK');
				} else {
					callback('Not image');
				}
			}
		}
		request(url,checkFileType);
	}
	
	function getTrash(callback) {
		
		var trashArray = [],
			userArray = [],
			currentUser = '';
		
		function findUser (user,ind,users) {
			return user._id === currentUser;
		}
		
		function appendUserToTrash (post,ind,trash) {
			currentUser = post.userId;
			thisUser = userArray.filter(findUser);
			//console.log(thisUser[0]);
			//console.log(trash);
			return Object.assign({},thisUser[0],post);
		}
		
		function trashUserJoin (err,users) {
			//console.log(users[0]);
			var joinedTrash = [];
			if(err) {
				callback(err);
			} else {
				userArray = users;
				joinedTrash = trashArray.map(appendUserToTrash);
				//console.log(joinedTrash[0]);
				callback(0,joinedTrash);
			}
		}
		
		function getUsers (err,trash) {
			//console.log(trash[0]);
			if(err) {
				callback(err);
			} else {
				trashArray = trash;
				db.collection('users').find({}).toArray(trashUserJoin);
			}
		}
		
		db.collection(collection).find({}).sort({'date': -1}).toArray(getUsers);
		
	}
	
	return {
		insertNewTrash:insertNewTrash,
		checkNewTrash:checkNewTrash,
		getTrash:getTrash
	}
	
}

module.exports = trashDAO;