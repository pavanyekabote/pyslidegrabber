'use strict';

const grabber = require('./grab');
const constants = require('./const');

/** Finds all the links and sets it to Array .. The resultant array is given out from callback */
function grepLinks(datasrclink, callback, options ){
		

		options.reqType === constants.REQTYPE.HTTPS ?
			
			grabber.getFromHttps(datasrclink, (result)=>{
				parseToArrayOfLinks(result,callback, options);
			})	: 
			
			( options.reqType === constants.REQTYPE.FILE ) ?
			
			grabber.getFromFile(datasrclink, (result)=>{

				parseToArrayOfLinks(result, callback, options);

			}): function(){ throw new Error("reqType should be either of https / file") };
}

/** Takes and parses data to array of links */
function parseToArrayOfLinks(data, callback, options){

	let resultArray = [], err;
	let st = data.split(options.quality);
	st = st.splice(1,st.length);
	st.forEach(url=>{
		resultArray.push(url.split("\"")[1]);
	});

	if( resultArray.length > 0)
		callback(err, resultArray);
	else
		callback(new Error("Could not parse the actual links"), resultArray);
}

module.exports = {

	grepLinks
}