/**
This is the first js file to be loaded.
**/

//Configuration
requirejs.config({
	baseUrl: 'scripts',
	paths: {
		//The libraries we use:
		jquery: [
            //Try loading from CDN first:
			'//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min',
			//If it can't load from the CDN, it'll load the local version below:
			'lib/jquery-3.2.1'
		]
	
	}
});


//Main
require(['jquery', 'app'], function($, app){
       $('#testing').html('this is the main module');
       app.init();

});

