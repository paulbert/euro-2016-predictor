
// Creates an id that will be unique to the two strings and date but independent of order.
const makeId = (stringOne, stringTwo, dateString) => {
	
	let sortedStrings = [stringOne,stringTwo].sort().reduce((previous,current) => previous + current);
	
	return sortedStrings + '|' + dateString.substr(0,10);
	
};