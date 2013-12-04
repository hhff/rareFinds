requirejs.config({
	baseUrl: 'js/modules',
	paths: {
		'domReady': '../domReady',
		'jquery': '../vendor/jquery-1.10.1.min'
	}
});

require(['domReady','app'], function (domReady, app) {
	
	domReady(function(){
		app._init();
		app._removeLoader();
	})

});