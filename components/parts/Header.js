var React = require('react');

var Header = React.createClass({

  getDefaultProps() {
    return {
      status: 'disconnected'
    }
  },

  render() {
    return (
      <header>
        <h1>quorridor</h1>
        <span id="connection-status" className={this.props.status}></span>
      </header>
    );
  }

});

module.exports = Header;
