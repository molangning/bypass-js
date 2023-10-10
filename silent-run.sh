#!/bin/bash

git ls-remote -q 2> /dev/null
return_code
if [ $return_code -ne 0 ]; then
  git remote add origin https://github.com/molangning/bypass-js.git
  git checkout main
  git pull
fi


npm install express --save
git pull
node server.js