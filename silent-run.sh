#!/bin/bash

git ls-remote -q > /dev/null 2>&1

if [ $? -ne 0 ]; then
  git init
  git remote add origin https://github.com/molangning/bypass-js.git
  git fetch
  git reset origin/main
  git checkout -t origin/main
fi


npm install express --save
git pull
node server.js