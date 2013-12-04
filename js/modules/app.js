define(['controller'], function(controller){

	app = new Object();

	app._init = function(){
		controller._init();		
	};

	app._removeLoader = function(){
		//lert('this');
		$('#loader, #container').toggleClass('hidden');
		$('body').removeClass('no-scroll');
	};

	return app;
});