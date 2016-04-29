const isPosEqual = (w1,w2) =>  w1.pos.x === w2.pos.x  && w1.pos.y === w2.pos.y
const isDiffType = (w1,w2) =>  w1.type  !== w2.type
const overlapH   = (w1,w2) => (w1.pos.y === w2.pos.y) && (w1.pos.x - w2.pos.x ===  1 || w1.pos.x - w2.pos.x === -1)
const overlapV   = (w1,w2) => (w1.pos.x === w2.pos.x) && (w1.pos.y - w2.pos.y ===  1 || w1.pos.y - w2.pos.y === -1)

module.exports = {
  isWallValid: (wall, state) => {
    const blockingWalls = (w) => {
      if (isDiffType(w, wall)) {
        return isPosEqual(w, wall)
      } else {
        if (wall.type === "horizontal") {
          return isPosEqual(w,wall) || overlapH(w,wall)
        } else if (wall.type === "vertical") {
          return isPosEqual(w,wall) || overlapV(w,wall)
        }
      }
    }
    return state.walls.filter(blockingWalls).length === 0
  },
  isMoveValid: (move, state) => {
    //console.log(state)
    return false
  }
}
