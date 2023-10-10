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
      if [$default == "y"]; then
        true
      else
        false
      fi
      ;;
      
    [yY][eE][sS]|[yY]) 
      true
      ;;
          
    [nN][oO]|[nN])
      false
      ;;
      
    *)
      false
      ;;
  esac

}

git ls-remote -q > /dev/null 2>&1

if [ $? -ne 0 ]; then
  git remote add origin https://github.com/molangning/bypass-js.git
  git branch --set-upstream-to=origin/main main
  git checkout main
  git pull
fi


if [ ! -f ".setup_done" ]; then
  if confirm "Do you want to use the development branch?" n; then
    git pull
    git checkout dev
  fi
  touch .setup_done
fi

if [ ! -f "./logs/php/php-error.log" ]; then
  touch ./logs/php/php-error.log
fi
npm install express --save
git pull
node server.js


  