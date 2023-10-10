const express = require('express')
const app = express()

// accounts for edge cases where user runs
// file directly with both config and example config missing. 
// Idfk why would this happen because the setup should be done at run.sh
// maybe headless setup?



// AaAAaaaAaAaAaA

configParser = require("./config_parser.js");
console.log(configParser.parseConfig)
config = configParser.parseConfig();
hiddenPrefix = config[0]
port = config[1]

routes = require("./routes.js");
router = routes.routerWrapper(config[0]);
app.use(router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log(`Bypass hosted on ${hiddenPrefix}`);
})