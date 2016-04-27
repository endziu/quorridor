var React = require('react');
var Board = require('./Board');
var Player = require('./Player');
var Wall = require('./Wall');
var inRange = require('../utils/inRange');

var Game = React.createClass({

  render() {
    return (
      <canvas id='canvas' className='game' />
    );
  },

  componentDidMount() {
    this.prepareCanvas();
    this.gameSize = { x: this._canvas.width, y: this._canvas.height };
    this.board = new Board();
    this.board.init();

    this.p1  = new Player('white', {x: 4, y: 8});
    this.p2 = new Player('black', {x: 4, y: 0});
    this.bodies = [this.board, this.p1, this.p2];

    this.syncGameState();
    this.mouseUpListener();
    this.loop();
  },

  prepareCanvas() {
    this._canvas = document.getElementById('canvas');
    this._context = this._canvas.getContext('2d');
    this._canvas.setAttribute('height', 730);
    this._canvas.setAttribute('width', 730);
    this._canvas.oncontextmenu = function (e) {
      e.preventDefault();
    };    
  },

  syncGameState(newState) {
    const s = newState || this.props;
    const wallIndex = s.walls.length -1;
    const lastWall = s.walls[wallIndex];
    if(lastWall !== undefined) {
      this.bodies.push(new Wall(lastWall.type, lastWall.pos))  
    }
    
  },
  
  mouseUpListener() {
    var self = this;

    this._canvas.addEventListener('mouseup', function(e) {

      var gameRect = self._canvas.getBoundingClientRect();

      var clickPos = {
        x: e.clientX - gameRect.left,
        y: e.clientY - gameRect.top
      };

      var fieldClick = self.board.fieldCoords.filter(function(coord){
        return (inRange(clickPos.x, coord.x, coord.x + 70) &&
                inRange(clickPos.y, coord.y, coord.y + 70));
      });

      var wallClick = self.board.wallCoords.filter(function(coord){
        return (inRange(clickPos.x, coord.x, coord.x + 10) &&
                inRange(clickPos.y, coord.y, coord.y + 10));
      });

      if(fieldClick.length === 1) {
        self.move(self.props.currentTeam, fieldClick[0].id);
      }
      
      if(wallClick.length === 1 && e.which === 1) { //left click
        self.placeWall(self.props.currentTeam, 'horizontal', wallClick[0].id);
      } else if (wallClick.length === 1 && e.which === 3) { //right click
        self.placeWall(self.props.currentTeam, 'vertical', wallClick[0].id);
      }

    }, false);
  },

  componentWillUpdate(s) {
    this.syncGameState(s);
  },

  loop() {
    this.update();
    this.draw(this._context);
    window.requestAnimationFrame(this.loop);
  },

  update() {
    //update body...
  },

  draw(ctx) {
    ctx.clearRect(0,0,this.gameSize.x, this.gameSize.y);
    this.bodies.map(function(body) {
      body.draw(ctx);
    });
  },

  move(team, pos) {
    this.props.emit('move', {team:team, pos: pos});
  },

  placeWall(team,type,pos) {
    this.props.emit('wall', {team:team, type: type, pos: pos});  
  },

  addBody(body) {
    this.bodies.push(body);
  },

  removeBody(body) {
    return this.bodies.splice(this.bodies.indexOf(body), 1);
  }

});

module.exports = Game;