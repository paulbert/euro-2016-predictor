//*
const bracket = [
	{ 'date': new Date(Date.UTC(2016,5,25,13)), 'matchNum':1, 'homeTeamName': 'Switzerland', 'awayTeamName': 'Poland' },
	{ 'date': new Date(Date.UTC(2016,5,25,16)), 'matchNum':2, 'homeTeamName': 'Wales', 'awayTeamName': 'Northern Ireland' },
	{ 'date': new Date(Date.UTC(2016,5,25,19)), 'matchNum':3, 'homeTeamName': 'Croatia', 'awayTeamName': 'Portugal' },
	{ 'date': new Date(Date.UTC(2016,5,26,13)), 'matchNum':4, 'homeTeamName': 'France', 'awayTeamName': 'Republic of Ireland' },
	{ 'date': new Date(Date.UTC(2016,5,26,16)), 'matchNum':5, 'homeTeamName': 'Germany', 'awayTeamName': 'Slovakia' },
	{ 'date': new Date(Date.UTC(2016,5,26,19)), 'matchNum':6, 'homeTeamName': 'Hungary', 'awayTeamName': 'Belgium' },
	{ 'date': new Date(Date.UTC(2016,5,27,16)), 'matchNum':7, 'homeTeamName': 'Italy', 'awayTeamName': 'Spain' },
	{ 'date': new Date(Date.UTC(2016,5,27,19)), 'matchNum':8, 'homeTeamName': 'England', 'awayTeamName': 'Iceland' },
	{ 'date': new Date(Date.UTC(2016,5,30,19)), 'matchNum':9, 'homeTeamName': '', 'awayTeamName': '', homeTeamIs:1, awayTeamIs:3, placeholder: 'QF' },
	{ 'date': new Date(Date.UTC(2016,6,1,19)), 'matchNum':10, 'homeTeamName': '', 'awayTeamName': '', homeTeamIs:2, awayTeamIs:6, placeholder: 'QF' },
	{ 'date': new Date(Date.UTC(2016,6,2,19)), 'matchNum':11, 'homeTeamName': '', 'awayTeamName': '', homeTeamIs:5, awayTeamIs:7, placeholder: 'QF' },
	{ 'date': new Date(Date.UTC(2016,6,3,19)), 'matchNum':12, 'homeTeamName': '', 'awayTeamName': '', homeTeamIs:4, awayTeamIs:8, placeholder: 'QF' },
	{ 'date': new Date(Date.UTC(2016,6,6,19)), 'matchNum':13, 'homeTeamName': '', 'awayTeamName': '', homeTeamIs:9, awayTeamIs:10, placeholder: 'SF' },
	{ 'date': new Date(Date.UTC(2016,6,7,19)), 'matchNum':14, 'homeTeamName': '', 'awayTeamName': '', homeTeamIs:11, awayTeamIs:12, placeholder: 'SF' },
	{ 'date': new Date(Date.UTC(2016,6,10,19)), 'matchNum':15, 'homeTeamName': '', 'awayTeamName': '', homeTeamIs:13, awayTeamIs:14, placeholder: 'F' }
];
/*/
// TESTING BRACKET
const bracket = [
	{ 'date': new Date(Date.UTC(2016,5,25,13)), 'matchNum':1, 'homeTeamName': 'Switzerland', 'awayTeamName': 'Poland', placeholder: '8F' },
	{ 'date': new Date(Date.UTC(2016,5,25,16)), 'matchNum':2, 'homeTeamName': 'Wales', 'awayTeamName': 'Belgium', placeholder: '8F' },
	{ 'date': new Date(Date.UTC(2016,5,25,19)), 'matchNum':3, 'homeTeamName': 'Croatia', 'awayTeamName': 'Hungary', placeholder: '8F' },
	{ 'date': new Date(Date.UTC(2016,5,26,13)), 'matchNum':4, 'homeTeamName': 'France', 'awayTeamName': 'Portugal', placeholder: '8F' },
	{ 'date': new Date(Date.UTC(2016,5,26,16)), 'matchNum':5, 'homeTeamName': 'Germany', 'awayTeamName': 'Turkey', placeholder: '8F' },
	{ 'date': new Date(Date.UTC(2016,5,26,19)), 'matchNum':6, 'homeTeamName': 'Austria', 'awayTeamName': 'Slovakia', placeholder: '8F' },
	{ 'date': new Date(Date.UTC(2016,5,27,16)), 'matchNum':7, 'homeTeamName': 'Italy', 'awayTeamName': 'Spain', placeholder: '8F' },
	{ 'date': new Date(Date.UTC(2016,5,27,19)), 'matchNum':8, 'homeTeamName': 'England', 'awayTeamName': 'Northern Ireland' },
	{ 'date': new Date(Date.UTC(2016,5,30,19)), 'matchNum':9, 'homeTeamName': '', 'awayTeamName': '', homeTeamIs:1, awayTeamIs:3, placeholder: 'QF' },
	{ 'date': new Date(Date.UTC(2016,6,1,19)), 'matchNum':10, 'homeTeamName': '', 'awayTeamName': '', homeTeamIs:2, awayTeamIs:6, placeholder: 'QF' },
	{ 'date': new Date(Date.UTC(2016,6,2,19)), 'matchNum':11, 'homeTeamName': '', 'awayTeamName': '', homeTeamIs:5, awayTeamIs:7, placeholder: 'QF' },
	{ 'date': new Date(Date.UTC(2016,6,3,19)), 'matchNum':12, 'homeTeamName': '', 'awayTeamName': '', homeTeamIs:4, awayTeamIs:8, placeholder: 'QF' },
	{ 'date': new Date(Date.UTC(2016,6,6,19)), 'matchNum':13, 'homeTeamName': '', 'awayTeamName': '', homeTeamIs:9, awayTeamIs:10, placeholder: 'SF' },
	{ 'date': new Date(Date.UTC(2016,6,7,19)), 'matchNum':14, 'homeTeamName': '', 'awayTeamName': '', homeTeamIs:11, awayTeamIs:12, placeholder: 'SF' },
	{ 'date': new Date(Date.UTC(2016,6,10,19)), 'matchNum':15, 'homeTeamName': '', 'awayTeamName': '', homeTeamIs:13, awayTeamIs:14, placeholder: 'F' }
];
//*/
export default bracket;