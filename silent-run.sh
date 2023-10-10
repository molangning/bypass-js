#!/bin/bash

git ls-remote -q > /dev/null 2>&1

if [ $? -ne 0 ]; then
  git remote add origin https://github.com/molangning/bypass-js.git
  git checkout main
  git pull
fi


npm install express --save
git pull
node server.js