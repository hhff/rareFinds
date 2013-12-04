define(['jquery'], function($){

	exampleModule = new Object();

	exampleModule._init = function(){
		alert('I Initialised.');		
	}

	return exampleModule;
});