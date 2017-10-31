function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    return {
        'total': t,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);
        if(Game.GAME_MODE == 1 || Game.GAME_MODE == 2)
        {
	        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
	        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
	    }
	    else{
	    	minutesSpan.innerHTML = ('02')
	        secondsSpan.innerHTML = ('00');
	    }

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) +  60 * 2000);
initializeClock('clockdiv', deadline);

/**
 * Initializes the level timer
 */
Game.initTimer = function() {
	var minutes = 2;	// The timer is initialized at 3 minutes
	Game.timer = minutes * 60 * 1000;
	get('#current_gauge').style.height = '100%';
	
	/**
	 * Updates the level timer
	 */
	Game.updateTimer = function() {
		Game.timer -= 50;

		// Every second
		if (Game.timer % 1000 == 0) {
			get("#current_gauge").style.height = (Game.timer * 100 / (minutes * 60 * 1000)) + '%';
			if(parseInt(Game.timer * 100 / (minutes * 60 * 1000))<60)
				get("#current_gauge").style.backgroundColor = 'yellow';
			if(parseInt(Game.timer * 100 / (minutes * 60 * 1000))<20)
				get("#current_gauge").style.backgroundColor = 'red';

		}

		if (Game.timer <= 0) {
			Game.timesUp();
		}
	};
};

Game.resetTimer = Game.initTimer;

/**
 * The player loses if the timer is finished
 */
Game.timesUp = function() {
	Popup.confirm('Time is up !<br/>Do you wish to restart current level?', null, Game.restartMission);
}