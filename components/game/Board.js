const Board = function() {
  this.gameSize = {x:9, y:9};
  this.fieldOffset = 10;
  this.wallOffset = 80;
  this.gridSize = 80;
  this.fieldCoords = [];
  this.wallCoords = [];
  this.fieldSize = 70;
} 

Board.prototype = {
  init: function() {
    for (var i = 0; i < this.gameSize.x; i++) {
      for (var j = 0; j< this.gameSize.y; j++) {
        var x = i * this.gridSize + this.fieldOffset;
        var y = j * this.gridSize + this.fieldOffset;
        this.fieldCoords.push({
          x: x,
          y: y,
          id: {x:i+1, y:j+1}
        });
      }
    }

    for (var i = 0; i < this.gameSize.x -1; i++) {
      for (var j = 0; j< this.gameSize.y -1; j++) {
        var x1 = i * this.gridSize + this.wallOffset;
        var y1 = j * this.gridSize + this.wallOffset;
        this.wallCoords.push({
          x: x1,
          y: y1,
          id: {x:i+1, y:j+1}
        });
      }
    }
  },

  draw: function(ctx) {
    //player grid
    this.fieldCoords.map((coord) => {
        ctx.fillStyle = "#aaa"; //grey
        ctx.fillRect(coord.x, coord.y, this.fieldSize, this.fieldSize);
    });
    //wall grid
    this.wallCoords.map((coord) => {
      ctx.fillStyle = "rgba(42,165,42,0.45)"; // transparent green
      ctx.fillRect(coord.x,coord.y,10,10);
    });
  }
}

module.exports = Board;
