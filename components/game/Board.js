var Board = function() {
  this.gameSize = {x:9, y:9};
  this.offset = 5;
  this.fieldSize = 80;
} 

Board.prototype =  {
  draw: function(ctx) {
    for (var i = 0; i < this.gameSize.x; i++) {
      for (var j = 0; j< this.gameSize.y; j++) {
        var x = i * this.fieldSize + this.offset;
        var y = j * this.fieldSize + this.offset;
        var dispX = i + 1;
        var dispY = j + 1;
        ctx.fillStyle = "#aaa";
        ctx.fillRect(x, y, 70, 70);
        // ctx.fillStyle = "#000";
        // ctx.font = "12px serif";
        // ctx.fillText(dispX + "," + dispY, x+50, y+68);
      }
    }
  }
}

module.exports = Board;