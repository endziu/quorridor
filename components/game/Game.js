var React = require('react');
var Board = require('./Board');
var Player = require('./Player');
var Wall = require('./Wall');

var Game = React.createClass({

  render() {
    return (
      <canvas id='canvas' className='game' />
    );
  },

  componentDidMount() {
    this.prepareCanvas();
    this.gameSize = { x: this._canvas.width, y: this._canvas.height };
    this.bodies = [
      new Board(), 
      new Player('white', {x: 4, y: 8}),
      new Player('black', {x: 4, y: 0})
    ];
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
    var self = this;
    var s = newState || this.props;    
  },
  
  mouseUpListener() {
    var self = this;
    this._canvas.addEventListener('mouseup', function(e) {

      var gameRect = self._canvas.getBoundingClientRect();
      var clickPos = {
        x: e.clientX - gameRect.left,
        y: e.clientY - gameRect.top
      };

      if (e.which === 1) {
        self.props.emit('click', {pos: clickPos, button: "LEFT"});
      } else if (e.which === 3) {
        self.props.emit('click', {pos: clickPos, button: "RIGHT"});
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

  move(team, dir) {
    console.log('moving: ',team, dir);
    this.props.emit('move', {team:team, dir:dir});
  },

  placeWall(team,type,pos) {
    console.log('placing wall: ', type, pos);
    this.props.emit('wall', {team:team, type: type, pos: pos});
  },

});

module.exports = Game;