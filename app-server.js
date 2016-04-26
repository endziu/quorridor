//import dependecies
var express = require('express');
var app = express();
var isInArray = require('./components/utils/isInArray');

//use public folder to serve static content
app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

//listen on port 3000 and spin up io server
var server = app.listen(3000);
var io = require('socket.io').listen(server);

//sockets here...
var connections = [];
//  ........
var gameState = {
  audience: [],
  players: [{team: 'white', pos:{x:4, y:8}}],
  walls: [],
  moves: [],
  turn: "white"
};

var isMoveValid = function(move, state) {
  return true;
};

var isWallValid = function(wall, state) {
  return true;
};


io.sockets.on('connection', function(socket) {

  socket.once('disconnect', function(){
    console.log('Disconnecting...', socket.id);
    connections.splice(connections.indexOf(socket), 1);
    gameState.walls = [];
    gameState.moves = [];
    io.sockets.emit('update', gameState);
    socket.disconnect();
  });

  socket.on('move', function(payload) {
    console.log('MOVE REQUEST: ', payload);
    if(isMoveValid(payload, gameState)) {
      gameState.moves.push(payload);
      io.sockets.emit('update', gameState);  
    } else {
      console.log('invalid move!');
      io.sockets.emit('error', {mess: "invalid move"});
    }
  });

  socket.on('wall', function(payload) {
    console.log('WALL REQUEST: ', payload);
    if(isWallValid(payload, gameState)) {
      gameState.walls.push(payload);
      io.sockets.emit('update', gameState);  
    } else {
      io.sockets.emit('error', {mess: "you can't place a wall here"});
    }
  });

  //add socket to connections array
  connections.push(socket);
  //log incoming socket id
  console.log("Connected: ", socket.id);
  //update game state
  io.sockets.emit('update', gameState);
});

console.log("game server is running @ 'http://localhost:3000'");