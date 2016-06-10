
var crypto = require('crypto');

function usersDAO (db) {
	
	var collection = 'users';
	
	function get(user,callback) {
		var id = user._id ? user._id : user.name;
		db.collection(collection).find({_id:id}).toArray(callback);
	}
	
	function insert (user,callback) {
		
		var formattedUser = { _id:user.name, pass:crypto.createHash('sha256').update(user.pass).digest('hex'), teamName:user.teamName, topScorer:user.gbPred,predictions:[] };
		
		function checkUnique (err,items) {
			if(typeof items === 'undefined' || items.length > 0) {
				callback('Username already exists!',0);
			} else {
				doInsert();
			}
		}
		
		function doInsert() {
			//console.log(formattedUser);
			db.collection(collection).insert(formattedUser,finishInsert);
		}
		
		function finishInsert (err,result) {
			console.log('Inserted a document into the ' + collection + ' collection.');
			callback(err,result);
		}
		
		function checkCode (err,result) {
			if(result.code === user.leagueCode) {
				get(formattedUser,checkUnique);
			} else {
				callback('League code is invalid',0);
			}
		}
		
		db.collection('league').findOne({},checkCode);
		
	}
	
	function addPredictions (predictions,user,callback) {
		
		function validNewPredictions(val,ind,arr) {
			var p = val.prediction;
			var valid = true;
			for(key in p) {
				var score = parseFloat(p[key]);
				if(Number.isInteger(score) && score >= 0) {
					
				} else {
					valid =  false;
				}
			}
			//console.log(val.prediction);
			return valid;
		}
		
		//console.log(predictions);
		
		var oldPredictions = [],
			newPredictions = [],
			validPredictions = predictions.filter(validNewPredictions),
			dbUser = {},
			newUser = {};
			
		//console.log(validPredictions);
		
		function checkPredictions (err,userData) {
			if(err || userData.length > 1) {
				callback('Something went wrong...',0);
			} else {
				//console.log(userData);
				dbUser = userData[0];
				oldPredictions = dbUser.predictions.filter(oldPredictionsToKeep);
				newPredictions = [].concat(oldPredictions,validPredictions);
				newUser = Object.assign({},dbUser,{predictions:newPredictions});
				update(newUser,getUpdatedPredictions);
			}
		}
		
		function oldPredictionsToKeep(val,ind,arr) {
			function checkPrediction(previous,current) {
				if(previous) {
					return current.p_id !== val.p_id;
				}
				return previous;
			}
			return validPredictions.reduce(checkPrediction,true);
		}
		
		function getUpdatedPredictions (err,result) {
			if(!err) {
				get({_id:user},callback);
			} else {
				callback(err,result);
			}
		}
		
		get({_id:user},checkPredictions);
		
	}
	
	function update(item,callback) {
		db.collection(collection).update({'_id':item._id},item,callback);
	}
	
	function checkPassword(user,callback) {
		
		var hashword = crypto.createHash('sha256').update(user.pass).digest('hex');
		
		function comparePassword(err,results) {
			if(err || results.length !== 1) {
				callback(err,false);
			} else {
				callback(err,hashword === results[0].pass);
			}
		}
		
		get(user,comparePassword);
		
	}
	
	return {
		insertUser:insert,
		updatePrediction:addPredictions,
		updateUser:update,
		getUser:get,
		checkPassword:checkPassword
	}
	
}

module.exports = usersDAO;
	