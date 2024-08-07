#!/bin/bash

git ls-remote -q >/dev/null 2>&1

# this helped me save so much time
# https://stackoverflow.com/a/18999726
if [ $? -ne 0 ]; then
  git init
  git remote add origin https://github.com/molangning/bypass-js.git
  git checkout -t origin/main
fi

if [ ! -f ".keep_changes" ]; then
  if [ -f ".use_dev" ]; then
    git reset origin/dev --hard
  else
    git reset origin/main --hard
  fi
  git fetch --all
  git clean -df
fi

git pull

npm install compression cookie-parser node-fetch express moment-timezone uuid --save
node app.js
