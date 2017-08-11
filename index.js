'use strict';
var https = require('https');
const load = require('./utils/load');

load.pygrabber("https://www.slideshare.net/poonampkc/unit-3-11466487",(err, res)=>{

	console.log(res);
});