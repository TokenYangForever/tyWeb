#!/bin/bash
lineNum=1
for line in `cat file.txt`
do
	if [ $lineNum -eq 10 ]
	then
		echo $line
	fi
	let "lineNum++"
done 

