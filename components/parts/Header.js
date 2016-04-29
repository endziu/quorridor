var React = require('react');

class Header extends React.Component{

  render() {
    return (
      <div className="header">
        <span id="connection-status" className={this.props.status}></span>
        <h2 className="title">a game...</h2>
        <p className="info">{this.props.error} | User: {this.props.currentUser} | Team: {this.props.currentTeam} | Turn: {this.props.turn} |</p>
      </div>
    );
  }

};

Header.defaultProps = {
  status: 'disconnected',
  error: '',
  currentUser: 'none',
  currentTeam: 'none',
  turn: 'none'
};

module.exports = Header;
