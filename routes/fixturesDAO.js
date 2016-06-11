
var request = require('request');

function fixturesDAO (db) {
	
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
		bulk.find({'_id':fixture._id}).upsert().updateOne(fixture);
		return bulk;
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
	
	function sendFixtures(callback) {
		
		function upsertFixtures(error,response,body) {
			console.log('New fixtures received!');
			var data = JSON.parse(body);
			if(!error && response.statusCode == 200) {
				fixtures = formatFixtures(data.fixtures);
				var bulk = collectionObj.initializeOrderedBulkOp();
				bulkUpsert = fixtures.reduce(formatBulkUpdateFixture,bulk);
				bulkUpsert.execute({},getFixtures(callback));
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
		
		function checkFixtures(err,results) {
			console.log(results);
			var shouldUpdate = results.length === 0 || results.reduce(checkFixture,false);
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

module.exports = fixturesDAO;