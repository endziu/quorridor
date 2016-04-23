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
  walls: [],
  moves: [],
  move: {},
  turn: "white"
};

io.sockets.on('connection', function(socket) {

  var handleDisconnect = function() {
    console.log('Disconnecting...', socket.id);
    connections.splice(connections.indexOf(socket), 1);
    gameState.walls = [];
    gameState.moves = [];
    gameState.move = {};
    io.sockets.emit('update', gameState);
    socket.disconnect();
  };

  var handleMove = function(payload) {
    console.log('MOVE: ', payload);

    if(payload.team === "white") {
      gameState.turn = "black";
    } else if (payload.team === "black") {
      gameState.turn = "white";
    } else {
      console.log('this should never happen ;p');
    }
    
    gameState.moves.push(payload);
    gameState.move = payload;

    io.sockets.emit('update', gameState);
    gameState.move = {};
  }

  var handleWall = function(payload) {
    console.log('WALL: ', payload);

    if(payload.team === "white") {
      gameState.turn = "black";
    } else if (payload.team === "black") {
      gameState.turn = "white";
    } else {
      console.log('this should never happen ;p');
    }

    gameState.walls.push(payload);
    io.sockets.emit('update', gameState);
  }

  socket.once('disconnect', handleDisconnect);
  socket.on('move', handleMove);
  socket.on('wall', handleWall);

  //add socket to connections array
  connections.push(socket);
  //log incoming socket id
  console.log("Connected: ", socket.id);

  io.sockets.emit('update', gameState);
});

console.log("game server is running at 'http://localhost:3000'");