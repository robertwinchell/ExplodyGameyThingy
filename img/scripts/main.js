/**
This is the first js file to be loaded.
**/

//Configuration
requirejs.config({
	baseUrl: 'scripts',
	paths: {
		//The libraries we use:
		jquery: [
            //If it can't load from the CDN, it'll load the local version below:
			'lib/jquery-3.2.1'
		]
	
	}
});


//Main
var timeRemain;

function setState(ele_name,state)
{
	if(state == 'false')
		document.getElementById(ele_name).style.display = 'none';
	else if(state == 'true')
		document.getElementById(ele_name).style.display = 'block';
}

function timeCounter(){
	timeRemain--;
	document.getElementById('gameState').innerHTML = "Timed Mode<br>Playing Time<br>"+timeRemain+"s";
	if(timeRemain >= 0 ) setTimeout(timeCounter,1000);
	else{
		alert("Your Game Was Finished.");
		document.location.replace('index.html');
	}
}

nLevel = 1;
document.getElementById('btnStart').onclick = function()
{
	var primaryMode = document.getElementById('time').checked;
	var secondaryMode = document.getElementById('casual').checked;

	document.getElementById('startGame').style.display = 'none';
	document.getElementById('field').style.display = 'block';
	document.getElementById('points').style.display = 'block';
	document.getElementById('points').innerHTML = "Your Score<br>0";

	document.getElementById('gameState').style.display = 'block';
	document.getElementById('btnHint').style.display = 'block';
	document.getElementById('btnShuttle').style.display = 'block';

	if(primaryMode == true)
	{
		nGameMode = 1;
		document.getElementById('gameState').innerHTML = "Timed Mode<br>Playing Time<br>0s";
		timeRemain = 40;
		timeCounter();
	}
	else if(primaryMode == false && secondaryMode == true)
	{
		nGameMode = 2;
		document.getElementById('gameState').innerHTML = "Untimed-><br>Casual Mode";
	}
	else if(primaryMode == false && secondaryMode == false)
	{
		nGameMode = 3;
		document.getElementById('gameState').innerHTML = "Untimed-><br>Level Mode<br>Level "+nLevel+" : "+nLevel*500;
		document.getElementById('showProgress').style.display = 'block';
		document.getElementById('complete').style.width = (nLevel-1)*10+'%';
	}
	require(['jquery', 'app'], function($, app){
       $('#testing').html('this is the main module');
       app.init();
	});
}