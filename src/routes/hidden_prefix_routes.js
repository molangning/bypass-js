const express = require('express');
const fs = require('fs');
const path = require('path');
const cookiesHandler = require(`${process.cwd()}/src/utils/functions.js`).cookiesHandler;
const log = require(`${process.cwd()}/src/utils/logging.js`).log;

const router = express.Router();


function return404(res) {
  res.status(404).send("404");
  return;
}

function redirect(res, loc) {
  res.set('Cache-Control', 'max-age=0')
  res.redirect(301, loc);
  res.send()
  return;
}

function serveStatic(res, path) {
  // cache everything unless updated
  res.set('Cache-Control', 'public, no-cache')
  res.sendFile(path);
}

function routerWrapper(hiddenPrefix) {

  if (!typeof hiddenPrefix === 'string' || hiddenPrefix instanceof String) {
    throw new Error('hiddenPrefix must be a string');
  }

  router.get(RegExp(`^/${hiddenPrefix}(/|/.*|)$`), (req, res) => {

    // console.log("I'm still runnin'")
    // yeah yeah yeah!

    if (!req.path.endsWith("/") && (Object.keys(req.query).length === 0 && req.query.constructor === Object
    )) {
      redirect(res, req.path + "/");
      return;
    }

    let realPath = req.path.replace(`/${hiddenPrefix}`, '');

    if (realPath === '') {
      realPath = '/';
    }

    if (realPath === '/') {
      serveStatic(res, `${process.cwd()}/src/hidden-prefix/bypass.html`);
      return;
    }
    if (req.path.endsWith("/")) {
      realPath = realPath.slice(0, -1);
    }

    if (realPath === '/bounce') {
      if (!req.query.url) {
        return404(res);
        return
      }

      cookiesHandler(req, res);

      if (!res.headersSent) {
        redirect(res, req.query.url);
        log(req.cookies.uuid, req.cookies.timezone, req.query.url, 'info');
      }
      return;

    }

    filePath = `${process.cwd()}/src/hidden-prefix${realPath}`
    // console.log(`accessing ${filePath}`);
    if (fs.existsSync(filePath)) {
      serveStatic(res, filePath);
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

