const moment = require('moment-timezone');

console.log(moment(new Date()).tz('Asia/Singapore').format('h:mm:ss a'))

