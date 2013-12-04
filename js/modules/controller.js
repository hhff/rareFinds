define(['jquery'], function($){

	controller = new Object();

	var $navLinks = $('.js-navLink'),
		$panelContent = $('.js-panelContent'),
		$featureImg = $('.js-featureImg');

	controller._init = function(){

		//View Bindings Here
		$navLinks.on('click',function(){
			var $me = $(this),
				myContext = $me.data('context');

			$navLinks.removeClass('active');
			$me.addClass('active');

			controller._navClick(myContext);
		})


	}

	controller._navClick = function(context){

		$panelContent.removeClass('active');
		$panelContent.filter('#'+context).addClass('active');

		$featureImg.removeClass('active');
		$featureImg.filter('#'+context).addClass('active');
	}

	return controller;
});