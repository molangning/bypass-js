const fs = require("node:fs");
const moment = require("moment-timezone");

function log(uuid, tz, path, type) {
	if (typeof type === "string") {
		filePath = `logs/${type}/${type}-${moment(new Date()).tz("Asia/Singapore").format("DD-MM-YYYY")}.txt`;
	} else {
		throw new Error("Log type not string!");
	}

	message = `type: ${type}\nuuid: ${uuid}\ntz: ${tz}\npath: ${path}\ntime: ${moment(new Date()).tz("Asia/Singapore").format("h:mm:ss a")}\n==========================================\n`;

	fs.appendFileSync(filePath, message);
}

module.exports = { log };
