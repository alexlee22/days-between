#!/bin/bash
input="./testdates.csv"

#daystext = " days"

while IFS= read -r line
do
	vararray=($line)
	test="${vararray[2]} ${vararray[3]}"
	
	#date-calculator -s "${vararray[0]}" -e "${vararray[1]}"
	OUTPUT="$(date-calculator -s "${vararray[0]}" -e "${vararray[1]}")"
	varar1=($OUTPUT)
	varar2=($test)
	
	if [ "${varar1[0]}" == "${varar2[0]}" ]; then 
		#echo "IS  EQUAL"
		:
	else
		echo "NOT EQUAL ${OUTPUT} ${test}"

	fi;
	
	#echo "${OUTPUT}"
	#echo "${test}"
	#echo "- - - - -"

done < "$input"


#date-calculator -s 01/08/2018 -e 03/08/2018


