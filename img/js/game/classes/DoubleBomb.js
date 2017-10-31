/**
 * A bonus item for Ore : the Bomb (destoys all the immediatly surrounding gems)
 */
Game.DoubleBomb = function() {
	if (this == window) {
		throw new Error('DoubleBomb() is a constructor, you can only call it with the keyword "new"');
	}
	var dbomb = document.createElement('span');
	Game.addDoubleBombCapabilities(dbomb);

	dbomb.className = 'doublebomb item';
	dbomb.style.backgroundImage = 'url("./images/sprites/bomb_double.png")';
	dbomb.addEventListener('click', dbomb.explode, false);
	dbomb.active = false;
	dbomb.isGem = false;

	return dbomb;
};

Game.addDoubleBombCapabilities = function(dbomb) {
	addItemCapabilities(dbomb);
	/**
	 * Makes the bomb, and the surrounding gems explode
	 */
	dbomb.explode = function(event) {

		if (!dbomb.active)
			return;
		dbomb.active = false;
		var gemsToRemove = [],
			x = dbomb.x(),
			y = dbomb.y(),
			item;

		for (var i = (x > 1 ? x - 2 : (x > 0 ? x - 1 : x)); i <= (x < 6 ? x + 2 : (x < 7 ? x + 1 : x)); i++) {
			gemsToRemove[i] = [];
			for (var j = (y > 1 ? y - 2 : (y > 0 ? y - 1 : y)); j <= (y < 6 ? y + 2 : (y < 7 ? y + 1 : y)); j++) {
				item = get('#tile' + j + '_' + i);
				if (i == x && j == y || item == null || !item.isGem)
					continue;
				gemsToRemove[i].push(item);
			};
		};
		get('#grid').removeChild(dbomb);
		Game.removeStreak(gemsToRemove);
		delete Game.bonus.dbomb;
	};
};