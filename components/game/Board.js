var Board = function() {
	this.gameSize = {x:9, y:9};
} 

Board.prototype =  {
	draw: function(ctx) {
		ctx.fillRect(10,10,50,50);
	}
}

module.exports = Board;