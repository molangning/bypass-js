const uuid = require("uuid");
const moment = require("moment-timezone");
const fs = require("fs");

if (!fs.existsSync("src/reset.html")) {
	throw new Error("Unable to find reset.html");
}

let resetCookiesHtml = "";

try {
	resetCookiesHtml = fs.readFileSync("src/reset.html", "utf-8");
} catch (err) {
	throw new Error("Unable to open reset.html for reading. Permission error?");
}

function resetCookies(req, res) {
	res.send(resetCookiesHtml);
	return;
}

function cookiesHandler(req, res) {
	//check tz
	//check uuid
	//set uuid if not found and refresh
	//send user back to main page if tz invalid or missing

	const cookies = req.cookies;
	const tz = cookies.timezone;
	const uuid_regex =
		/^uuid_[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

	let passed = true;

	if (typeof cookies.uuid !== "string" || !uuid_regex.test(cookies.uuid)) {
		res.cookie("uuid", `uuid_${uuid.v4()}`);
		passed = false;
	}

	if (typeof tz !== "string" || moment.tz.zone(tz) === null) {
		passed = false;
	}

	if (!passed) {
		resetCookies(req, res);
		return false;
	}

	return true;
}

module.exports = { cookiesHandler };
