var React = require('react');
var Board = require('./Board');
var Game = React.createClass({

  render() {
    return (
      <canvas id='canvas' className='game' />
    );
  },

  componentDidMount() {
    this.prepareCanvas();
    this.gameSize = { x: this._canvas.width, y: this._canvas.height };
    this.bodies = [new Board()];
    this.syncGameState();
    this.mouseUpListener();
    this.loop();
  },

  prepareCanvas() {
    this._canvas = document.getElementById('canvas');
    this._context = this._canvas.getContext('2d');
    this._canvas.setAttribute('height', 720);
    this._canvas.setAttribute('width', 720);
    this._canvas.oncontextmenu = function (e) {
      e.preventDefault();
    };    
  },

  syncGameState(state) {
    var self = this;
    var s = state || this.props;
  },
  
  mouseUpListener() {
    this._canvas.addEventListener('mouseup', function(e) {
      console.log(e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop);
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
  }

});

module.exports = Game;