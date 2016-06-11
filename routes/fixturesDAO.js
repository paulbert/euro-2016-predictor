
var request = require('request');

function fixturesDAO (db) {
	
	var collection = 'fixtures',
		options = {
			url:'http://api.football-data.org/v1/soccerseasons/424/fixtures'
			headers:{
				'X-Auth-Token':'db4fcf37e65a456cb4116f32a54bb299'
			}
		};
	
	function getFixtures(callback) {
		db.collection(collection).find({}).toArray(callback);
	}
	
	
	function formatBulkUpdateFixture(bulk,fixture) {
		return bulk.find({'_id':fixture._id}).upsert().updateOne(fixture);
	}
	
	function formatFixtures (fixtures) {
		return fixtures.map(formatFixture);
	}
	
	function formatFixture(fixture,ind,fixtures) {
		var newId = makeId(fixture.homeTeamName,fixture.awayTeamName,fixture.date);
		return Object.assign({},fixture,{'_id':newId,'f_id':newId});
	}
	
	function makeId (stringOne, stringTwo, dateString) {
		var sortedStrings = [stringOne,stringTwo].sort().reduce(function(previous,current) { return previous + current });
		return sortedStrings + '|' + dateString.substr(0,10);
	}
	
	function upsertCallback(error,result) {
		if(error) {
			console.log('There was an error writing new fixture data.');
			console.log(error);
		}
		
	}
	
	function sendFixtures(callback) {
		
		function upsertFixtures(error,response,body) {
			if(!error && response.statusCode == 200) {
				fixtures = formatFixtures(response.fixtures);
				var bulk = col.initializeOrderedBulkOp();
				bulkUpsert = fixtures.reduce(updateFixture,bulk);
				bulkUpsert.execute({},getFixtures(callback));
			}
		}
		
		function getNewFixtures() {
			request(options,upsertNewFixtures);
		}
		
		function checkFixture(shouldUpdate,fixture) {
			if(!shouldUpdate) {
				var fixtureDate = new Date(fixture.date);
				return fixture.status === 'IN_PLAY' || (fixture.status === 'TIMED' && (fixtureDate < new Date(Date.now())));
			}
			return shouldUpdate;
		}
		
		function checkFixtures(err,results) {
			var shouldUpdate = results.reduce(checkFixture,false);
			if(shouldUpdate) {
				getNewFixtures();
			} else {
				callback(err,results);
			}
		}
		
		getFixtures(checkFixtures);
		
	}
	
	return {
		sendFixtures:sendFixtures
	}
	
}

module.exports = sessionsDAO;