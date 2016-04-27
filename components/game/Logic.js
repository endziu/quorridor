// (Wall, Wall) => bool;        
const overlapH = (w1,w2) => (w1.pos.y === w2.pos.y) && (w1.pos.x - w2.pos.x ===  1 || w1.pos.x - w2.pos.x === -1);
const overlapV = (w1,w2) => (w1.pos.x === w2.pos.x) && (w1.pos.y - w2.pos.y ===  1 || w1.pos.y - w2.pos.y === -1);
const isPosEqual = (w1,w2) => w1.pos.x === w2.pos.x && w1.pos.y === w2.pos.y;
const isDiffType = (w1,w2) => w1.type  !== w2.type;
const isSameType = (w1,w2) => w1.type  === w2.type;

module.exports = {
  // (Wall, GameState) => bool;
  isWallValid: (wall, state) => {
    // (Wall) => bool;
    const blockingWalls = (w) => {
      if (isDiffType(w, wall)) {
        return isPosEqual(w, wall);
      } else if (isSameType(w, wall)) {
        if (wall.type === "horizontal") {
          return overlapH(w,wall);
        } else if (wall.type === "vertical") {
          return overlapV(w,wall);
        }
      } 
    }
    return state.walls.filter(blockingWalls).length === 0;
  },
  isMoveValid: (move, state) => {
    // body...
    return true;
  }
};