import React from 'react'
import Board from './Board'
import Player from './Player'
import Wall from './Wall'
import inRange from '../utils/inRange'

class Game extends React.Component {

  constructor() {
    super()
    this.loop = this.loop.bind(this)
  }

  componentDidMount() {
    this.prepareCanvas()
    this.gameSize = { x: this._canvas.width, y: this._canvas.height }
    this.board = new Board()
    this.board.init()

    this.p1  = new Player('white', {x: 4, y: 8})
    this.p2 = new Player('black', {x: 4, y: 0})
    this.bodies = [this.board, this.p1, this.p2]

    this.syncGameState()
    this.mouseUpListener()
    this.loop()
  }

  prepareCanvas() {
    this._canvas = document.getElementById('canvas')
    this._context = this._canvas.getContext('2d')
    this._canvas.setAttribute('height', 730)
    this._canvas.setAttribute('width', 730)
    this._canvas.oncontextmenu = function (e) {
      e.preventDefault()
    } 
  }

  syncGameState(newState) {
    const s = newState || this.props
    const wallIndex = s.walls.length -1
    const lastWall = s.walls[wallIndex]
    if(lastWall !== void 0) {
      this.bodies.push(new Wall(lastWall.type, lastWall.pos))  
    }
  }
  
  mouseUpListener() {
    this._canvas.addEventListener('mouseup', (e) => {
      const gameRect = this._canvas.getBoundingClientRect()
      const clickPos = {
        x: e.clientX - gameRect.left,
        y: e.clientY - gameRect.top
      }
      const fieldClick = this.board.fieldCoords.filter((coord) => {
        return (inRange(clickPos.x, coord.x, coord.x + 70) &&
                inRange(clickPos.y, coord.y, coord.y + 70))
      })
      const wallClick = this.board.wallCoords.filter((coord) => {
        return (inRange(clickPos.x, coord.x, coord.x + 10) &&
                inRange(clickPos.y, coord.y, coord.y + 10))
      })
      if(fieldClick.length === 1) {
        this.move(this.props.currentTeam, fieldClick[0].id)
      }
      if(wallClick.length === 1 && e.which === 1) { //left click
        this.placeWall(this.props.currentTeam, 'horizontal', wallClick[0].id)
      } else if (wallClick.length === 1 && e.which === 3) { //right click
        this.placeWall(this.props.currentTeam, 'vertical', wallClick[0].id)
      }
    }, false)
  }

  componentWillUpdate(s) {
    this.syncGameState(s)
  }

  loop() {
    this.draw(this._context)
    window.requestAnimationFrame(this.loop)
  }

  draw(ctx) {
    ctx.clearRect(0,0,this.gameSize.x, this.gameSize.y)
    this.bodies.map((body) => {
      body.draw(ctx)
    })
  }

  move(team, pos) {
    this.props.emit('move', {team:team, pos: pos})
  }

  placeWall(team,type,pos) {
    this.props.emit('wall', {team:team, type: type, pos: pos})
  }

  addBody(body) {
    this.bodies.push(body)
  }

  removeBody(body) {
    return this.bodies.splice(this.bodies.indexOf(body), 1)
  }

  render() {
    return (
      <canvas id='canvas' className='game' />
    )
  }

}

module.exports = Game
