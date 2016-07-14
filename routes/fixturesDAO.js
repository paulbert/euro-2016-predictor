
var request = require('request');

function fixturesDAO (db,app) {
	
	var collection = 'fixtures',
		options = {
			url:'http://api.football-data.org/v1/soccerseasons/424/fixtures',
			headers:{
				'X-Auth-Token':'db4fcf37e65a456cb4116f32a54bb299'
			}
		},
		collectionObj = db.collection(collection);
	
	function getFixtures(callback) {
		collectionObj.find({}).toArray(callback);
	}
	
	function formatBulkUpdateFixture(bulk,fixture) {
		bulk.find({'_id':fixture.f_id}).updateOne({"$set":fixture});
		bulk.find({'_id':fixture.f_id}).upsert().update({"$setOnInsert":fixture});
		return bulk;
	}
	
	function formatFixtures (fixtures) {
		return fixtures.map(formatFixture);
	}
	
	function formatFixture(fixture,ind,fixtures) {
		var newId = makeId(fixture.homeTeamName,fixture.awayTeamName,fixture.date);
		return Object.assign({},fixture,{'f_id':newId});
	}
	
	function makeId (stringOne, stringTwo, dateString) {
		var sortedStrings = [stringOne,stringTwo].sort().reduce(function(previous,current) { return previous + current });
		return sortedStrings + '|' + dateString.substr(0,10);
	}
	
	function sendFixtures(callback) {
		
		function upsertFixtures(error,response,body) {
			console.log('New fixtures received!');
			var data = JSON.parse(body);
			if(!error && response.statusCode == 200) {
				nextAPI = new Date(Date.now());
				nextAPI = nextAPI.getTime() + 60000;
				app.set('nextAPI', nextAPI);
				console.log(app.get('nextAPI'));
				fixtures = formatFixtures(data.fixtures);
				var bulk = collectionObj.initializeOrderedBulkOp();
				bulkUpsert = fixtures.reduce(formatBulkUpdateFixture,bulk);
				bulkUpsert.execute({},function(err,result) {
					if(err) { 
						console.log(err); 
					}
					else { 
						//console.log('nMatched: ' + result.nMatched);
						//console.log('nInserted: ' + result.nInserted);
						//console.log('nUpserted: ' + result.nUpserted);
						//console.log('hasWriteErrors: ' + result.hasWriteErrors());
					}
					getFixtures(callback);
				});
			} else {
				getFixtures(callback);
			}
		}
		
		function getNewFixtures() {
			console.log('Getting new fixtures from api...');
			request(options,upsertFixtures);
		}
		
		function checkFixture(shouldUpdate,fixture) {
			if(!shouldUpdate) {
				var fixtureDate = new Date(fixture.date);
				return fixture.status === 'IN_PLAY' || (fixture.status === 'TIMED' && (fixtureDate < new Date(Date.now())));
			}
			return shouldUpdate;
		}
		
		function allFinished(shouldUpdate,fixture) {
			if(shouldUpdate) {
				return fixture.status !== 'FINISHED';
			}
			return shouldUpdate;
		}
		
		function checkFixtures(err,results) {
			//console.log(results);
			console.log((new Date(2016,6,10)).getTime() + ' < ' + (new Date(Date.now()).getTime()));
			var noResults = (results.length === 0),
				pastCheckTime = app.get('nextAPI') < (new Date(Date.now())).getTime(),
				fixtureCheck = results.reduce(checkFixture,false) || results.reduce(allFinished,true),
				notAllResults = results.length !== 51;
			var shouldUpdate = noResults || fixtureCheck;
			console.log('Are there no results or is there possibly new fixture information?');
			console.log(shouldUpdate);
			shouldUpdate = shouldUpdate && notAllResults;
			console.log('Do we have less than the 51 matches?');
			console.log(shouldUpdate);
			shouldUpdate = shouldUpdate && pastCheckTime;
			console.log('Are we past check time?');
			console.log(shouldUpdate);
			
			if(shouldUpdate) {
				getNewFixtures();
			} else {
				callback(err,results);
			}
		}
		
		getFixtures(checkFixtures);
		
	}
	
	return {
		sendFixtures:sendFixtures,
		getFixtures:getFixtures
	}
	
}

module.exports = fixturesDAO;