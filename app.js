const express = require("express");
const app = express();
const compression = require("compression");
const cookieParser = require("cookie-parser");

// accounts for edge cases where user runs
// file directly with both config and example config missing.
// Idfk why would this happen because the setup should be done at run.sh
// maybe headless setup?

// AaAAaaaAaAaAaA
/// Some day this code will come and haunt me forever

configParser = require(`${process.cwd()}/src/utils/config_parser.js`);
config = configParser.parseConfig();
hiddenPrefix = config[0];
port = config[1];

app.use(compression());
app.use(cookieParser());
app.use(require("./src/routes/routes.js"));

app.use(config[0], express.static(`${process.cwd()}/src/hidden-prefix/`));
app.use(config[0], require("./src/routes/hidden_prefix_routes.js"));

listeningAddress = `http://0.0.0.0:${port}`;

// Noob friendly logging

if ("REPLIT_DEV_DOMAIN" in process.env) {
	listeningAddress = `https://${process.env.REPLIT_DEV_DOMAIN}`;
}

if ("PROJECT_NAME" in process.env) {
	listeningAddress = `https://${process.env.PROJECT_NAME}.glitch.me`;
}

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
	console.log(`Bypass hosted on ${listeningAddress}${hiddenPrefix}`);
});
