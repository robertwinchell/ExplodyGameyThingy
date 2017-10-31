// Bonus related functions

/**
 * Adds a bonus item : the bomb
 */
Game.winBomb = function() {
	if (Game.bonus.bomb) {
		return;
	}
	// We randomly place a bomb
	var bomb = new Game.Bomb(),
		x = 0,
		y = 0,
		itemToReplace;

	Game.bonus.bomb = bomb;
	do {
		x = parseInt(Math.random() * Game.GRID_SIZE);
		y = parseInt(Math.random() * Game.GRID_SIZE);
	}while (get('#tile' + y + '_' + x) == null || get('#tile' + y + '_' + x).timer != undefined);
	Game.winBomb(x+1, y+1);
	bomb.style.left = ((Game.GEM_WIDTH * x) + (5 * (x + 1))) + 'px';
	bomb.style.top = ((Game.GEM_HEIGHT * y) + (5 * (y + 1))) + 'px';
	bomb.id = 'tile' + y + '_' + x;
	itemToReplace = get('#tile' + y + '_' + x);
	if (itemToReplace != null && itemToReplace.parentNode) {
		get('#grid').removeChild(itemToReplace);
	}
	get('#grid').appendChild(bomb);
};

Game.winDoubleBomb = function() {
	if (Game.bonus.dbomb) {
		return;
	}
	// We randomly place a bomb
	var dbomb = new Game.DoubleBomb(),
		x = 0,
		y = 0,
		itemToReplace;

	dbomb.active = true;
	Game.bonus.dbomb = dbomb;
	do {
		x = parseInt(Math.random() * Game.GRID_SIZE);
		y = parseInt(Math.random() * Game.GRID_SIZE);
	}while (get('#tile' + y + '_' + x) == null || get('#tile' + y + '_' + x).timer != undefined);
	Game.winDoubleBomb(x+1, y+1);
	dbomb.style.left = ((Game.GEM_WIDTH * x) + (5 * (x + 1))) + 'px';
	dbomb.style.top = ((Game.GEM_HEIGHT * y) + (5 * (y + 1))) + 'px';
	dbomb.id = 'tile' + y + '_' + x;
	itemToReplace = get('#tile' + y + '_' + x);
	if (itemToReplace != null && itemToReplace.parentNode) {
		get('#grid').removeChild(itemToReplace);
	}
	get('#grid').appendChild(dbomb);
};
