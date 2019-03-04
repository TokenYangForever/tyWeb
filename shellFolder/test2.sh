#!/bin/sh
# This is a comment!
# echo "Hello      World"       # This is a comment, too!
# echo "Hello World"
# echo "Hello * World"
# echo Hello * World
# echo Hello      World
# echo "Hello" World
# echo Hello "     " World
# echo "Hello "*" World"
# echo `hello` world
# echo 'hello' world

# MY_MESSAGE = "Hello World" 加了空格，就无效
# MY_MESSAGE="Hello World"
# echo $MY_MESSAGE

# echo "What is your name?"
# read USER_NAME
# echo "Hello $USER_NAME"
# echo "I will create you a file called ${USER_NAME}_file"
# touch "${USER_NAME}_file"

# read MY_NAME
# echo my name is $MY_NAME

# while循环
# INPUT_STRING=hello
# while [ "$INPUT_STRING" != "bye" ]
# do
#   echo "Please type something in (bye to quit)"
#   read INPUT_STRING
#   echo "You typed: $INPUT_STRING"
# done

# # for循环
# for i in 1 2 3 4 5
# do
#   echo "Looping ... number $i"
# done
num1=100
num2=100
if test $[num1] -eq $[num2]
then
    echo '两个数相等！'
else
    echo '两个数不相等！'
fi