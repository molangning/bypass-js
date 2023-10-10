const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

function return404(res) {
  res.status(404).send("404");
  return;
}

function redirect(res,loc){
  res.set('Cache-Control','max-age=0')
  res.redirect(301,loc);
}


function serveStatic(res,path){
  // cache everything unless updated
  res.set('Cache-Control', 'public, no-cache')
  res.sendFile(path);
}

function routerWrapper(hiddenPrefix) {

  if (!typeof hiddenPrefix === 'string' || hiddenPrefix instanceof String) {
    throw new Error('hiddenPrefix must be a string');
  }

  router.get(RegExp(`^/${hiddenPrefix}(/|/.*|)$`), (req, res) => {
    let realPath = req.path.replace(`/${hiddenPrefix}`, '');
    if (realPath === '') {
      realPath = '/';
      return;
    }
    if (realPath === '/') {
      serveStatic(res,`${process.cwd()}/src/hidden-prefix/bypass.html`);
      return;
    }

    if (realPath === '/bounce') {
      if (!req.query.url) {
        return404(res);
        return
      }
      redirect(res,req.query.url);
      return;
      
    }

    if (realPath.endsWith("/")) {
      realPath = realPath.slice(0, -1);
    }
    
    console.log(realPath);
    filePath = `${process.cwd()}/src/hidden-prefix${realPath}`
    console.log(`accessing ${filePath}`);
    if (fs.existsSync(filePath)) {
      serveStatic(res,filePath);
      return;
    } else {
      console.log(`404 don't have ${filePath}`);
    }

  return404(res);
  return;

  });

  return router;
}
module.exports = { routerWrapper };

