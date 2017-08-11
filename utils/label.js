'use strict';
const constants = require('./const');
const grepper = require('./grepper');

/** returns an array of objects with Names and Links */
function startLabelling(link, callback, options){

	let resultObjects = [];
	grepper.grepLinks(link, (err, res)=>{

		if(err)
			callback(err, res);
		else
		{
			res.forEach((url)=>{
				resultObjects.push(labelEachLink(url));
			});

			if(resultObjects.length >0 )
				callback(err, resultObjects);
			else
				callback(new Error("Couln't parse the given link"),resultObjects);
		}

	}, options);


}

/** parse the link and grabs the image number */
function labelEachLink(url)
{
	let label = url.split('/');
	label = label[label.length-1];
	label = label.split('-');
	let format = ((label[label.length-1]).split('.')[1]).split("?")[0];
	label = label[label.length-2];

	return { label, url, format };
}

module.exports = {
	startLabelling
}