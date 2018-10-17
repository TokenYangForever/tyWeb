#!/bin/sh

#禁止提交project.config.json
FORBIDDENFILES=$(git diff --cached --name-only --diff-filter=ACM --  'project.config.json')
if [[ "$FORBIDDENFILES" != "" ]]; then
    echo "\t\033[41m请不要提交project.config.json\033[0m"
    exit 1
fi

# eslint
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep ".jsx\{0,1\}$")
if [[ "$STAGED_FILES" != "" ]]; then
  PASS=true
  echo "\nValidating Javascript:\n"
  # Check for eslint
  which eslint &> /dev/null
  if [[ "$?" == 1 ]]; then
    echo "\t\033[41mPlease install ESlint\033[0m"
    exit 1
  fi
  for FILE in $STAGED_FILES
  do
    eslint "$FILE"
    if [[ "$?" == 0 ]]; then
      echo "\t\033[32mESLint Passed: $FILE\033[0m"
    else
      echo "\t\033[41mESLint Failed: $FILE\033[0m"
      PASS=false
    fi
  done
  if ! $PASS; then
    echo "\033[41mCOMMIT FAILED:\033[0m Your commit contains files that should pass ESLint but do not. Please fix the ESLint errors and try again.\n"
    exit 1
  else
    echo "\033[42mESLINT SUCCEEDED\033[0m\n"
  fi
fi

# 校验html、css、json
bothFiles=$(git diff --cached --name-only --diff-filter=ACM -- '*.css' '*.wxss' '*.html' '*.wxml' '*.json')
if [[ "$bothFiles" != "" ]]; then
  echo "\nValidating Files:\n"
  checking=true

  for singleFile in $bothFiles
  do
    node hooks/lint.js --css="$singleFile"
    if [[ "$?" == 1 ]]; then
      checking=false  
    fi
  done

  echo "\nValidating Files completed!\n"
  if ! $checking; then
    echo "\033[41mCOMMIT FAILED:\033[0m Has Invalid Files\n"
    exit 1
  else
    echo "\033[42mCHECKING CSS SUCCEEDED\033[0m\n"
  fi
fi

#css美化
# 检查是否安装css-prettier 命令为cssPrettier
which cssPrettier &> /dev/null
if [[ "$?" == 1 ]]; then
  echo "\t\033[41mPlease install cssPrettier \033[0m"
  echo "\t\033[41m npm install -g css-prettier \033[0m"
  exit 1
fi
cssfiles=$(git diff --cached --name-only --diff-filter=ACM -- '*.css' '*.wxss')
if [[ "$cssfiles" != "" ]]; then
  echo "\nFormatting CSS:\n"
  CSSFORMATE=true

  # Prettify all staged .css files
  for FILE in $cssfiles
  do
    params="--path="${FILE}&&cssPrettier $params  && git add "$FILE"
    if [[ "$?" == 0 ]]; then
      echo "\t\033[32mcssPrettier Passed: $FILE\033[0m"
    else
      echo "\t\033[41mcssPrettier Failed: $FILE\033[0m"
      CSSFORMATE=false
    fi
  done
  if ! $CSSFORMATE; then
    echo "\033[41mCSS BEAUTIFY FAILED:\033[0m Your commit contains files that should pass cssPrettier but do not. Please fix the cssPrettier errors and try again.\n"
    exit 1
  else
    echo "\033[42mCSS BEAUTIFY SUCCEEDED\033[0m\n"
  fi
fi

# svg压缩
svgs=$(git diff --exit-code --cached --name-only --diff-filter=ACM -- '*.svg')
if [[ "$svgs" != "" ]]; then
  echo "\nMinifying SVG:\n"
  svgArr=("$svgs")
  CompressSvg=true
  for svg in ${svgArr[@]}
  do
    svgo --enable={removeDoctype,removeComments,removeScriptElement,removeStyleElement} "$svg" && git add "$svg" 
    if [[ "$?" == 0 ]]; then
      echo "\t\033[32mMinify SVG Passed: $svg\033[0m"
    else
      echo "\t\033[32mMinify SVG Failed: $svg\033[0m"
      CompressSvg=false
    fi
  done
  if ! $CompressSvg; then
    echo "\033[41mMINIFY SVG FAILED\033[0m\n"
    exit 1
  else
    echo "\033[42mMINIFY SVG SUCCEEDED\033[0m\n"
  fi
fi


# 图片压缩
images=$(git diff --exit-code --cached --name-only --diff-filter=ACM -- '*.png' '*.jpg')
if [[ "$images" != "" ]]; then
  echo "\nMinifying Images:\n"
  OLD_IFS="$IFS" 
  IFS=" " 
  arr=($images) 
  IFS="$OLD_IFS" 
  Compress=true
  for s in ${arr[@]} 
  do 
    echo "$s" | imageOptim && git add "$s" 
    if [[ "$?" == 0 ]]; then
      echo "\t\033[32mMinify Images Passed: $s\033[0m"
    else
      echo "\t\033[32mMinify Images Failed: $s\033[0m"
      Compress=false
    fi
  done
  if ! $Compress; then
    echo "\033[41mMINIFY IMAGES FAILED\033[0m\n"
    exit 1
  else
    echo "\033[42mMINIFY IMAGES SUCCEEDED\033[0m\n"
  fi
fi


# html-prettier
htmlFiles=$(git diff --exit-code --cached --name-only --diff-filter=ACM -- '*.html' '*.wxml')
if [[ "$htmlFiles" != "" ]]; then
  echo "\nFormat Html\n"
  htmlArr=($htmlFiles) 
  htmlFormate=true
  for html in ${htmlArr[@]}
  do
    html-prettier "$html" && git add "$html"
    if [[ "$?" == 0 ]]; then
      echo "\t\033[32mFormat Html Passed: $html\033[0m"
    else
      echo "\t\033[32mFormat Html Failed: $html\033[0m"
      htmlFormate=false
    fi
  done
  if ! $htmlFormate; then
    echo "\033[41mFORMAT Html FAILED\033[0m\n"
    exit 1
  else
    echo "\033[42mFORMAT Html SUCCEEDED\033[0m\n"
  fi
fi


# prettier
jsfiles=$(git diff --cached --name-only --diff-filter=ACM | grep ".jsx\{0,1\}$")
if [[ "$jsfiles" != "" ]]; then
  echo "\nFormatting Javascript:\n"
  FORMATE=true

  # Check for prettier
  which prettier &> /dev/null
  if [[ "$?" == 1 ]]; then
    echo "\t\033[41mPlease install prettier\033[0m"
    exit 1
  fi

  # Prettify all staged .js files
  for FILE in $jsfiles
  do
    echo "$FILE" | xargs prettier --print-width 80 --no-semi false --single-quote true --write && git add "$FILE"
    if [[ "$?" == 0 ]]; then
      echo "\t\033[32mprettier Passed: $FILE\033[0m"
    else
      echo "\t\033[41mprettier Failed: $FILE\033[0m"
      FORMATE=false
    fi
  done

  echo "\nJavascript formatting completed!\n"

  if ! $FORMATE; then
    echo "\033[41mCOMMIT FAILED:\033[0m Your commit contains files that should pass prettier but do not. Please fix the prettier errors and try again.\n"
    exit 1
  else
    echo "\033[42mCOMMIT SUCCEEDED\033[0m\n"
  fi
fi

# 生成icon.html
icon=$(git diff --exit-code --cached --name-only --diff-filter=ACDM -- '*.svg')
if [[ "$icon" != "" ]]; then
  echo "\ncreating icon.html:\n"
  node hooks/icon
  if [[ "$?" == 0 ]] && [[ -f "./img/icon.html" ]]; then
    git add "./img/icon.html"
  fi
  echo "\033[42mHTML CREATED\033[0m\n"
fi

# 创建记录
current=`date "+%Y-%m-%d %H:%M:%S"`
echo "time=$current" > hooks/output.txt | git add hooks/output.txt

exit $?