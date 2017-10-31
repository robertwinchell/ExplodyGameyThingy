// Game initialisation

var Game = {};	// The game instance
Game.GRID_SIZE = 8;
Game.TILE_SIZE = 65;
Game.GAME_MODE = 0;
Game.STARTED = false;
/**
 * Initializes the game
 */
Game.init = function () {
	Game.gemRange = 7;		// The number of different gems on the grid
	Game.level = 1;
	Game.time = 0;
	Game.gem = null;		// The currently selected gem
	Game.moving = false;	// Are the gems moving or not ?
	Game.score = {
		goal: 500,
		current: 0
	};
	Game.bonus = {};
	Game.pauses = false;
	Game.initTimer();
	Game.GEM_WIDTH = 60;
	Game.GEM_HEIGHT = 60;

	// We initialize the UI
	if(Game.GAME_MODE == 2 || Game.GAME_MODE == 4) get('#level').innerHTML = Game.level;
	else get('#level').innerHTML = "Casual";
	get('#current_score').innerHTML = Game.score.current;
	if(Game.GAME_MODE == 2 || Game.GAME_MODE == 4) get('#goal_score').innerHTML = Game.score.goal;
	else get('#goal_score').innerHTML = 'Unlimit';
	get('#restart_bt').onclick = Game.confirmRestart;
	get('#pause_bt').onclick = Game.pause;

	Game.createGrid();
};

/**
 * Created the game's grid
 */
Game.createGrid = function() {
	var grid = get('#grid'), map = [], row, vGems = [], hGems = [], bg;

	var gridWidth = document.querySelector('#grid').offsetWidth;
	var gridHeight = document.querySelector('#grid').offsetHeight;

		Game.GEM_HEIGHT = Math.floor(gridHeight / Game.GRID_SIZE) - 5;
		Game.GEM_WIDTH = Math.floor(gridWidth / Game.GRID_SIZE) - 5;


	for (var i = 0; i < Game.GRID_SIZE; i++) {
		row = [];
		map.push(row);	// We create a row in the map

		for (j = 0; j < Game.GRID_SIZE; j++) {
			do {
				gem = new Game.Gem(j, i, parseInt(Math.random() * Game.gemRange));
				if (i > 0)
					vGems = gem.parseNeighbours(true, -1);
				if (j > 0)
					hGems = gem.parseNeighbours(false, -1);
			}while (vGems.length >= 2 || hGems.length >= 2);

			gem.addEventListener('click', Game.onGemClick, false);	// We add the mouse event listener
			gem.pop(grid);
			vGems = [];
			hGems = [];
		};
	};

	// We choose a random background
	do {
		bg = Math.floor(1 + Math.random() * 3);
	} while (bg === Game.background);
	Game.background = bg;
	// We check if there is at least one possible move
	Game.checkGameOver();

	// If the player leaves the page, we stop the timer to display the hint after 15 seconds
	window.onblur = function(){
		Game.pauseHint();
	}

	// When he returns on the page, we resume the hint timer
	window.onfocus = function(){
		Game.resumeHint();
	}
};

/**
 * Removes all the items from the grid
 */
Game.emptyGrid = function() {
	var items = get('.item'), grid = get('#grid');
	for (var i = 0; i < items.length; i++) {
		grid.removeChild(items[i]);
	};
}
