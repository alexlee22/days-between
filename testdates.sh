#!/bin/bash
input="./testdates.csv"

echo "- - - Starting Tests - - -"

while IFS= read -r line
do
	vararray=($line)
	test="${vararray[2]} ${vararray[3]}"
	
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

done < "$input"

echo "- - - Completed Tests - - -"
