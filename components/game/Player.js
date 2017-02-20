'use strict'

const Player = function (team, pos) {
  this.team = team
  this.pos = pos
  this.numWalls = 8
}

Player.prototype = {
  draw: function (ctx) {
    const offset = 25
    const width = 80
    if (this.team === 'white') {
      ctx.fillStyle = '#fff'
      ctx.fillRect(this.pos.x * width + offset, this.pos.y * width + offset, 40, 40)
    }
    if (this.team === 'black') {
      ctx.fillStyle = '#000'
      ctx.fillRect(this.pos.x * width + offset, this.pos.y * width + offset, 40, 40)
    }
  },

  getPos: function () {
    return this.pos
  }
}

module.exports = Player
