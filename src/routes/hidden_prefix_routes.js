const express = require("express");
const fs = require("fs");
const path = require("path");
const { cookiesHandler } = require("../utils/functions.js");
const { log } = require("../utils/logging.js");

const router = express.Router();

function return404(res) {
	res.status(404).send("404");
	return;
}

function redirect(res, loc) {
	res.set("Cache-Control", "max-age=0");
	res.redirect(308, loc);
	res.send();
	return;
}

function serveStatic(res, path) {
	// cache everything unless updated
	res.set("Cache-Control", "public, no-cache");
	res.sendFile(path);
}

router.get("/*", (req, res) => {
	if (req.path === "/") {
		serveStatic(res, `${process.cwd()}/src/bypass.html`);
		return;
	}

	if (req.path !== "/bounce" && req.path !== "/permalink") {
		return404(res);
		return;
	}

	if (!cookiesHandler(req, res)) {
		return;
	}

	let redirectUrl = "";

	if (req.path === "/bounce" || req.path === "/permalink") {
		if (req.query.url) {
			redirectUrl = req.query.url;
		} else if (req.query.si) {
			redirectUrl = Buffer.from(req.query.si, "base64").toString();
		} else {
			return404(res);
			return;
		}
	}

	if (!redirectUrl) {
		return404(res);
	}

	if (!res.headersSent) {
		redirect(res, redirectUrl);
		log(req.cookies.uuid, req.cookies.timezone, redirectUrl, "info");
		return;
	}
});

module.exports = router;
