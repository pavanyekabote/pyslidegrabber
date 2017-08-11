'use strict';
const constants = require('./const');
const label = require('./label');
const fs = require('fs');
const https = require('https');
function pygrabber(link, callback, options){

	options =  options || { outlocation: constants.OUTLOCATION.CURRENT , reqType: constants.REQTYPE.HTTPS , quality: constants.QUALITY.HIGH };
	
	label.startLabelling(link, (err, res)=>{

		if(options.outlocation === constants.OUTLOCATION.CURRENT )
		{
			let countComplete = 0;
			res.forEach((blockObject)=>{
				let writer = fs.createWriteStream(`${__dirname}/${blockObject.label}.${blockObject.format}`);
				console.log(`${__dirname}/${blockObject.label}.${blockObject.format}`);
				startRequest(blockObject.url , writer, (flag, downlaodlink)=>{
					if(flag === 1){
						countComplete++;
						console.log("Completed -- "+countComplete+ "----->"+downlaodlink+"<-------");
					}
				
				});
			});
			if(countComplete < res.length)
				callback(new Error("Could not fetch all files"),"Completed")
		}

	}, options);

}

function startRequest(httplink, writer, callback){
	https.get(httplink, (res)=>{
			
		res.pipe(writer);
		res.on('end', callback(1, httplink));

	}).on('error',(err)=>{
		callback(0, httplink);
	})
}

module.exports = {

	pygrabber
}