#!/bin/bash

git ls-remote -q > /dev/null 2>&1

# this helped me save so much time
# https://stackoverflow.com/a/18999726
if [ $? -ne 0 ]; then
  git init
  git remote add origin https://github.com/molangning/bypass-js.git
  git fetch
  git reset origin/main
  git checkout -t origin/main
fi

npm install compression cookie-parser node-fetch express moment-timezone uuid --save
git pull
node app.js