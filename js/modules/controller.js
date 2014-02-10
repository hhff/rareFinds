define(['jquery'], function($){

	controller = new Object();

	var $navLinks = $('.js-navLink'),
		$panelContent = $('.js-panelContent'),
		$featureImg = $('.js-featureImg'),
		validEmail = false;

	controller._init = function(){

		queryString = controller._checkQuery();

		controller._initSoundcloud();

		if(queryString != false){
			controller._navClick(queryString)
		}else{
			controller._navClick('about-us', false);
		}

		//View Bindings Here
		$navLinks.on('click',function(){
			var $me = $(this),
				myContext = $me.data('context');

			$navLinks.removeClass('active');
			$me.addClass('active');

			controller._navClick(myContext);
		})


		$('#mobileNavSwitch').on('click', function(){
			$('#mobileNav').toggleClass('active');
			$('#mobileNavSwitch').toggleClass('active');
			$('#content').toggleClass('none');
		})

		$emailInput = $('input#email')

		//Email Validation
		$emailInput.on('keyup', function(e){

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

		// $('#emailSubmit').on('click', function(){
		// 	$('#js-emailForm').trigger("submit");
		// })

		$('#js-emailForm').submit(function(e){
			// console.log(e);
			if (validEmail == true){
				formVal = $emailInput.val()
	
			}else{
				e.preventDefault();
				console.log('no submit')
			}
		})

	}

	controller._navClick = function(context, pushState){
		var field = '#/',
			stateObj = { foo: "bar" },
			transitionTime = 300,
			$activePanel = $panelContent.filter('.active');

		if (pushState != false){
			history.pushState(stateObj, context, field+context);
		}


		$activePanel.removeClass('active');
		window.setTimeout(function(){
			$activePanel.addClass('displayNone');
		}, transitionTime);
		$panelContent.filter('#'+context).removeClass('displayNone').addClass('active');

		$featureImg.removeClass('active');
		$featureImg.filter('#'+context).addClass('active');

		$('#mobileNav').removeClass('active');
		$('#mobileNavSwitch').removeClass('active');
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


	controller._miniPlayer = '<object style="z-index:99" height="20" width="100%"><param name="movie" value="https://player.soundcloud.com/player.swf?url={soundcloudID}&player_type=tiny{widgetParams}"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="transparent"></param><embed wmode="transparent" allowscriptaccess="always" height="20" width="100%" src="https://player.soundcloud.com/player.swf?url={soundcloudID}&player_type=tiny{widgetParams}"></embed></object>';


	return controller;
});