#!/bin/bash

if [ ! -d ".git" ]; then
  git remote add origin https://github.com/molangning/bypass-js.git
  git checkout main
  git pull
fi

npm install express --save
git pull
node server.js