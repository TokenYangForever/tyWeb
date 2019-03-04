#!/bin/bash
# lineNum=1
# for line in `cat file.txt`
# do
# 	if [ $lineNum -eq 10 ]
# 	then
# 		echo $line
# 	fi
# 	let "lineNum++"
# done 

# cnt=0
# while read line && [ $cnt -le 10 ]; do
# let 'cnt = cnt + 1'
# if [ $cnt -eq 10 ]; then
# echo $line
# exit 0
# fi
# done < file.txt
# echo "I was called with $# parameters"
# echo "My name is $0"
# echo "My first parameter is $1"
# echo "My second parameter is $2"
# echo "All parameters are $@"