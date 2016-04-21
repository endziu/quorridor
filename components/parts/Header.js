var React = require('react');

var Header = React.createClass({

  getDefaultProps() {
    return {
      status: 'disconnected',
      currentUser: 'none',
      currentTeam: 'none',
      turn: 'white'
    }
  },

  render() {
    return (
      <div className="header">
        <span id="connection-status" className={this.props.status}></span>
        <h2 className="title">a game...</h2>
        <p className="info">User: {this.props.currentUser} | Team: {this.props.currentTeam} | Turn: {this.props.turn}</p>
      </div>
    );
  }

});

module.exports = Header;
