//import dependecies
var express = require('express');
var app = express();

//use public folder to serve static content
app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

//listen on port 3000 and spin up io server
var server = app.listen(3000);
var io = require('socket.io').listen(server);

//sockets here...
var connections = [];
var gameState = {
  clicks: []
};

io.sockets.on('connection', function(socket) {

  var handleDisconnect = function() {
    console.log('Disconnecting...', socket.id);
    connections.splice(connections.indexOf(socket), 1);
    gameState.clicks = [];
    socket.disconnect();
  };

  var handleClick = function(payload) {
    gameState.clicks.push(payload);
    io.sockets.emit('update', gameState);
  }

  var handleMove = function(payload) {
    console.log(payload);
  }

  var handleWall = function(payload) {
    console.log(payload);
  }

  socket.once('disconnect', handleDisconnect);
  socket.on('click', handleClick);
  socket.on('move', handleMove);
  socket.on('wall', handleWall);

  //add socket to connections array
  connections.push(socket);
  //log incoming socket id
  console.log("Connected: ", socket.id);
});

console.log("game server is running at 'http://localhost:3000'");