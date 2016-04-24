var Wall = function(type,pos) {
  this.type = type;
  this.pos = pos;
};

Wall.prototype = {
  update: function(){
    //nothing atm...
  },
  draw: function(screen) {
    var offset = 5; // half of the space between squares
    var width = 80;
    if(this.type === "horizontal") {
      screen.fillStyle = "#641";
      screen.fillRect(this.pos.x*width+offset,this.pos.y*width-offset,150,10);
    }
    if(this.type === "vertical") {
      screen.fillStyle = "#641";
      screen.fillRect(this.pos.x*width-offset,this.pos.y*width+offset,10,150);
    }
  },
  getWall: function() {
    if(this.type === "vertical"){
      return {
        pos: {x: this.pos.x, y: this.pos.y + 1},
        type: this.type
      };
    } else if (this.type === "horizontal") {
      return {
        pos: {x: this.pos.x + 1, y: this.pos.y},
        type: this.type
      };
    } else {
      return false;
    }
  }
};

module.exports = Wall;