const express = require('express');
const app = express();
const compression = require('compression');

// accounts for edge cases where user runs
// file directly with both config and example config missing. 
// Idfk why would this happen because the setup should be done at run.sh
// maybe headless setup?



// AaAAaaaAaAaAaA

configParser = require(`${process.cwd()}/src/utils/config_parser.js`);
console.log(configParser.parseConfig)
config = configParser.parseConfig();
hiddenPrefix = config[0]
port = config[1]

app.use(compression());

app.use(require(`${process.cwd()}/src/routes/routes.js`));

app.use(require(`${process.cwd()}/src/routes/hidden_prefix_routes.js`).routerWrapper(config[0]));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log(`Bypass hosted on /${hiddenPrefix}`);
})