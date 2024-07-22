const fs = require("fs");
const path = require("path");

function parseConfig() {
	const randomPrefix = Math.random().toString(36).substring(2);
	const defaultConfig = `# hidden prefix for our app to hide under\nhidden_prefix: ${randomPrefix}\n\n# port to serve under\nport: 8080`;
	let hiddenPrefix = randomPrefix;
	let port = 8080;

	if (!fs.existsSync("app.config")) {
		try {
			fs.writeFileSync("app.config", defaultConfig);
		} catch (err) {
			throw new Error(
				"Unable to open config file(app.config) for writing. Permission error?",
			);
		}
	}

	try {
		config = fs.readFileSync("app.config", "utf-8");
	} catch (err) {
		throw new Error(
			"Unable to open config file(app.config) for reading. Permission error?",
		);
	}
	// this regex matches comments, including inline comments exccept for escaped blackslashes: /(?<!\\)#.*/

	config = config.replace(/#.*/g, "");
	parsedConfig = [];
	for (const line of config.split("\n")) {
		if (line.startsWith(" ") || line === "") {
			continue;
		}
		parsedConfig.push(line);
	}

	for (const line of parsedConfig) {
		if (line.startsWith("hidden_prefix")) {
			hiddenPrefix = line.split(": ")[1].trim();
		} else if (line.startsWith("port")) {
			port = line.split(": ")[1].trim();
		} else {
			throw new Error("Unknown option in config file: " + "line");
		}
	}

	if (Number.isNaN(port)) {
		throw new Error("Port must be a number");
	}

	port = Number.parseInt(port);

	if (port > 65535 || port < 0) {
		throw new Error("Port must be between 0 and 65535");
	}

	if (hiddenPrefix.length === 0) {
		throw new Error("Hidden prefix must not be empty");
	}

	if (hiddenPrefix.length === 0) {
		throw new Error("Hidden prefix must not be empty");
	}

	if (!/^[a-zA-Z0-9]*$/.test(hiddenPrefix)) {
		throw new Error("Hidden prefix must be alphanumeric");
	}
	return [`/${hiddenPrefix}`, port];
}

module.exports = { parseConfig };
