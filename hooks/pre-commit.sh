#!/bin/sh
#
# An example hook script to verify what is about to be committed.
# Called by "git commit" with no arguments.  The hook should
# exit with non-zero status after issuing an appropriate message if
# it wants to stop the commit.
#
# To enable this hook, rename this file to "pre-commit".

STAGE_FILES=$(git diff --cached --name-only --diff-filter=ACM -- '*.vue' '*.js')
if test ${#STAGE_FILES} -gt 0
then
	echo '开始eslint检查'

	which eslint &> /dev/null
	if [[ "$?" == 1 ]]; then
		echo '没安装eslint'
		exit 1
	fi

	PASS=true

	for FILE in $STAGE_FILES
	do
		eslint $FILE
		if [[ "$?" == 1 ]]; then
  	  # echo "\t\033[41mESLint 检查失败: $FILE\033[0m"
  	  PASS=false
  	# else
  	#   echo "\t\033[41mESLint 通过: $FILE\033[0m"
  	fi
  done

  if ! $PASS; then
	  echo "eslint检查没通过！"
	  exit 1
	else
	  echo "eslint检查完毕"
	fi

else
	echo '没有js文件需要检查'
fi

exit 0