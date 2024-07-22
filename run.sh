#!/bin/bash

# functions

# funntion confirm
# takes two arguments, prompt string and default condition.
function confirm() {

  default="Y"
  q_string="[Y/n]"

  case "$2" in

  no)
    default="n"
    q_string="[y/N]"
    ;;

  *)
    default="y"
    q_string="[Y/n]"
    ;;
  esac

  #change prompt
  read -r -p "$1 $q_string: " response
  case "$response" in

  "")
    if [ $default == "y" ]; then
      true
    else
      false
    fi
    ;;

  [yY][eE][sS] | [yY])
    true
    ;;

  [nN][oO] | [nN])
    false
    ;;

  *)
    false
    ;;
  esac

}

git ls-remote -q >/dev/null 2>&1

# this helped me save so much time
# https://stackoverflow.com/a/18999726
if [ $? -ne 0 ]; then
  git init
  git remote add origin https://github.com/molangning/bypass-js.git
  git fetch
  git reset origin/main
  git checkout -t origin/main
fi

if [ ! -f ".setup_done" ]; then
  if confirm "Do you want to use the development branch?" n; then
    git pull
    git checkout dev
    touch .use_dev
  fi

  if confirm "Do you want to keep local changes?" n; then
    touch .keep_changes
  fi

  touch .setup_done
fi

if [ ! -f ".keep_changes" ]; then
  git fetch --all
  if [ -f ".use_dev" ]; then
    git reset origin/dev --hard
  else
    git reset origin/main --hard
  fi
fi

npm install uuid compression cookie-parser node-fetch express moment-timezone --save
git pull
node app.js
