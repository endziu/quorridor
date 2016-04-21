var Board = function() {
  this.gameSize = {x:9, y:9};
  this.fieldOffset = 10;
  this.wallOffset = 77.5;
  this.gridSize = 80;
  this.fieldSize = 70;
} 

Board.prototype =  {
  draw: function(ctx) {
    for (var i = 0; i < this.gameSize.x; i++) {
      for (var j = 0; j< this.gameSize.y; j++) {
        var x = i * this.gridSize + this.fieldOffset;
        var y = j * this.gridSize + this.fieldOffset;
        ctx.fillStyle = "#aaa"; //grey
        ctx.fillRect(x, y, this.fieldSize, this.fieldSize);
      }
    }

    for (var i = 0; i < this.gameSize.x -1; i++) {
      for (var j = 0; j< this.gameSize.y -1; j++) {
        var x1 = i * this.gridSize + this.wallOffset;
        var y1 = j * this.gridSize + this.wallOffset;
        ctx.fillStyle = "rgba(165,42,42,0.45)"; // transparent brown
        ctx.fillRect(x1,y1,15,15);
      }
    }

  }
}

module.exports = Board;