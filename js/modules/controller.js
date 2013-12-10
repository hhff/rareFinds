define(['jquery'], function($){

	controller = new Object();

	var $navLinks = $('.js-navLink'),
		$panelContent = $('.js-panelContent'),
		$featureImg = $('.js-featureImg');

	controller._init = function(){

		queryString = controller._checkQuery();

		controller._initSoundcloud();

		if(queryString != false){
			controller._navClick(queryString)
		}

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
		var field = '#/',
			stateObj = { foo: "bar" };

		history.pushState(stateObj, context, field+context);


		$panelContent.removeClass('active');
		$panelContent.filter('#'+context).addClass('active');

		$featureImg.removeClass('active');
		$featureImg.filter('#'+context).addClass('active');
	}

	controller._validateEmail = function(email){
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	controller._checkQuery = function(){
		var field = '#/';
		var url = window.location.href;
		if(url.indexOf(field) != -1)
		    return url.split(field)[1];
		return false
	}

	controller._initSoundcloud = function(){
		var url = $('#url').text().trim(),
			$playerContainer = $('#player');

		var stringSupplant = function (o) {
		  return this.replace(
		    /\{([^{}]*)\}/g,
		    function (a, b) {
		      var r = o[b];
		      return typeof r === 'string' || typeof r === 'number' ? r : a;
		    }
		  );
		};

		SC.oEmbed(url, { auto_play: false }, function(oEmbed) {
			var soundcloudID = (oEmbed.html.split('url=')[1].split('&')[0]),
				widgetParams = '&color=6d6d6d&show_comments=false',
				embedCode = stringSupplant.call(controller._miniPlayer, {
					widgetParams: widgetParams,
					soundcloudID: soundcloudID
				});

			$playerContainer.append(embedCode);
		});
	}


	controller._miniPlayer = '<object class="lasso" height="20" width="100%"><param name="movie" value="https://player.soundcloud.com/player.swf?url={soundcloudID}&player_type=tiny{widgetParams}"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="transparent"></param><embed wmode="transparent" allowscriptaccess="always" height="20" width="100%" src="https://player.soundcloud.com/player.swf?url={soundcloudID}&player_type=tiny{widgetParams}"></embed></object>';


	return controller;
});