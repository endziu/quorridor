var React = require('react');
var APP = require('./components/APP');

var Temp = React.createClass({
  render(){
    return(
      <div>
        <h1> hello from react </h1>
      </div>
    )
  }
});

React.render(<APP />, document.getElementById('react-container'));
