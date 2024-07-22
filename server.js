// hack for glitch

const { spawn } = require("node:child_process");

console.log("Running as glitch, checking for updates");

const process = spawn("./silent-run.sh");

process.stdout.on("data", (data) => {
	console.log(`${data}`);
});

process.stderr.on("data", (data) => {
	console.error(`${data}`);
});

process.on("close", (code) => {
	console.log(`Script exited with code ${code}`);
});
