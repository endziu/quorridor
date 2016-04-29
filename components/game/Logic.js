const isPosEqual = (w1,w2) =>  w1.pos.x === w2.pos.x  && w1.pos.y === w2.pos.y;
const isDiffType = (w1,w2) =>  w1.type  !== w2.type;
const overlapH   = (w1,w2) => (w1.pos.y === w2.pos.y) && (w1.pos.x - w2.pos.x ===  1 || w1.pos.x - w2.pos.x === -1);
const overlapV   = (w1,w2) => (w1.pos.x === w2.pos.x) && (w1.pos.y - w2.pos.y ===  1 || w1.pos.y - w2.pos.y === -1);

module.exports = {
  isWallValid: (wall, state) => {
    const blockingWalls = (w) => {
      if (isDiffType(w, wall)) {
        return isPosEqual(w, wall);
      } else {
        if (wall.type === "horizontal") {
          return isPosEqual(w,wall) || overlapH(w,wall);
        } else if (wall.type === "vertical") {
          return isPosEqual(w,wall) || overlapV(w,wall);
        }
      }
    }
    return state.walls.filter(blockingWalls).length === 0;
  },
  isMoveValid: (move, state) => {
    // body...
    return false;
  }
};


/*
noWallsOnPath(player, dir) {
  if (player.team === "white") {
    switch(dir) {
      case "forward":
        return this.getWalls().filter(function(wall) {
          return wall.type === "horizontal" &&
            (wall.pos.x === player.getPlayer().pos.x || wall.pos.x === player.getPlayer().pos.x - 1) &&
             wall.pos.y === player.getPlayer().pos.y - 1;
        }).length === 0;
      case "back":
        return this.getWalls().filter(function(wall) {
          return wall.type === "horizontal" &&
            (wall.pos.x === player.getPlayer().pos.x || wall.pos.x === player.getPlayer().pos.x - 1) &&
            wall.pos.y === player.getPlayer().pos.y;
        }).length === 0;
      case "left":
        return this.getWalls().filter(function(wall) {
          return wall.type === "vertical"   &&
            (wall.pos.y === player.getPlayer().pos.y || wall.pos.y === player.getPlayer().pos.y - 1) &&
             wall.pos.x === player.getPlayer().pos.x - 1;
        }).length === 0;
      case "right":
        return this.getWalls().filter(function(wall) {
          return wall.type === "vertical"   &&
            (wall.pos.y === player.getPlayer().pos.y || wall.pos.y === player.getPlayer().pos.y - 1) &&
            wall.pos.x === player.getPlayer().pos.x;
        }).length === 0;
      default:
        break;
    }
  } else if (player.team === "black") {
    switch(dir) {
      case "forward":
        return this.getWalls().filter(function(wall) {
          return wall.type === "horizontal" &&
            (wall.pos.x === player.getPlayer().pos.x || wall.pos.x === player.getPlayer().pos.x - 1) &&
             wall.pos.y === player.getPlayer().pos.y;
        }).length === 0;
      case "back":
        return this.getWalls().filter(function(wall) {
          return wall.type === "horizontal" &&
            (wall.pos.x === player.getPlayer().pos.x || wall.pos.x === player.getPlayer().pos.x - 1) &&
             wall.pos.y === player.getPlayer().pos.y -1;
        }).length === 0;
      case "left":
        return this.getWalls().filter(function(wall) {
          return wall.type === "vertical"   &&
           (wall.pos.y === player.getPlayer().pos.y || wall.pos.y === player.getPlayer().pos.y - 1) &&
            wall.pos.x === player.getPlayer().pos.x - 1;
        }).length === 0;
      case "right":
        return this.getWalls().filter(function(wall) {
          return wall.type === "vertical"   &&
           (wall.pos.y === player.getPlayer().pos.y || wall.pos.y === player.getPlayer().pos.y - 1) &&
            wall.pos.x === player.getPlayer().pos.x;
         }).length === 0;
      default:
        break;
    }
  }
}
*/