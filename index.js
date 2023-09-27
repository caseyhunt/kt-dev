const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);   //creating the server
const { Server } = require("socket.io");  //requiring server with socket library
const io = new Server(server);
let activeUsers = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); //server projects index.html
  const path = require('path');
  app.use(express.static(path.join(__dirname, '/static')));
});

io.on('connection', (socket) => {

  //to do: emit list of users on connect
  console.log('a user connected');
  console.log(socket.id); //every user has a socket id 
  io.to(socket.id).emit('ulist connect', activeUsers);
  activeUsers.push({userID: socket.id, bt1:false, bt2:false});
  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('user left', activeUsers[activeUsers.findIndex(item => item.userID == socket.id)].name);

    //remove the user information for the user that has disconnected
    activeUsers.splice(activeUsers.findIndex(item => item.userID == socket.id),1);
    //console.log(socket.id);
  });
  socket.on('clicked', () => {
   //console.log('clicked');
   io.emit('clicked');
 });

 socket.on('forward', () => {
  io.emit('forward'); // changed bu nothing really happened
});

socket.on('back', () => {
 io.emit('back');//changed back to forward
});

socket.on('left', () => {
 io.emit('left');
});

socket.on('right', () => {
 io.emit('right');
});

socket.on('stop', () => {
 io.emit('stop');
});

socket.on('handshake', () => {
  socket.emit('handshake', activeUsers);
})

socket.on('namesubmit', (name) => {
  console.log(name);
  activeUsers[activeUsers.findIndex(item => item.userID == socket.id)].name = name;
  console.log("active users:", activeUsers);
  let newUser = activeUsers[activeUsers.findIndex(item => item.userID == socket.id)];

})

socket.on('bt', (name, cube) =>{
  if(cube == 0){
    activeUsers[activeUsers.findIndex(item => item.userID == socket.id)].bt1 = true;
  } else if(cube == 1){
      activeUsers[activeUsers.findIndex(item => item.userID == socket.id)].bt2 = true;
    }
    let newUser = activeUsers[activeUsers.findIndex(item => item.userID == socket.id)];
    io.emit('user list', activeUsers, newUser, cube);
})


socket.on('user rc', (user, name) => {
  let userID = activeUsers[activeUsers.findIndex(item => item.name == user)].userID;
  socket.emit('user rc', userID, socket.id, name);
  io.to(userID).emit('remote user', socket.id, name);
})

socket.on('user rc 2', (user) => {
  let userID = activeUsers[activeUsers.findIndex(item => item.name == user)].userID;
  socket.emit('user rc 2', userID);
})

//to do: ensure that remote is ONLY triggered on remote interactions.

socket.on('remote', (type, rcUID, nCube,speed, uname) => {
  //console.log('move remote', type, rcUID);
  if(rcUID != undefined){
  let moveType = ['forward', 'stop', 'back', 'left', 'right', 'charge'];
   io.to(rcUID).emit(moveType[type], nCube, speed, uname);
 }
})

socket.on('rc end', (rcUID) => {
  console.log(socket.id + " disconnected from " + rcUID);
  io.to(rcUID).emit('rc end', socket.id);
})

socket.on('remotejoystick', (rcUID, nCube,x,y,speed1, name) => {
  // console.log('remote joystick', rcUID, x,y,speed1);
  if(rcUID != undefined){
   io.to(rcUID).emit('joystick', nCube, x, y, speed1, name);
 }
})


socket.on('rmove', (x, y, rcUID, nCube) => {
    if(rcUID != undefined){
      io.to(rcUID).emit('rmove', x, y, nCube);

    }
})

socket.on('rem', () => {
      socket.emit('handshake', activeUsers);
})

socket.on('rpos', (xpos, ypos, ang, name, pUID, directControl, a) =>{
  // console.log(socket.id, xpos, ypos);
  io.to(pUID).emit('rpos', xpos, ypos, ang, name, directControl, a);
})

socket.on('dc', (xpos, ypos, ang, name, pUID, directControl, a) =>{
  // console.log(socket.id, xpos, ypos);
  io.to(pUID).emit('dc', xpos, ypos, ang, name, directControl, a);
})

socket.on('spinCube', (rcUID, name)=>{
  io.to(rcUID).emit('spinCube', rcUID, name);
})

socket.on('party', (rcUID, name)=>{
  io.to(rcUID).emit('party', rcUID, name);
})

socket.on('shuffle', (rcUID, name)=>{
  io.to(rcUID).emit('shuffle', rcUID, name);
})

socket.on('r', (rcUID, nCube,characteristic, rbuf, name) => {
  // console.log('r ' + rcUID);
    if(rcUID != undefined){
      io.to(rcUID).emit('r', nCube, characteristic, rbuf, name);
    }
})



});


//port of the server 
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
server.listen(port);
