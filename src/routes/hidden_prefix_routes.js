const express = require('express');
const fs = require('fs');
const path = require('path');
var moment = require('moment-timezone');

const router = express.Router();

// Put in functions.js later

function resetCookies(req, res) {
  res.redirect(req.url);
  res.send("reloading page...");
  return;
}

function cookiesHandler(req, res) {
  //check tz
  //check uuid
  //set uuid if not found and refresh
  //send user back to main page if tz invalid or missing

  let cookies = req.cookies;
  console.log('Cookies: ', req.cookies)
  console.log(moment.tz.zone(cookies.tz))
  if (typeof cookies.tz !== 'string' || !moment.tz.zone(cookies.tz)) {
    resetCookies(req, res);
    return;
  }

  uuid_regex = new RegExp(/^uuid_[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)

  if (typeof cookies.uuid !== 'string' || !uuid_regex.test(cookies.uuid)) {
    res.cookie('uuid', 'uuid_' + set_uuid());
    resetCookies(req, res);
    return;
  }

}

function set_uuid() {
  const crypto = require('crypto');
  return crypto.randomUUID();
}

// end code from functions.js

function return404(res) {
  res.status(404).send("404");
  return;
}

function redirect(res, loc) {
  res.set('Cache-Control', 'max-age=0')
  res.redirect(301, loc);
  res.send()
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



    console.log("I'm still runnin'")

    let realPath = req.path.replace(`/${hiddenPrefix}`, '');
    if (realPath === '') {
      realPath = '/';
    }
    if (realPath === '/') {
      serveStatic(res, `${process.cwd()}/src/hidden-prefix/bypass.html`);
      return;
    }

    if (realPath === '/bounce') {
      if (!req.query.url) {
        return404(res);
        return
      }
      cookiesHandler(req, res);
      if (!res.headersSent) {
        redirect(res, req.query.url);
      }
      return;

    }

    if (realPath.endsWith("/")) {
      realPath = realPath.slice(0, -1);
    }

    console.log(realPath);
    filePath = `${process.cwd()}/src/hidden-prefix${realPath}`
    console.log(`accessing ${filePath}`);
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

