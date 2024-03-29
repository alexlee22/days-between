import datetime
import random
import csv

def is_leap_year(year):
	if year % 4 != 0:
		return False
	if year % 100 != 0:
		return True
	if year % 400 != 0:
		return False
	return True

def random_date():
	month_days = [31, 28, 31 ,30 ,31, 30, 31, 31, 30, 31, 30, 31]

	year = random.randint(1999, 2999)
	month = random.randint(1, 12)
	if month == 2 and is_leap_year(year):
		day = random.randint(1, month_days[month-1]+1)
	else:
		day = random.randint(1, month_days[month-1])
	
	constDate = datetime.date(year, month, day)

	constList = [day, month, year]
	returnList = []
	for idx, v in enumerate(constList):
		if v < 10:
			constList[idx] = '0' + str(v)
		else:
			constList[idx] = str(v)

	return({
		'dateString': '/'.join(str(v) for v in constList),
		'dateobj': constDate
	})

with open('testdates.csv', 'w', newline='') as csvfile:
	writer = csv.writer(csvfile, delimiter=' ', quotechar=',', quoting=csv.QUOTE_MINIMAL)
	for i in range(0,100):
		getDate1 = random_date()
		getDate2 = random_date()
		if getDate1['dateobj'] > getDate2['dateobj']:
			subtract_result = getDate1['dateobj'] - getDate2['dateobj'] - datetime.timedelta(days=1)
		else:
			subtract_result = getDate2['dateobj'] - getDate1['dateobj'] - datetime.timedelta(days=1)
	
		writer.writerow([getDate1['dateString'], getDate2['dateString'], subtract_result.days, 'days'])
	
