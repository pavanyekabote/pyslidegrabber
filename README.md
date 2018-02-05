# pyslidegrabber
NodeJS Project to download slides from slideshare website without having to login.


#Sample Usage Code
<pre>
const load = require('./pyslidegrabber');

const constants = load.constants;
const options = {

	quality: constants.QUALITY.MEDIUM,
	reqType : constants.REQTYPE.HTTPS


}

load.pygrabber("https://www.slideshare.net/CBInsights/emerging-technology-trends-2017-intern-presentation-78641216"
	,"./MySlides",(err, res)=>{
	console.log(res);
},options);
</pre>

#parameters of pygrabber 
1. URL of Slides in Slideshare website 
2.Location to save the downloaded slides
3.Options for quality of the slide.

#Quality Constants
 constants.QUALITY.HIGH
 constants.QUALITY.MEDIUM
 constants.QUALITY.LOW
 
