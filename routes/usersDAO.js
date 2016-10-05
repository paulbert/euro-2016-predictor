
var crypto = require('crypto');
var _ = require('underscore');

function usersDAO (db,testUsers) {
	
	var collection = 'users' + testUsers ? '_test' : '',
		leagueCollection = 'league' + testUsers ? '_test' : '';
	
	function get(user,callback) {
		var id = user._id ? user._id : user.name;
		db.collection(collection).find({_id:id}).toArray(callback);
	}
	
	function getAll(callback) {
		db.collection(collection).find({},{'pass':0}).toArray(callback);
	}
	
	function insert (user,callback) {
		
		var formattedUser = { _id:user.name, pass:crypto.createHash('sha256').update(user.pass).digest('hex'), teamName:user.teamName, topScorer:user.gbPred,predictions:[] };
		console.log('Start insert...');
		
		function checkUnique (err,items) {
			console.log('Checking if user exists...');
			if(typeof items === 'undefined' || items.length > 0) {
				callback('Username already exists!',0);
			} else {
				doInsert();
			}
		}
		
		function doInsert() {
			console.log('Inserting new user...');
			db.collection(collection).insert(formattedUser,finishInsert);
		}
		
		function finishInsert (err,result) {
			console.log('Inserted a document into the ' + collection + ' collection.');
			callback(err,result);
		}
		
		function checkCode (err,result) {
			console.log('Checking league code...');
			if(result.code === user.leagueCode) {
				get(formattedUser,checkUnique);
			} else {
				callback('League code is invalid',0);
			}
		}
		
		db.collection(leagueCollection).findOne({},checkCode);
		
	}
	
	function addPredictions (predictions,user,callback) {
		
		function validNewPredictions(val,ind,arr) {
			var p = val.prediction;
			var valid = true;
			for(key in p) {
				var score = parseFloat(p[key]);
				if(Number.isInteger(score) && score >= 0) {
					// Checks validity of prediction based on date (based on cutoff of start of knockout stages and match start time)
					if(!testUsers) {
						var p_date = val.p_id.split('|')[1].split('-');
						var year = parseInt(p_date[0]),
							month = parseInt(p_date[1]) - 1,
							day = parseInt(p_date[2]);
						var gameDate = new Date(Date.UTC(year,month,day,13)),
							cutoffDate = new Date(Date.UTC(2016,5,25,13)),
							rightNow = new Date(Date.now());
						if(rightNow > gameDate || rightNow > cutoffDate) {
							valid = false;
						}
					}
				} else {
					valid =  false;
				}
			}
			if(!p) {
				valid = false;
			}
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
				updatePredictions(newUser,getUpdatedPredictions);
			}
		}
		
		function oldPredictionsToKeep(val,ind,arr) {
			function checkPrediction(previous,current) {
				if(previous) {
					var matchNumDiff = false;
					if(val.matchNum) {
						matchNumDiff = current.matchNum !== val.matchNum;
					}
					return current.p_id !== val.p_id || matchNumDiff;
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
	
	function updatePredictions(user,callback) {
		db.collection(collection).update({'_id':user._id},user,callback);
	}
	
	function update(userId,updateFields,callback) {
		db.collection(collection).update({'_id':userId},{$set:updateFields},callback);
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
	
	function scoreAndGetUsers(fixtures,callback) {
		
		var breakDates = [new Date(Date.UTC(2016,5,23)),new Date(Date.UTC(2016,5,29)),new Date(Date.UTC(2016,6,4)),new Date(Date.UTC(2016,6,8))];
		var pointsArray = [2,4,8,12];
		
		function reformatFixtureResult(fixture,key) {
			var newResult = {};
			var goalsResult = fixture.result;
			if(key) {
				goalsResult = fixture.result[key];
				//console.log(goalsResult);
			}
			newResult[fixture.homeTeamName] = goalsResult.goalsHomeTeam.toString();
			newResult[fixture.awayTeamName] = goalsResult.goalsAwayTeam.toString();
			return newResult;
		}
		
		function getWinner(result) {
			var firstScore = -1,
				winner = '';
			for(var key in result) {
				winner = result[key] > firstScore ? key : (result[key] < firstScore ? winner : 'draw');
				firstScore = result[key];
			}
			return winner;
		}
		
		function checkForBonus(fixture,prediction,winner) {
			if(prediction[winner]) {
				var bonus = true,
					otherTeamFixture = '',
					otherTeamPrediction = '',
					team;
				
				for(team in fixture) {
					if(team !== winner) {
						otherTeamFixture = team;
						//console.log('Other team fixture ' + team);
					}
				}
				
				for(team in prediction) {
					if(team !== winner) {
						otherTeamPrediction = team;
						//console.log('Other team prediction ' + team);
					}
				}
				
				if(fixture[winner] !== prediction[winner]) {
					bonus = false;
				} else if(fixture[otherTeamFixture] !== prediction[otherTeamPrediction]) {
					bonus = false;
				}
				return bonus;
			}
			return false;
		}
		
		function scoreUser(user) {
			function scorePrediction(prediction) {
				var fixtureFilter = fixtures.filter(function (fixture) {
					return fixture.f_id === prediction.p_id || fixture.date === prediction.date;
				});
				function getValue(points,date,ind) {
					if(date < new Date(fixture.date)) {
						return pointsArray[ind]
					}
					return points
				}
				if(fixtureFilter.length === 1) {
					var fixture = fixtureFilter[0];
					//console.log('Calculating ' + fixture.homeTeamName + ' - ' + fixture.awayTeamName + '...');
					//console.log('Fixture status: ' + fixture.status);
					if(fixture.status === 'FINISHED') {
						var fixtureValue = breakDates.reduce(getValue,1),
							fixtureResult = reformatFixtureResult(fixture,false);
						var realWinner = getWinner(fixtureResult),
							predictWinner = '';
						
						if(fixtureValue === 1) {
							predictWinner = getWinner(prediction.prediction);
						} else {
							predictWinner = prediction.winner;
							if(realWinner === 'draw' && fixture.result.extraTime) {
								var extraTimeResult = reformatFixtureResult(fixture,'extraTime');
								realWinner = getWinner(extraTimeResult);
								if(realWinner === 'draw' && fixture.result.penaltyShootout) {
									var penaltiesResult = reformatFixtureResult(fixture,'penaltyShootout');
									realWinner = getWinner(penaltiesResult);
								}
							}
						}
						
						//console.log('Predicted winner: ' + predictWinner + ' . . . ' + 'Real winner: ' + realWinner);
						
						//console.log('Prediction: ');
						//console.log(prediction.prediction);
						//console.log('Result: ');
						//console.log(fixtureResult);
						
						var points = realWinner === predictWinner ? fixtureValue : 0;
						var bonus = false;
						//console.log('Points: ' + points);
						if(fixtureValue === 1) {
							bonus = _.isEqual(fixtureResult,prediction.prediction);
						} else {
							bonus = checkForBonus(fixtureResult,prediction.prediction,realWinner);
							console.log(bonus);
						}
						//console.log('Bonus: ' + bonus);
						points = bonus ? points * 2 : points;
						
						return Object.assign({},prediction,{points:points,bonus:bonus});
					}
				}
				return prediction;
			}
			var scoredPredictions = user.predictions.map(scorePrediction);
			var totalScore = scoredPredictions.reduce(function(points,prediction) { return points + (prediction.points > 0 ? prediction.points : 0) }, 0);
			console.log(totalScore);
			return Object.assign({},user,{predictions:scoredPredictions,totalScore:totalScore})
		}
		
		function scoreUsers(err,users) {
			if(err) {
				callback(err,0);
			} else {
				callback(err,users.map(scoreUser));
			}
		}
		
		getAll(scoreUsers);
		
	}
	
	return {
		insertUser:insert,
		updatePrediction:addPredictions,
		updateUser:update,
		getUser:get,
		checkPassword:checkPassword,
		scoreAndGetUsers:scoreAndGetUsers
	}
	
}

module.exports = usersDAO;
	