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


		//Email Validation
		$('#email').on('keyup', function(e){
			var $input = $(this),
				formVal = $(this).val();
			if (controller._validateEmail(formVal) == true){
				validEmail = true;
				$input.removeClass('invalid');
				$input.addClass('valid');
			}else{
				validEmail = false;
				$input.removeClass('valid');
				$input.addClass('invalid');
			}

			if (!formVal){
				$input.removeClass('valid');
				$input.removeClass('invalid');
			}

			if (e.keyCode === 13) {
				$('#js-emailForm').submit();
			}

		});

		$('#email').on('focus', function(){
			$(this).attr('placeholder', '')
		})

		$('#email').on('blur', function(){
			$(this).attr('placeholder', 'Get Updates')
		})

		$('#emailSubmit').on('click', function(){
			$('#js-emailForm').submit();
		})

		$('#js-emailForm').submit(function(e){
			if (validEmail == true){
				//submit
			}else{
				e.preventDefault();
				//no submit
			}
		})


	}

	controller._navClick = function(context){

		$panelContent.removeClass('active');
		$panelContent.filter('#'+context).addClass('active');

		$featureImg.removeClass('active');
		$featureImg.filter('#'+context).addClass('active');
	}

	controller._validateEmail = function(email){
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}


	return controller;
});