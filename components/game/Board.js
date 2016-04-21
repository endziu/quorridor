var Board = function() {
  this.gameSize = {x:9, y:9};
  this.offset = 5;
  this.gridSize = 80;
  this.fieldSize = 70;
} 

Board.prototype =  {
  draw: function(ctx) {
    for (var i = 0; i < this.gameSize.x; i++) {
      for (var j = 0; j< this.gameSize.y; j++) {
        var x = i * this.gridSize + this.offset;
        var y = j * this.gridSize + this.offset;
        ctx.fillStyle = "#aaa";
        ctx.fillRect(x, y, this.fieldSize, this.fieldSize);
      }
    }
  }
}

module.exports = Board;