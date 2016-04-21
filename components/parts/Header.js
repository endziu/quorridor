var React = require('react');

var Header = React.createClass({

  getDefaultProps() {
    return {
      status: 'disconnected'
    }
  },

  render() {
    return (
      <div className="header">
        <span id="connection-status" className={this.props.status}></span>
        <h1 className="title">a game...</h1>
      </div>
    );
  }

});

module.exports = Header;
