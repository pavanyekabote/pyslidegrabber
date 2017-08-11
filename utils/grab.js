'use strict';

const fs = require('fs');
const https = require('https');


const getFromFile = function(filename, callback){

	fs.readFile(filename,'utf8', (err, result)=>{
		if(err )
			throw err;
		callback(result);
	});
}

/** Grabs data from the website https link callback gives resultant string*/
const getFromHttps = function(httplink, callback){
	
	let str = "";
	https.get(httplink, (res)=>{
			
			res.on('data',(d)=>{
				str += d;
			});

			res.on('end', ()=>{

				callback(str);
			});
	}).on('error',(err)=>{
		throw err;
	});
}

module.exports = {

	getFromFile,
	getFromHttps
}