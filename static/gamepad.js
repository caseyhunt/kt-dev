const haveEvents = 'ongamepadconnected' in window;
const controllers = {};
const joystick = [0,0,0,0];

let last_move = [0,0]; //time of last move for each cube

function connecthandler(e) {
  addgamepad(e.gamepad);
}

function addgamepad(gamepad) {
  controllers[gamepad.index] = gamepad;

  // See https://github.com/luser/gamepadtest/blob/master/index.html
  const start = document.getElementById("start");
  requestAnimationFrame(updateStatus);
}

function disconnecthandler(e) {
  removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
  delete controllers[gamepad.index];
}

function updateStatus() {
  if (!haveEvents) {
    scangamepads();
  }

let i=0;
// console.log(controllers[0]);

if(controllers.length>1){
  for (const controller of controllers){
}
}else{
  controller = controllers[0];

  controller.buttons.forEach((button, i) => {
    if(button.pressed == true){
      console.log(i);
      //spin 2
      if(i==0){
        console.log(isconnected2);
        console.log(rcUID2);
        if(isconnected2 == 0 && rcUID2!=undefined){
          socket.emit('spinCube',  rcUID2, name, 0, socket.id);
          console.log('remote spin');
        }else if(isconnected2 == 1 && rcUID2!=undefined){
          socket.emit('spinCube',  rcUID2, name, 1, socket.id);
          console.log('remote spin');
        }else {
        spinCube( gCubes[1] );
        console.log("local spin")
      }
      }

      //stop 2

      if(i==1){
        if(isconnected2 == 0 && rcUID2!=undefined){
          socket.emit('remote', 1, rcUID2, 0, 0,name, socket.id);
        }else if(isconnected2 == 1 && rcUID2!=undefined){
          socket.emit("remote", 1, rcUID2, 1, 0, name, socket.id);
        }else{
        cubeStop(1);
      }
        
      }

      //shuffle 2
      if(i==2){
        if(isconnected2 == 0 && rcUID2!=undefined){
          socket.emit('shuffle', rcUID2, name, 0, socket.id);
          console.log('remote shuffle');
        }else if(isconnected2 == 1 && rcUID2!=undefined){
          socket.emit('shuffle', rcUID2, name, 1, socket.id);
          console.log('remote shuffle');
        }else{
        cubeShuffle(gCubes[1]);
      }
      }
 
      //party 2
      if(i==3){
        if(isconnected2 == 0 && rcUID2!=undefined){
          socket.emit('party', rcUID2, name, 0, socket.id);
          console.log('remote party');
        }else if(isconnected2 == 1 && rcUID2!=undefined){
          socket.emit('party', rcUID2, name, 1, socket.id);
          console.log('remote party');
        }else{
        partyCube(gCubes[1]);
      }
      }

      //party 1
      if(i==12){
        if(isconnected1 == 0 && rcUID!=undefined){
          socket.emit('party', rcUID, name, 0, socket.id);
          console.log('remote party');
        }else if(isconnected1 == 1 && rcUID!=undefined){
          socket.emit('party', rcUID, name, 1, socket.id);
          console.log('remote party');
        }else{
        partyCube(gCubes[0]);
      }
      }

      //spin 1
      if(i==13){
        if(isconnected1 == 0 && rcUID!=undefined){
          socket.emit('spinCube',  rcUID, name, 0, socket.id);
          console.log('remote spin');
        }else if(isconnected1 == 1 && rcUID!=undefined){
          socket.emit('spinCube',  rcUID, name, 1, socket.id);
          console.log('remote spin');
        }else {
        spinCube( gCubes[0] );
        console.log("local spin")
      }
      }

      //stop 1
      if(i==15){
        if(isconnected1 == 0 && rcUID!=undefined){
          socket.emit('remote', 1, rcUID, 0, 0,name, socket.id);
        }else if(isconnected1 == 1 && rcUID!=undefined){
          socket.emit("remote", 1, rcUID, 1, 0, name, socket.id);
        }else{
        cubeStop(0);
      }
        
      }

      //shuffle 1
      if(i==14){
        if(isconnected1 == 0 && rcUID!=undefined){
          socket.emit('shuffle', rcUID, name, 0, socket.id);
          console.log('remote shuffle');
        }else if(isconnected1 == 1 && rcUID!=undefined){
          socket.emit('shuffle', rcUID, name, 1, socket.id);
          console.log('remote shuffle');
        }else{
        cubeShuffle(gCubes[0]);
      }
      }

    }});

  
  let x_move = parseFloat(controller.axes[0]);
  let y_move = parseFloat(controller.axes[1]);
  if(Math.abs(y_move) >0.25 || Math.abs(x_move) >0.25){
    console.log(x_move, y_move);
    let et_move = Date.now() - last_move[0];
    console.log("et_move " + et_move);
    console.log("last move" + last_move[0]);
    if(Math.abs(et_move)>8){
    if(typeof isconnected1 != 'boolean'){
      moveJoystick(0, x_move, y_move, true, speed1);
      
    }else {
      console.log('local joystick')
      moveJoystick(0, x_move, y_move, false, speed1);
  }
  last_move[0] = Date.now();
}
    
  }

  if(Math.abs(parseFloat(controller.axes[2])) >0.25 || Math.abs(parseFloat(controller.axes[3])) >0.25){
    let et_move_1 = Date.now() - last_move[1];
    if(et_move_1>8){
    if(typeof isconnected2 != 'boolean'){
      moveJoystick(1, parseFloat(controller.axes[2]), parseFloat(controller.axes[3]), true, speed2);
    }else {
      console.log('local joystick')
      moveJoystick(1, parseFloat(controller.axes[2]), parseFloat(controller.axes[3]), false, speed2);
  }
  last_move[1] = Date.now();
  }
}
    if(Math.abs(joystick[0]-controller.axes[0])>0.08 || Math.abs(joystick[1]-controller.axes[1])>0.08){
      if(Math.abs(controller.axes[0]<0.25) && Math.abs(controller.axes[1]<0.25)){
        let et_move = Date.now() - last_move[0];
        if(Math.abs(et_move)>8){
        console.log('stopping cube 1');
        console.log(Math.abs(joystick[0]));
        console.log(Math.abs(joystick[1]));
        setTimeout(function(){
      stopping(0);

      }, 200);

      }
      last_move[0] = Date.now();
    }
    
  }

   if(Math.abs(joystick[2]-controller.axes[2])>0.08 || Math.abs(joystick[3]-controller.axes[3])>0.08){
     if(Math.abs(controller.axes[2]<0.25) && Math.abs(controller.axes[3]<0.25)){
      let et_move_1 = Date.now() - last_move[1];
        if(Math.abs(et_move_1)>8){
       console.log('stopping cube 2');
       setTimeout(function(){
     stopping(1);

     }, 200);
    }
    last_move[1] = Date.now();
     }
  }
  
  controller.axes.forEach((axis, i) => {
       joystick[i] = controller.axes[i]
  });





  requestAnimationFrame(updateStatus);
}
}




function scangamepads() {
  const gamepads = navigator.getGamepads();
  for (const gamepad of gamepads) {
    if (gamepad) { // Can be null if disconnected during the session
      if (gamepad.index in controllers) {
        controllers[gamepad.index] = gamepad;
      } else {
        addgamepad(gamepad);
      }
    }
  }
}

window.addEventListener("gamepadconnected", connecthandler);
window.addEventListener("gamepaddisconnected", disconnecthandler);

if (!haveEvents) {
 setInterval(scangamepads, 1000);
 console.log('scanning gamepad')
}
