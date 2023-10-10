// We have two cookies
// uuid and timezone
// uuid format: uuid_random_chars

function checkCookies(req, res, next){
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } else {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next(); // <-- important!
}


function set_uuid(){
  const crypto = require('crypto');
  return crypto.randomUUID()
}

// not done
function parseCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// end js
date_default_timezone_set('Asia/Singapore');

  if (isset($_COOKIE["uuid"])){
    $uuid=$_COOKIE["uuid"];

    if (strlen($uuid) !== 37){
      set_uuid();
      
    } else if (!str_starts_with($uuid, "uuid_")){
      set_uuid();
    }
  } else {
    set_uuid();
  }

  if (isset($_COOKIE["timezone"])){
    $timezone=$_COOKIE["timezone"];
    if (!in_array($timezone, timezone_identifiers_list(),true)) {
      require "setcookies.php";
    }
  }

?>