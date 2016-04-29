const React = require('react');
const io = require('socket.io-client');
const Header = require('./parts/Header');
const Game = require('./game/Game');

class APP extends React.Component {

  constructor() {
    super();
    this.state = {
      status: 'disconnected',
      error: '',
      currentUser: 'none',
      currentTeam: 'none',
      turn: 'none',
      players: [{team:'white', pos:{x:5, y: 9}}, {team:'black', pos:{x:5, y: 1}}],
      walls: [],
      moves: []
    };
    this.emit = this.emit.bind(this);
  }

  componentWillMount() {
    this.socket = io('localhost:3000');
    this.socket.on('connect',        () => this.setState({ status: 'connected' }));
    this.socket.on('disconnect',     () => this.setState({ status: 'disconnected' }));
    this.socket.on('error',       (err) => this.setState({ error: err.mess }));
    this.socket.on('update', (newState) => {
      this.setState({ error: '' });
      this.setState({...newState});
    });
  }

  emit(eventName, payload){
    this.socket.emit(eventName, payload);
  }

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
}

module.exports = APP;
