module.exports = {
  isWallValid: (wall, state) => {
    const noWallAtPos = (pos,type) => {
      return state.walls.filter((w) => {
        if (type === "horizontal" && w.type === "vertical") {
          return (w.pos.y === pos.y &&
                 (w.pos.x === pos.x));
        } else if (type === "vertical" && w.type === "horizontal") {
           return (w.pos.x === pos.x &&
                  (w.pos.y === pos.y));
        } else if (type === w.type && type === "horizontal") {
           return ((w.pos.y === pos.y && w.pos.x === pos.x) ||
                  (w.pos.y === pos.y && w.pos.x - pos.x === 1) ||
                  (w.pos.y === pos.y && w.pos.x - pos.x === -1));
        } else if (type === w.type && type === "vertical") {
           return ((w.pos.x === pos.x && w.pos.y === pos.y) ||
                  (w.pos.x === pos.x && w.pos.y - pos.y === 1) ||
                  (w.pos.x === pos.x && w.pos.y - pos.y === -1));
        }
      }).length === 0;
    }
    return noWallAtPos(wall.pos,wall.type);
  },
  isMoveValid: (move, state) => {
    // body...
    return true;
  }
};
