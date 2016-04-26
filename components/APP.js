var React = require('react');
var io = require('socket.io-client');
var Header = require('./parts/Header');
var Game = require('./game/Game');

var APP = React.createClass({

  getInitialState() {
    return{
      status: 'disconnected',
      error: '',
      currentUser: 'none',
      currentTeam: 'none',
      turn: 'none',
      walls: [],
      moves: []
    }
  },

  componentWillMount() {
    this.socket = io('localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('play', this.play);
    this.socket.on('stop', this.stop);
    this.socket.on('error', this.error);
    this.socket.on('update', this.update);
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

  error(err) {
    this.setState({ error: err.mess });
  },

  update(newState) {
    this.setState({ error: '' });
    this.setState({...newState});
  },

  render() {
    return (
      <div>
        <Header {...this.state} />
        <div className="game-container">
          <Game emit={this.emit} {...this.state} />
        </div>
      </div>
    );
  }
});

module.exports = APP;
