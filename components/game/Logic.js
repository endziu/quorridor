module.exports = {
  isWallValid: (wall, state) => {
    return state.walls.filter((w) => {
      if (wall.type === "horizontal" && w.type === "vertical") {
        return  (w.pos.y === wall.pos.y &&
                (w.pos.x === wall.pos.x));
      } else if (wall.type === "vertical" && w.type === "horizontal") {
         return (w.pos.x === wall.pos.x &&
                (w.pos.y === wall.pos.y));
      } else if (wall.type === w.type && wall.type === "horizontal") {
         return ((w.pos.y === wall.pos.y && w.pos.x === wall.pos.x) ||
                (w.pos.y === wall.pos.y && w.pos.x - wall.pos.x === 1) ||
                (w.pos.y === wall.pos.y && w.pos.x - wall.pos.x === -1));
      } else if (wall.type === w.type && wall.type === "vertical") {
         return ((w.pos.x === wall.pos.x && w.pos.y === wall.pos.y) ||
                (w.pos.x === wall.pos.x && w.pos.y - wall.pos.y === 1) ||
                (w.pos.x === wall.pos.x && w.pos.y - wall.pos.y === -1));
      }
    }).length === 0;
  },
  isMoveValid: (move, state) => {
    // body...
    return true;
  }
};
