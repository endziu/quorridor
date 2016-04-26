//import dependecies
const express = require('express');
const app = express();
//use public folder to serve static content
app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));
//listen on port 3000 and spin up io server
const server = app.listen(3000);
const io = require('socket.io').listen(server);

//sockets here...
let connections = [];
//  ........
let gameState = {
  audience: [],
  players: [{team: 'white', pos:{x:4, y:8}}],
  walls: [],
  moves: [],
  turn: "white"
};

const isMoveValid = (move, state) => false;
const isWallValid = (wall, state) => false;

io.sockets.on('connection', (socket) => {

  socket.once('disconnect', () => {
    console.log('Disconnecting...', socket.id);
    connections.splice(connections.indexOf(socket), 1);
    gameState.walls = [];
    gameState.moves = [];
    io.sockets.emit('update', gameState);
    socket.disconnect();
  });

  socket.on('move', (payload) => {
    console.log('MOVE REQUEST: ', payload);
    if(isMoveValid(payload, gameState)) {
      gameState.moves.push(payload);
      io.sockets.emit('update', gameState);  
    } else {
      console.log('invalid move!');
      io.sockets.emit('error', {mess: "invalid move!"});
    }
  });

  socket.on('wall', (payload) => {
    console.log('WALL REQUEST: ', payload);
    if(isWallValid(payload, gameState)) {
      gameState.walls.push(payload);
      io.sockets.emit('update', gameState);  
    } else {
      console.log('invalid move!');
      io.sockets.emit('error', {mess: "can't do it here!"});
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