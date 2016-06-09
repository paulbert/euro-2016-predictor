
var crypto = require('crypto');

function usersDAO (db) {
	
	var collection = 'users';
	
	function get(user,callback) {
		var id = user._id ? user._id : user.name;
		db.collection(collection).find({_id:id}).toArray(callback);
	}
	
	function insert (user,callback) {
		
		var formattedUser = { _id:item.name, pass:crypto.createHash('sha256').update(item.pass).digest('hex'), teamName:item.teamName, topScorer:'',predictions:[] };
		
		function checkUnique (err,items) {
			if(typeof items === 'undefined' || items.length > 0) {
				callback('Item already inserted',0);
			} else {
				doInsert();
			}
		}
		
		function doInsert() {
			db.collection(collection).insert(formattedItem,finishInsert);
		}
		
		function finishInsert (err,result) {
			console.log('Inserted a document into the ' + collection + ' collection.');
			callback(err,result);
		}
		
		get(formattedUser,checkUnique);
		
	}
	
	function addPredictions (predictions,user,callback) {
		
		var oldPredictions = [],
			newPredictions = [],
			validPredictions = predictions.filter(validNewPredictions),
			dbUser = {},
			newUser = {};
		
		function getPredictions (user) {
			db.collection(collection).find({_id:user}).toArray(checkPredictions);
		}
		
		function checkPredictions (err,userData) {
			if(err || userData.length > 1) {
				callback('Something went wrong...',0);
			} else {
				dbUser = userData[0];
				oldPredictions = dbUser.predictions.filter(oldPredictionsToKeep);
				newPredictions = [].concat(oldPredictions,validPredictions);
				newUser = Object.assign({},dbUser,{predictions:newPredictions}
				update(newUser,callback);
			}
		}
		
		function oldPredictionsToKeep(val,ind,arr) {
			function checkPrediction(previous,current) {
				if(previous) {
					return current.p_id !== val.p_id;
				}
				return previous;
			}
			return validPredictions.map(checkPrediction,true);
		}
		
		function validNewPredictions(val,ind,arr) {
			var p = val.prediction;
			for(key in p) {
				if(Number.isInteger(p.key) && p.key >= 0) {
					return true;
				} else {
					return false;
				}
			}
		}
	}
	
	function update(item,callback) {
		db.collection(collection).update({'_id':item._id},item,callback);
	}
	
	return {
		insertUser:insert,
		updatePrediction:addPredictions,
		updateUser:update,
		getUser:get
	}
	
}

module.exports = usersDAO;
	