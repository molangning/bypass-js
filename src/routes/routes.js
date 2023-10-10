const express = require('express');
const router = express.Router();

function routerWrapper(hiddenPrefix) {
  if (!typeof hiddenPrefix === 'string' || hiddenPrefix instanceof String) {
    throw new Error('hiddenPrefix must be a string');
  }

  console.log(hiddenPrefix);
  router.use(express.static('public'));

  router.get('/', (req, res) => {
    res.send('Hello World!');
  })

  router.get(RegExp(`^/${hiddenPrefix}(/|/.*|)$`), (req, res) => {
    res.send('Goodbye World');
  });

  return router;
}
module.exports = { routerWrapper };