var Player = function(team,pos) {
  this.team = team;
  this.pos = pos;
  this.numWalls = 8;
};

Player.prototype = {
  update: function() {
    //nothing atm...
  },
  draw: function(ctx){
    var offset = 25;
    var width = 80;
    if(this.team === "white"){
      ctx.fillStyle = "#fff";
      ctx.fillRect(this.pos.x * width + offset, this.pos.y  * width + offset, 40, 40);
    }
    if(this.team === "black"){
      ctx.fillStyle = "#000";
      ctx.fillRect(this.pos.x * width + offset, this.pos.y   * width + offset, 40, 40);
    }
  }
};

module.exports = Player;