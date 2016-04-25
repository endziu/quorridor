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
  players: [],
  walls: [],
  moves: [],
  turn: "white"
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
    console.log('MOVE: ', payload);
    gameState.moves.push(payload);
    io.sockets.emit('update', gameState);
  });

  socket.on('wall', function(payload) {
    console.log('WALL: ', payload);
    gameState.walls.push(payload);
    io.sockets.emit('update', gameState); 

  });

  //add socket to connections array
  connections.push(socket);
  //log incoming socket id
  console.log("Connected: ", socket.id);
  io.sockets.emit('update', gameState);
});

console.log("game server is running @ 'http://localhost:3000'");