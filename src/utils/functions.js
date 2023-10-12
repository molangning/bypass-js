const uuid = require('uuid');
const moment = require('moment-timezone');

function resetCookies(req, res) {
  res.redirect(req.url);
  return;
}

function cookiesHandler(req, res) {
  //check tz
  //check uuid
  //set uuid if not found and refresh
  //send user back to main page if tz invalid or missing

  let cookies = req.cookies;
  tz = cookies.timezone;

  if (typeof tz !== 'string' || moment.tz.zone(tz) === null) {
    resetCookies(req, res);
    return;
  }

  uuid_regex = new RegExp(/^uuid_[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)

  if (typeof cookies.uuid !== 'string' || !uuid_regex.test(cookies.uuid)) {
    res.cookie('uuid', 'uuid_' + uuid.v4());
    resetCookies(req, res);
    return;
  }
}



module.exports = { cookiesHandler };