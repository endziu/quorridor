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
    this._canvas.setAttribute('height', 730);
    this._canvas.setAttribute('width', 730);
    this._canvas.oncontextmenu = function (e) {
      e.preventDefault();
    };    
  },

  syncGameState(state) {
    var self = this;
    var s = state || this.props;
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
        console.log('LEFT-CLICK: ',clickPos.x, clickPos.y);
      } else if (e.which ===3) {
        console.log('RIGHT-CLICK: ',clickPos.x, clickPos.y);
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
  }

});

module.exports = Game;