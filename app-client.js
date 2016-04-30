"use strict";
import React from 'react';
import APP from './components/APP';
/*
class Temp extends React.Component{
  render(){
    return(
      <div>
        <h1> hello from react </h1>
      </div>
    )
  }
};
*/
React.render(<APP />, document.getElementById('react-container'));
