#!/usr/bin/env node

// One day in milliseconds
const oneDay = 24 * 60 * 60 * 1000;

function validateDate(date) {

	function isLeapYear(year) {
		if (year % 4 != 0) {
			return false
		}
		if (year % 100 != 0){
			return true
		}
		if (year % 400 != 0){
			return false
		}
		return True
	}

	const month_days = [31, 28, 31 ,30 ,31, 30, 31, 31, 30, 31, 30, 31];
	const charlengths = [2, 2, 4];

	//split into 3
	var dateAsList = date.split('/');
	if (dateAsList.length != 3) {
		return { 'correct': false, 'result': "Date was not formatted correctly" };
	}

	for (let i=0; i < dateAsList.length; i++){
		//Check digits
		if (/\D/g.test(dateAsList[i])){ 
			return { 'correct': false, 'result': "Found a non-digit" };
		//Check lengths
		} else if (dateAsList[i].length !== charlengths[i]){
			return { 'correct': false, 'result': "Length is not correct" };
		} else {
			dateAsList[i] = parseInt(dateAsList[i]);
		}
	}

	// Year, month
	if (dateAsList[2] < 1900 || dateAsList[2] > 2999) {
		return { 'correct': false, 'result': "Year value is incorrect" };
	}
	if (dateAsList[1] < 1 || dateAsList[1] > 12) {
		return { 'correct': false, 'result': "Month value is incorrect" };
	}
	
	//Check day for leap year
	if (dateAsList[1] === 2 && isLeapYear(dateAsList[2])) {
		if (dateAsList[0] < 1 && dataList[0] > month_days[dateAsList[1]] + 1) {
			return { 'correct': false, 'result': "Day value is incorrect" };
		}
	} else {
		if (dateAsList[0] < 1 && dataList[0] > month_days[dateAsList[1]]) {
			return { 'correct': false, 'result': "Day value is incorrect" };
		}
	}
	
	return { 'correct': true, 'result': "Valid" };
}

function parseDate(date) {
	var dateAsList = date.split('/');
	var day = parseInt(dateAsList[0]);
	var month = parseInt(dateAsList[1]) - 1; //month starts at 0 not 1
	var year = parseInt(dateAsList[2]);
	var parseDate = new Date(Date.UTC(year, month, day)); //remove timezones as not required
	return parseDate;
}

function daysBetween(start, end) {
	
	if (start > end){
		var largerDate = start;
		var smallerDate = end;
	} else if (end > start) {
		var largerDate = end;
		var smallerDate = start;
	} else {
		return 0 //Equals same date
	}
	
	var calculateDays = ((largerDate - smallerDate)/oneDay);
	calculateDays = calculateDays - 1 //exclusive from start
	
	return calculateDays
}

const program = require('commander');
program
	.option('-s, --start <DD/MM/YYYY>', 'start date')
	.option('-e, --end <DD/MM/YYYY>', 'end date');
	
program.parse(process.argv);

//Check if input
if (program.start && program.end) {
	var startValue = program.start;
	var endValue = program.end;
	
	//Validate dates
	var validateStartDate = validateDate(startValue);
	var validateEndDate = validateDate(endValue);

	if (validateStartDate.correct === true && validateEndDate.correct === true){
		var newStartDate = parseDate(startValue);
		var newEndDate = parseDate(endValue);
		console.log(`${daysBetween(newStartDate, newEndDate)} days`);
		//Completed result

	} else {
		if (validateStartDate.correct === false){
			console.log("ERROR - START DATE: " + validateStartDate.result);
		}
		if (validateEndDate.correct === false){
			console.log("ERROR - END DATE: " + validateEndDate.result);
		}
	}

} else {
	if (!program.start){
		console.log("ERROR: No start date");
	}
	if (!program.end){
		console.log("ERROR: No end date");
	}
}
