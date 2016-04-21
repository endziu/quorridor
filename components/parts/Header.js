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
        <div>
          <h1>quorridor</h1>
        </div>
        <div>
          <span id="connection-status" className={this.props.status}></span>
        </div>
      </header>
    );
  }

});

module.exports = Header;
