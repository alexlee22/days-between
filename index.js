#!/usr/bin/env node

//npm install -g
//date-calculator -s 01/08/2018 -e 02/08/2018

// One day in milliseconds
var oneDay = 24 * 60 * 60 * 1000;

function validateDate(date) {
    const month_days = [31, 28, 31 ,30 ,31, 30, 31, 31, 30, 31, 30, 31];
    const charlengths = [2, 2, 4];

    //split into 3
    var dateList = date.split('/');
    if (dateList.length != 3) {
        return { 'correct': false, 'result': "Date was not formatted correctly" };
    }

    for (let i=0; i < dateList.length; i++){
        if (dateList[i].length !== charlengths[i]){
            return { 'correct': false, 'result': "Length is not correct" };
        } else {
            dateList[i] = parseInt(dateList[i]);
        }
    }

    // Year, month
    if (dateList[2] < 1900 || dateList[2] > 2999) {
        return { 'correct': false, 'result': "Year value is incorrect" };
    }
    if (dateList[1] < 1 || dateList[1] > 12) {
        return { 'correct': false, 'result': "Month value is incorrect" };
    }
    
    //Check day for leap year
    if (dateList[1] === 2 && dateList[2] % 4 === 0) {
        if (dateList[0] < 1 && dataList[0] > month_days[dateList[1]] + 1) {
            return { 'correct': false, 'result': "Day value is incorrect" };
        }
    } else {
        if (dateList[0] < 1 && dataList[0] > month_days[dateList[1]]) {
            console.log(2)
            return { 'correct': false, 'result': "Day value is incorrect" };
        }
    }
    
    return { 'correct': true, 'result': "Valid" };
}

function parseDate(date) {
    var dateList = date.split('/');
    var day = parseInt(dateList[0]);
    var month = parseInt(dateList[1]) - 1; //month starts at 0 not 1
    var year = parseInt(dateList[2]);
    var parseDate = new Date(Date.UTC(year, month, day)); //remove timezones as not required
    return parseDate;
}

function daysBetween(start, end) {
    if (start > end){
        var largerDate = start;
        var smallerDate = end.setDate( end.getDate() + 1 );
    } else {
        var largerDate = end;
        var smallerDate = start.setDate( start.getDate() + 1 );
    }
    var calculateDays = (largerDate - smallerDate)/oneDay;
    return calculateDays
}


const program = require('commander');
program
    .option('-s, --start <string>', 'start date')
    .option('-e, --end <string>', 'end date');
program.parse(process.argv);

if (program.start) {
    var startValue =  program.start;
}
if (program.end) {
    var endValue = program.end;
}


var validateStartDate = validateDate(startValue);
var validateEndDate = validateDate(endValue);

console.log(validateStartDate)
console.log(validateEndDate)

if (validateStartDate.correct === true && validateEndDate.correct === true){
    var newStartDate = parseDate(startValue);
    var newEndDate = parseDate(endValue);
    console.log(`${daysBetween(newStartDate, newEndDate)} days`);
} else {

}




