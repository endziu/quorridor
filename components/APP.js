var React = require('react');
var io = require('socket.io-client');
var Header = require('./parts/Header');
var Game = require('./game/Game');

var APP = React.createClass({

  getInitialState() {
    return {
      status: 'disconnected'
    }
  },

  componentWillMount() {
    this.socket = io('localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
  },

  emit(eventName, payload){
    this.socket.emit(eventName, payload);
  },

  connect() {
    this.setState({ status: 'connected' });
  },

  disconnect() {
    this.setState({ status: 'disconnected' });
  },

  render() {
    return (
      <div className="container">
        <div className="row">
          <Header className="col-xs-6" status={this.state.status} />
        </div>
        <div className="game-container">
          <Game emit={this.emit} {...this.state} />
        </div>
      </div>
    );
  }
});

module.exports = APP;
