//******************** BEGIN TIMER DEFINITION******************** 
var timer = {
	
	jQuery : $,
	
	//settings for timer
	settings : {
		total_time              : 20,
		left_time               : 20,
		warn_time               : 10,
		redirect_time           : 5,
		countdown_container     : '#countdown-container',
		notifier_container      : '#notifier-container',
		notifier_timer          : '#notifier-timer',
		notifier_timer_confirm  : '#notifier-timer-confirm',
		notifier_timer_cancel   : '#notifier-timer-cancel',
		notifier_confirm_msg    : "Your timer is updated!",
		notifier_cancel_msg     : "Your timer is not updated!",
		notifier_msg            : "<span>Reset?&nbsp;&nbsp;<button type='button' id='notifier-timer-confirm' value='yes'>&nbsp;&nbsp;Yes&nbsp;&nbsp;</button><button type='button' id='notifier-timer-cancel' value='no'>&nbsp;&nbsp;No&nbsp;&nbsp;</button></span>"
	},
	
	//init function
	init : function(){
		var timer   = this,
		$           = this.jQuery,
		settings    = this.settings;
		window.setInterval(function(){timer.update_timer();}, 1000);
	},
	
	//calculate left_time and update timer
	update_timer : function(){
			var timer		= this,
			$						= this.jQuery,
			settings	  = this.settings;
	  	if (settings.left_time >= 0){
			min_int = parseInt(settings.left_time / 60);
			sec_int = parseInt(settings.left_time % 60);
	    min = min_int < 10 ? '0' + min_int : '' + min_int;
			sec = sec_int < 10 ? '0' + sec_int : '' + sec_int;
			$(settings.countdown_container + ' p').html(min + ' : ' + sec);
			if (settings.left_time == settings.warn_time){
				timer.show_notifier(settings.notifier_msg);
			}
			if (settings.left_time == 0){
			  timer.time_up();
			}
			console.log(settings.left_time);
			settings.left_time -= 1;
		}
 	},

	//show notifer message
	show_notifier : function(){
		var timer		= this,
		$						= this.jQuery,
		settings	  = this.settings;
		// settings.notifier_msg = $(settings.notifier_timer).html();
		$(settings.notifier_container).removeClass('hide').addClass('show');
		$(settings.notifier_timer).html(settings.notifier_msg);
		this.monitor_notifier();
	},
	//hide notifier bar
	hide_notifier : function(){
		var timer   = this,
		$           = this.jQuery,
		settings    = this.settings;
		$(settings.notifier_container).removeClass('show').addClass('hide');
	},
	
	//monitor notifier bar action
	monitor_notifier : function(){
		var timer		= this,
		$						= this.jQuery,
 		settings	  = this.settings;
		$(settings.notifier_timer_confirm).click(function(){
				settings.left_time = settings.total_time;
				$(settings.notifier_timer).html(settings.notifier_confirm_msg);
				setTimeout(function(){timer.hide_notifier();}, 3000);
			});
		$(settings.notifier_timer_cancel).click(function(){
			$(settings.notifier_timer).html(settings.notifier_cancel_msg);
			setTimeout(function(){timer.hide_notifier();}, 3000);
		});
	},
	
	//when time up, disable 'save' button
	time_up : function(){
		var timer   = this,
		$           = this.jQuery,
	  settings    = this.settings;
		var redirect_url = "http://localhost";
		window.location.replace(redirect_url);
		}
};
//******************** END OF TIMER DEFINITION******************** 

//call itl_timer when document is ready
timer.init();
