'use strict';
const constants = require('./const');
const label = require('./label');
const fs = require('fs');
const https = require('https');

function pygrabber(link, outputdir , callback, options){

	options =  options || {  reqType: constants.REQTYPE.HTTPS , quality: constants.QUALITY.HIGH };
	

	label.startLabelling(link, (err, res)=>{

		
		
			let countComplete = 0;
			res.forEach((blockObject)=>{
				let writer = fs.createWriteStream(`${outputdir}/${blockObject.label}.${blockObject.format}`);
				//console.log(`${outputdir}/${blockObject.label}.${blockObject.format}`);
				startRequest(blockObject.url , writer, (flag, downlaodlink)=>{
					if(flag === 1){
						countComplete++;
						console.log("Completed -- "+countComplete+ "----->"+downlaodlink+"<-------");
						
						if(countComplete === res.length)
							callback(undefined, "\n\nGrabbing has been completed\n\n--------Developed By Pavan Yekabote-------");

					}
				
				});
			});
			
		

	}, options);

}

function startRequest(httplink, writer, callback){
	https.get(httplink, (res)=>{
			
		res.pipe(writer);
		res.on('end',()=>{ callback(1, httplink) });

	}).on('error',(err)=>{
		callback(0, httplink);
	})
}



module.exports = pygrabber