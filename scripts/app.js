define(['jquery'], function($) {
    
	var myClick = function() {
	    var $elem = $(this);
	    if (self.selectedItem != null) {
            self.selectedItem.removeClass('selected');
            self._swap(self.selectedItem, $elem);
            self.selectedItem = null;
        } else {
            self.selectedItem = $elem.addClass('selected');
        }
    };
	
    allDeleted = 0;

    $('#btnHint').click(function(){
    	var firstX,firstY,lastX,lastY;
    	var hints = [];
    	for (var i = 1; i < 6; i++) {
    		for (var j = 1; j < 6; j++) {
    			var curIndex = Math.floor(field[i][j]/10);
    			var xAIndex = Math.floor(field[i+1][j]/10);
    			var yAIndex = Math.floor(field[i][j+1]/10);
    			if(curIndex == xAIndex)
    			{
    				if(curIndex == Math.floor(field[i+2][j+1]/10))
    				{
    					firstX = i+2;
    					firstY = j+1;
    					lastX = i+2;
    					lastY = j;
    					var arr = []; arr.push(firstX,firstY,lastX,lastY);
    					hints.push(arr);
    				}
    				else if(curIndex == Math.floor(field[i+2][j-1]/10))
    				{
    					firstX = i+2;
    					firstY = j-1;
    					lastX = i+2;
    					lastY = j;
    					var arr = []; arr.push(firstX,firstY,lastX,lastY);
    					hints.push(arr);
    				}
    				else if(curIndex == Math.floor(field[i-1][j+1]/10))
    				{
    					firstX = i-1;
    					firstY = j+1;
    					lastX = i-1;
    					lastY = j;
    					var arr = []; arr.push(firstX,firstY,lastX,lastY);
    					hints.push(arr);
    				}
    				else if(curIndex == Math.floor(field[i-1][j-1]/10))
    				{
    					firstX = i-1;
    					firstY = j-1;
    					lastX = i-1;
    					lastY = j;
    					var arr = []; arr.push(firstX,firstY,lastX,lastY);
    					hints.push(arr);
    				}
    			}
    			else if(curIndex == yAIndex)
    			{
    				if(curIndex == Math.floor(field[i+1][j+2]/10))
    				{
    					firstX = i+1;
    					firstY = j+2;
    					lastX = i;
    					lastY = j+2;
    					var arr = []; arr.push(firstX,firstY,lastX,lastY);
    					hints.push(arr);
    				}
    				else if(curIndex == Math.floor(field[i-1][j+2]/10))
    				{
    					firstX = i-1;
    					firstY = j+2;
    					lastX = i;
    					lastY = j+2;
    					var arr = []; arr.push(firstX,firstY,lastX,lastY);
    					hints.push(arr);
    				}
    				if(curIndex == Math.floor(field[i+1][j-1]/10))
    				{
    					firstX = i+1;
    					firstY = j-1;
    					lastX = i;
    					lastY = j-1;
    					var arr = []; arr.push(firstX,firstY,lastX,lastY);
    					hints.push(arr);
    				}
    				else if(curIndex == Math.floor(field[i-1][j-1]/10))
    				{
    					firstX = i-1;
    					firstY = j-1;
    					lastX = i;
    					lastY = j-1;
    					var arr = []; arr.push(firstX,firstY,lastX,lastY);
    					hints.push(arr);
    				}
    			}
     		}
    	}
    	console.log(hints);
    	if(hints.length>0)
    	{
    		x1 = hints[0][0];
    		y1 = hints[0][1];
    		x2 = hints[0][2];
    		y2 = hints[0][3];
    		console.log(x1,y1,x2,y2);
    		for(var i = 0 ; i < 3 ; i++){
    			$('#xy' + x1 + y1).animate({ opacity:0.2 }, 500);
	    		$('#xy' + x1 + y1).animate({ opacity:1 }, 500);
	    		$('#xy' + x2 + y2).animate({ opacity:0.2 }, 500);
	    		$('#xy' + x2 + y2).animate({ opacity:1 }, 500);
    		}
    	}
    });

    $('#btnShuttle').click(function(){
    	$('div').remove('.item');
	    for (var x = 0; x < 8; x++) {
            field[x] = new Array(8);
            for (var y = 0; y < 8; y++) {
                field[x][y] = Math.ceil(Math.random() * 7)*10;
                self._addPiece(x, y, field[x][y]);
            }
        }
    	self._processField();
    });

    return {

	 	init: function() {

	 		field = null;
    		selectedItem = null;
    		points = 0;

	        self = this;

	        field = new Array(8);
	        for (var x = 0; x < 8; x++) {
	            field[x] = new Array(8);
	            for (var y = 0; y < 8; y++) {
	                field[x][y] = Math.ceil(Math.random() * 7)*10;
	                self._addPiece(x, y, field[x][y]);
	            }
	        }
	        console.log(field);
	    	self._processField();
        },

	    _swap: function(elem1, elem2, cancelProcessing) {

	        var tmp;

	        var coords1 = self._getCoords(elem1);
	        var coords2 = self._getCoords(elem2);

	        if ((coords1.x == coords2.x && Math.abs(coords1.y - coords2.y) == 1) || (coords1.y == coords2.y && Math.abs(coords1.x - coords2.x) == 1)) {

	            var p1 = elem1.position();
	            var p2 = elem2.position();

	            $('#xy' + coords1.x + coords1.y).animate({ top: p2.top, left: p2.left }, 300);
	            $('#xy' + coords2.x + coords2.y).animate({ top: p1.top, left: p1.left }, 300, function() {
	                if (!cancelProcessing) {
	                    self._processField(elem1, elem2);
	                }
	            });

	            tmp = field[coords1.x][coords1.y];
	            field[coords1.x][coords1.y] = field[coords2.x][coords2.y];
	            field[coords2.x][coords2.y] = tmp;

	            tmp = elem1.attr('id');
	            elem1.attr('id', elem2.attr('id'));
	            elem2.attr('id', tmp);
	        }
	    },

	    _addPiece: function(x, y, type, top) {
	        var div = $('<div class="item"><div>');
	        top = top ? (-1 - 2 * top) * 64 : y * 64;
	        div.css({ top: top + 'px', left: (x * 64) + 'px', backgroundImage: 'url("img/' + type + '.jpg")' });
	        div.addClass('x' + x).addClass('y' + y).attr('id', ('xy' + x) + y).appendTo('#field');
            div.on("click", myClick);
	        return div;
	    },

	    _hasMove: function() {
	        var x, y, value;
	        for (x = 0; x < 8; x++) {
	            for (y = 0; y < 8; y++) {
	                if (y > 0 && y < 7 && field[x][y - 1] == field[x][y + 1]) {
	                    value = field[x][y - 1];
	                    if ((x > 0 && field[x - 1][y] == value) || (x < 7 && field[x + 1][y] == value)) {
	                        return true;
	                    }
	                }
	                if (x > 0 && x < 7 && field[x + 1][y] == field[x - 1][y]) {
	                    value = field[x - 1][y];
	                    if ((y > 0 && field[x][y - 1] == value) || (y < 7 && field[x][y + 1] == value)) {
	                        return true;
	                    }
	                }
	            }
	        }
	        return false;
	    },
	    
	    _processField: function(elem1, elem2) {

	        var tmp = [];
	        var x, y;
	        var extraBonus = 0;
	        for (x = 0; x < 8; x++) {
	            tmp[x] = [];
	            for (y = 0; y < 8; y++) {
	                tmp[x][y] = 0;
	            }
	        }

	        for (x = 0; x < 8; x++) {
	            for (y = 0; y < 8; y++) {
	            	if(field[x][y]%10 == 1)//bomb
	            	{
	            		if(x>0 && y>0)  tmp[x-1][y-1] = 1;
	            		if(x>0)			tmp[x-1][y] = 1;
	            		if(x>0 && y<7)	tmp[x-1][y+1] = 1;
	            		if(y>0)			tmp[x][y-1] = 1;
	            						tmp[x][y] = 1;
	            		if(y<7)			tmp[x][y+1] = 1;
	            		if(x<7 && y>0)	tmp[x+1][y-1] = 1;
	            		if(x<7)			tmp[x+1][y] = 1;
	            		if(x<7 && y<7)	tmp[x+1][y+1] = 1;
	            	}
	                else
	                {
		               	if (y > 0 && y < 7 && parseInt(field[x][y]/10) == parseInt(field[x][y - 1]/10) && parseInt(field[x][y]/10) == parseInt(field[x][y + 1]/10)) {
		                    tmp[x][y] = 1;
		                    tmp[x][y - 1] = 1;
		                    tmp[x][y + 1] = 1;
		                    if(field[x][y]%10 == 2)//bonus
	            				extraBonus += 3;
	            			if(field[x][y-1]%10 == 2)//bonus
	            				extraBonus += 3;
	            			if(field[x][y+1]%10 == 2)//bonus
	            				extraBonus += 3;
		                }
		                if (x > 0 && x < 7 && parseInt(field[x][y]/10) == parseInt(field[x - 1][y]/10) && parseInt(field[x][y]/10) == parseInt(field[x + 1][y]/10)) {
		                    tmp[x][y] = 1;
		                    tmp[x - 1][y] = 1;
		                    tmp[x + 1][y] = 1;
		                    if(field[x][y]%10 == 2)//bonus
	            				extraBonus += 3;
	            			if(field[x-1][y]%10 == 2)//bonus
	            				extraBonus += 3;
	            			if(field[x+1][y]%10 == 2)//bonus
	            				extraBonus += 3;
		                }
		            }
	            }
	        }

	        var deleted = 0;
	        allDeleted = 0;
	        var arr = [];
	        for (x = 0; x < 8; x++) {
	            for (y = 0; y < 8; y++) {
	                if (tmp[x][y] == 1) {
	                	var arr_tmp = [];
	                	arr_tmp.push(x);
	                	arr_tmp.push(y);
	                	arr.push(arr_tmp);

	                    field[x][y] = 0;
	                    $(('#xy' + x) + y).addClass('remove');
	                    deleted++;
	                }
	            }
	        }
	        $('.remove').animate({ opacity: 0 }, 500, function() {
	            $('.remove').remove();
	        });

	        if (deleted > 0) {
	        	allDeleted = deleted;
	            points += deleted + extraBonus;
	            if(points>nLevel*500 && nGameMode == 3){
	            	nLevel++;
	            	points = 0;
	            	$('#gameState').html("Untimed-><br>Level Mode<br>Level "+nLevel+" : "+nLevel*500);
	            }
	            $('#points').html('Your Score<br>'+points);
	            setTimeout('self._caving()', 500);
	        }

	        else if (elem1 && elem2) {
	            self._swap(elem1, elem2, true);
	        }
	    },

	    _caving: function() {

	        var x, y, yfull, deleted, delay = 0;

	        for (x = 0; x < 8; x++) {
	            yfull = 7;
	            deleted = 0;
	            for (y = 7; y >= 0; y--) {
	                while (field[x][y] == 0 && y >= 0) {
	                    deleted++;
	                    y--;
	                }
	                if (yfull != y) {
	                    var d = yfull - y;
	                    delay = Math.max(delay, d * 150);
	                    $(('#xy' + x) + y).animate({ top: '+=' + (64 * d) }, d * 150).attr('id', ('xy' + x) + yfull);
	                    field[x][yfull] = field[x][y];
	                }
	                yfull--;
	            }
	            console.log(allDeleted);
	            if(allDeleted == 5)
	            {
	            	type = Math.ceil(Math.random() * 7)*10+1;
	                field[x][deleted - 1] = type;
	                self._addPiece(x, deleted - 1, type, 1).animate({ top: '+=' + ((deleted + 2) * 64) }, 150 * (deleted + 2));
	                delay = Math.max(delay, 150 * (deleted + 2));

	            	for (var i = 2 ; i <= deleted; i++) {
		                type = Math.ceil(Math.random() * 7)*10;
		                field[x][deleted - i] = type;
		                self._addPiece(x, deleted - i, type, i).animate({ top: '+=' + ((deleted + i + 1) * 64) }, 150 * (deleted + i + 1));
		                delay = Math.max(delay, 150 * (deleted + i + 1));
		            }
	            }

	            else if(allDeleted == 4)
	            {
	            	type = Math.ceil(Math.random() * 7)*10+2;
	                field[x][deleted - 1] = type;
	                self._addPiece(x, deleted - 1, type, 1).animate({ top: '+=' + ((deleted + 2) * 64) }, 150 * (deleted + 2));
	                delay = Math.max(delay, 150 * (deleted + 2));

	            	for (var i = 2 ; i <= deleted; i++) {
		                type = Math.ceil(Math.random() * 7)*10;
		                field[x][deleted - i] = type;
		                self._addPiece(x, deleted - i, type, i).animate({ top: '+=' + ((deleted + i + 1) * 64) }, 150 * (deleted + i + 1));
		                delay = Math.max(delay, 150 * (deleted + i + 1));
		            }
	            }

	            else{
	            	for (var i = 1 ; i <= deleted; i++) {
		                type = Math.ceil(Math.random() * 7)*10;
		                field[x][deleted - i] = type;
		                self._addPiece(x, deleted - i, type, i).animate({ top: '+=' + ((deleted + i + 1) * 64) }, 150 * (deleted + i + 1));
		                delay = Math.max(delay, 150 * (deleted + i + 1));
		            }
		        }
	        }

	        setTimeout('self._processField()', delay);
	    },

	    _getCoords: function(elem) {
	        var id = elem.attr('id');
	        return { x: parseInt(id.charAt(2)), y: parseInt(id.charAt(3)) };
	    },

	    _debug: function() {
	        var x, y, str = '';
	        for (y = 0; y < 8; y++) {
	            for (x = 0; x < 8; x++) {
	                str += field[x][y];
	            }
	            str += "\n";
	        }
	        console.log(str);
	    }
	}
});
