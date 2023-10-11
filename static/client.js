var socket = io();

var button = document.getElementById('button');

let rcUID;
let rcUID2;
var name;
var rcname1;
var rcname2;
var isconnected1 = false;
var isconnected2 = false;
let connecting1 = false;
let connecting2 = false;

var slider2 = document.getElementById("slider2");
var slider1 = document.getElementById("slider1");
var speed = 0x14;
var speed1 = 0x14;
var speed2 = 0x14;

let ygo;
let xgo;

let activeRobot = undefined;
let robotActive = true;

let cubeControl = false;

var angle = [0x5a,0x00];

let activeCube = 0;

let crem = false;

let char; //0: move -- 1: sound -- 2: light -- 3:position

var toiomax = [440, 440];
var toiomin = [50, 50];

var toioSize = 25;

var toiomax_draw = [toiomax[0]-40, toiomax[1]-40];
var toiomin_draw = [toiomin[0]+15, toiomin[1]+15];

var xmax = 308;
var ymax = 212;
let toiox = [0];
let toioy = [0];

let pUID = [];

let directControl = false;

let activeColor = "red";

let cube={};

let cubecc = undefined;


// const domain = 'meet.jit.si';
// const options = {
// roomName: 'Together_Apart',
// width: "100%",
// height: "100%",
// parentNode: document.querySelector('#meet'),
// lang: 'en',
// };
// const api = new JitsiMeetExternalAPI(domain, options);


     
let api;
initIframeAPI = () => {
//  let api; 
const domain = "8x8.vc";

const options = {
 roomName: "vpaas-magic-cookie-0c52204f3b6845fc860543b291a37230/Together Apart",
 // jwt: 'eyJhbGciOiJSUzI1NiIsImtpZCI6InZwYWFzLW1hZ2ljLWNvb2tpZS0wYzUyMjA0ZjNiNjg0NWZjODYwNTQzYjI5MWEzNzIzMC80MzkzZTAiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJqaXRzaSIsImNvbnRleHQiOnsidXNlciI6eyJpZCI6IjBmOGI3NzYwLWMxN2YtNGExMi1iMTM0LWM2YWMzNzE2NzE0NCIsIm5hbWUiOiJDYXNleSIsImF2YXRhciI6Imh0dHBzOi8vbGluay50by91c2VyL2F2YXRhci9waWN0dXJlIiwiZW1haWwiOiIgY2FzZXkuaHVudEBjb2xvcmFkby5lZHUiLCJtb2RlcmF0b3IiOiJ0cnVlIn0sImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOiJ0cnVlIiwicmVjb3JkaW5nIjoidHJ1ZSJ9fSwiZXhwIjoxNjk2Mjg0MDUyLCJpc3MiOiJjaGF0IiwibmJmIjoxNTk2MTk3NjUyLCJyb29tIjoiKiIsInN1YiI6InZwYWFzLW1hZ2ljLWNvb2tpZS0wYzUyMjA0ZjNiNjg0NWZjODYwNTQzYjI5MWEzNzIzMCJ9.eURYRUtTGaFHGo39HWrYTJKiAJf73cvnllnXnc3r4qvU9Go77Ug3qw_fOcrHtybFrYa_J1iuNzkYo_6pJbVhYuU7zLq08QGz7IcVi0ls2r1Xlmqr6caNcsvCLYnyOk4vUVEhWnNltn_9rTdtDNHb6e-EYLCYMEVGDRUXzcU5CR03NNRXluYWBCnAGhnYZK3xJHQuMQDzSU7YORd2v6D-kriFPU8LTHi1v0sCeiGg13SDwm7JCOGuNkrD1Ah6HXOCd2CEZWdSXXW88tuYY4PIiKI_svtMj-U5QmFdgVR_OOwes5-GAg00Ul5qrZq_c9n3mIrp9iEFo7BEXQY7QtnxOuMZKLFkKFs0KkUGENbtU30wYE6jov912eXSYdzaPcHPHEPV6ew7REdzpU4A9isNLfvhPECNSUJ5Lmq17apLEVSkOvjYu44aXJYq2s3DDU_R5JOKRgAO1tMRJg4rq4EzXDcwKVMhyQiS4mTzH_X5GpOXPIlayiIAbojKRD3BO4jTd0SZnkWhjt7oNxkSoQOxmY3Yzvc0sNNriw89_Dt0iRPRqRsW-jaNHPypZqAd1h5a1msDQZmf22iZ0b-ykO6aDzUGmxOaDE87Y5I71lKaoNU_GEISTql09f8EgNR3QW0bmiyQTvvXb56qnWbFuGRNUn3JA65NXTurrpebUa1vU1U',

 parentNode: document.querySelector('#meet')
};
api = new JitsiMeetExternalAPI(domain, options);
// api.getParticipantsInfo();
// const numberOfParticipants = api.getNumberOfParticipants();
}   

window.onload = () => {
initIframeAPI();

api.addListener("videoConferenceJoined", function(res)
{
  console.log('participant joined');
  console.log(res.displayName);
  name = res.displayName;
  socket.emit('namesubmit',  name);
  //socket.emit('emoji', emoji);
  for(let i=0; i < document.getElementsByClassName("controls").length; i++){
  document.getElementsByClassName("controls")[i].style.visibility = "visible";
}
  resizeMeeting();

}
);
}

  
 




const resizeMeeting = () => {
  document.getElementById("meet").style.minHeight = "0px";
}







 const CUBE_ID_ARRAY = [ 0, 1 ];
 const SUPPORT_CUBE_NUM = CUBE_ID_ARRAY.length;

 // Global Variables.
 const gCubes = [ undefined, undefined, undefined ];





   const SERVICE_UUID              = '10b20100-5b3b-4571-9508-cf3efcd7bbae';
   const MOVE_CHARCTERISTICS_UUID = '10b20102-5b3b-4571-9508-cf3efcd7bbae';
   const SOUND_CHARCTERISTICS_UUID = '10b20104-5b3b-4571-9508-cf3efcd7bbae';
   const LIGHT_CHARCTERISTICS_UUID = '10b20103-5b3b-4571-9508-cf3efcd7bbae';
   const POSITION_CHARACTERISTICS_UUID = '10b20101-5b3b-4571-9508-cf3efcd7bbae';


   const connectNewCube = () => {
       const cube = {
           device:undefined,
           sever:undefined,
           service:undefined,
           soundChar:undefined,
           moveChar:undefined,
           lightChar:undefined,
           posChar: undefined,
           xpos: [0],
           ypos: [0],
           angle: undefined,
           xpos_notadj: undefined,
           ypos_notadj: undefined

       };

       // Scan only toio Core Cubes
       const options = {
           filters: [
               { services: [ SERVICE_UUID ] },
           ],
       }

       navigator.bluetooth.requestDevice( options ).then( device => {
           cube.device = device;
           console.log("cube 0 device id");
           console.log(cube.device.id);
           
           
           if( cube === gCubes[0] ){
            if(gCubes[1] != undefined){
              if(gCubes[0].device.id != undefined && cube.device.id == gCubes[1].device.id){
              alert("Error: This robot is already connected to this device.");
              throw new Error("Error: This robot is already connected to this device.");
              }
            }
               const cubeID = 1;
               changeConnectCubeButtonStatus( cubeID, undefined, true );
               device.addEventListener('gattserverdisconnected', function(){onDisconnected(cubeID)});


           }else if( cube === gCubes[1] ){
            if(gCubes[0] != undefined){
              if(gCubes[0].device.id != undefined && cube.device.id == gCubes[0].device.id){
              alert("Error: This robot is already connected to this device.");
              throw new Error("Error: This robot is already connected to this device.");
              }
            }
               const cubeID = 2;
               changeConnectCubeButtonStatus( cubeID, undefined, true );
               device.addEventListener('gattserverdisconnected', function(){onDisconnected(cubeID)});
          
           }

           return device.gatt.connect();
       }).then( server => {
           cube.server = server;
           return server.getPrimaryService( SERVICE_UUID );
       }).then(service => {
           cube.service = service;
           return cube.service.getCharacteristic( MOVE_CHARCTERISTICS_UUID );
           console.log("writing service characteristic");
       }).then( characteristic => {
           cube.moveChar = characteristic;
           return cube.service.getCharacteristic( SOUND_CHARCTERISTICS_UUID );
       }).then( characteristic => {
           cube.soundChar = characteristic;
           return cube.service.getCharacteristic( LIGHT_CHARCTERISTICS_UUID );
       }).then( characteristic => {
           cube.lightChar = characteristic;
           return cube.service.getCharacteristic( POSITION_CHARACTERISTICS_UUID );
       }).then( characteristic => {
           cube.posChar = characteristic;
           if( cube === gCubes[0] ){
             console.log("connecting cube 0");

             turnOnLightRed( cube );

             document.getElementById('canvas').innerHTML = '<div class="toio" id="toio1"><p>&#129169;</p></div>' + document.getElementById('canvas').innerHTML ;
             startCube( cube );
             //document.getElementById('toio1').style.backgroundColor = activeColor;
           }else if( cube === gCubes[1] ){
             console.log("connecting cube 1");
             document.getElementById('canvas').innerHTML += '<div class="toio" id="toio2"><p>&#129169;</p></div>';
             turnOnLightCian( cube );
             //document.getElementById('toio2').style.backgroundColor = activeColor;

             startCube( cube );
             //spin cube needs to be changed to startCube
             // spinCube(cube);
           }
       })

       return cube;
   }


   // Cube Commands
   // -- Light Commands
   const turnOffLight = ( cube ) => {

       const CMD_TURN_OFF = 0x01;
       const buf = new Uint8Array([ CMD_TURN_OFF ]);
       if( ( cube !== undefined ) && ( cube.lightChar !== undefined ) ){
           cube.lightChar.writeValue( buf );
       }

   }


   const turnOnLightGreen = ( cube ) => {

       // Green light
       const buf = new Uint8Array([ 0x03, 0x00, 0x01, 0x01, 0x00, 0xFF, 0xFF]);
       if( ( cube !== undefined ) && ( cube.lightChar !== undefined ) ){
           cube.lightChar.writeValue( buf );
           console.log('green');
       }

   }

   const turnOnLightCian = ( cube ) => {

       // Cian light
     const buf = new Uint8Array([ 0x03, 0x00, 0x01, 0x01, 0x00, 0xFF, 0xFF ]);
       if( ( cube !== undefined ) && ( cube.lightChar !== undefined ) ){
           cube.lightChar.writeValue( buf );
           console.log('cyan');

       }

   }

   const turnOnLightRed = ( cube ) => {

       // Red light
       const buf = new Uint8Array([ 0x03, 0x00, 0x01, 0x01, 0xFF, 0x00, 0x00 ]);
       if( ( cube !== undefined ) && ( cube.lightChar !== undefined ) ){
           cube.lightChar.writeValue( buf );
       }

   }


   const startCube = ( cube ) => {

     console.log('cube connected successfully!');
     console.log(cube);
       // Green light
       spinCube(cube);


        onStartButtonClick( cube );
        addCubeSelectionEvent();

   }

   const spinCube = ( cube ) => {

       // Green light
       const buf = new Uint8Array([ 0x02, 0x01, 0x01, 0x64, 0x02, 0x02, 0x14, 0x64 ]);
       if( ( cube !== undefined ) && ( cube.moveChar !== undefined ) ){
           cube.moveChar.writeValue( buf );
           console.log('spin');
       }

   }

   const partyCube = (cube) => {



     if( ( cube !== undefined ) && ( cube.moveChar !== undefined ) && (cube.lightChar !== undefined)){
         doTheDance(cube, 0);
         console.log('party!');
     }

   }

   function addCubeSelectionEvent(){

     for(i=0; i<document.querySelectorAll(".toio").length; i++){
     document.querySelectorAll(".toio")[i].addEventListener("click", function(e){
       console.log(e.currentTarget);
       console.log(typeof e.target.id);

       if(activeRobot != undefined && activeRobot != NaN){
         document.getElementById("toio"+activeRobot).classList.toggle("selected");
       }
       if(e.currentTarget!=undefined){
       activeRobot = parseInt(e.currentTarget.id.slice(-1));
       }


      //  console.log("active robot: " + activeRobot);
       e.currentTarget.classList.toggle("selected");
     })

    //  document.querySelectorAll(".toio")[i].addEventListener("touchstart", function(e){
    //    console.log(e.target.id);
    //    if(activeRobot != undefined){
    //      document.getElementById("toio"+activeRobot).classList.toggle("selected");
    //    }
    //    activeRobot = e.target.id.slice(-1);

    //    console.log("active robot: " + activeRobot);
    //    e.target.classList.toggle("selected");
    //  })
   }
   }

   function doTheDance(cube, count){
     setTimeout(function(){
       if(count<6){
     let buf1 = new Uint8Array([ 0x03, 0x00, 0x01, 0x01, 0xFF, 0x00, 0x00 ]);
     let buf = new Uint8Array([ 0x02, 0x01, 0x01, 0x64, 0x02, 0x02, 0x64, 0x0A]);
   cube.lightChar.writeValue( buf1 );
     cube.moveChar.writeValue( buf );
     if(count%2 == 0){
    setTimeout(function() {
      buf = new Uint8Array([ 0x02, 0x01, 0x02, 0x64, 0x02, 0x01, 0x64, 0x0A]);
      cube.moveChar.writeValue( buf );
      buf1 = new Uint8Array([ 0x03, 0x00, 0x01, 0x01, 0x00, 0xFF, 0x00]);
      cube.lightChar.writeValue(buf1);
    },400);
  }else{
    setTimeout(function() {
      buf = new Uint8Array([ 0x02, 0x01, 0x01, 0x64, 0x02, 0x01, 0x64, 0x0A]);
      cube.moveChar.writeValue( buf );
      buf1 = new Uint8Array([ 0x03, 0x00, 0x01, 0x01, 0x00, 0xFF, 0xFF ]);
      cube.lightChar.writeValue(buf1);
      if(cube == gCubes[0]){
        turnOnLightRed( cube );
      }else{
        turnOnLightCian( cube );
      }
    },400);
  }

  count++;
    doTheDance(cube, count);
}}, 400);
   }

   const cubeShuffle = (cube) =>{
     doTheShuffle(cube, 0);
   }

   function doTheShuffle(cube, count){
     if(count<6){

     setTimeout(function(){
        if(count%2==0){
     let buf = new Uint8Array([ 0x02, 0x01, 0x01, 0x64, 0x02, 0x01, 0x64, 0x0A]);
     cube.moveChar.writeValue( buf );
   }else{
     buf = new Uint8Array([ 0x02, 0x01, 0x02, 0x3C, 0x02, 0x02, 0x3C, 0x0A]);
     cube.moveChar.writeValue( buf );
   }
   count++;
   doTheShuffle(cube,count);
 },350);
}
   }

   // const changeButtonStatus = ( btID, enabled ) => {
   //     //document.getElementById( btID ).disabled = !enabled;
   //     document.getElementById( 'btConnectCube' + btID).src="images/Group 46.svg";
   // }




   const changeConnectCubeButtonStatus = ( idButton, cube, enabled ) => {
     console.log('change button status' + 'btConnectCube' + idButton);
     document.getElementById( 'btConnectCube' + idButton).src="images/Group 46.svg";

       // if( idButton ){
       //     changeButtonStatus( 'btConnectCube' + ( idButton), enabled );
       // }else{
           if( idButton === 1 ){
               // changeButtonStatus( 'btConnectCube1', enabled );
               socket.emit('bt', name, 0);
           }else if( idButton === 2 ){
               socket.emit('bt', name, 1);
           }
       // }

   }


   function enableCube(cubeno) {
     if(cubeno == 0){
       console.log('enable cube 1');
       // document.getElementById('mycube1').classList.toggle('disabled');
     }else if(cubeno == 1){
       console.log('enable cube 2');
       // document.getElementById('mycube2').classList.toggle('disabled');
     }
   }






   const cubeMove = ( moveID, cubeno,speed ) => {
       const cube = gCubes[cubeno];
       var buf = new Uint8Array([ 0x01, 0x01, 0x01, 0x64, 0x02, 0x01, 0x64]);
       // forward

       console.log(speed);
       if(moveID==1){
       buf = new Uint8Array([ 0x01, 0x01, 0x01, speed, 0x02, 0x01, speed]);
       console.log('cube ' + cubeno + " moving forward");
     }else if (moveID==2){
       buf = new Uint8Array([ 0x01, 0x01, 0x02, speed, 0x02, 0x02, speed]);
     }else if (moveID==3){
       buf = new Uint8Array([ 0x01, 0x01, 0x02, 0x14, 0x02, 0x01, speed]);
     }else if (moveID==4){
       buf = new Uint8Array([ 0x01, 0x01, 0x01, speed, 0x02, 0x02, 0x14]);
     }else if (moveID==5){
       buf = new Uint8Array([ 0x02, 0x01, 0x01, speed, 0x02, 0x01, speed, 0x50]);
     }
       if( ( cube !== undefined ) && ( cube.moveChar !== undefined ) ){
           cube.moveChar.writeValue( buf );
           console.log('move');
       }

   }

   const cubeStop = ( cubeno ) =>{
       const cube = gCubes[cubeno];
       const buf = new Uint8Array([ 0x01, 0x01, 0x01, 0x00, 0x02, 0x01, 0x00]);
       if( ( cube !== undefined ) && ( cube.moveChar !== undefined ) ){
           setTimeout(() => {cube.moveChar.writeValue( buf )},100);
           console.log('stop');
           if(cubeno==0){
             console.log('cube 1 stopping');
           }else if(cubeno==1){
             console.log('cube 2 stopping');
           }
       }
   }


// let prevtab = document.getElementsByClassName("activetab")[0].id;
   function setActive(e){
     console.log('clicked');

     document.getElementsByClassName("activetab")[0].classList.toggle("inactivetab");
     document.getElementsByClassName("activetab")[0].classList.toggle("activetab");


     e.target.classList.toggle("activetab");
     e.target.classList.toggle('inactivetab');

      activeCube = e.target.id;
      console.log(activeCube);
     if(activeCube == 'mycube1'){
       activeCube = 0;
       console.log(activeCube);
     }else if(activeCube == 'mycube2'){
       activeCube = 1;
     }else{
       activeCube = 2;
       console.log(activeCube);
       document.getElementById('remoteconnect').classList.toggle('inactive');
       document.getElementById('remoteconnect').classList.toggle('active');

     }

     // console.log("previous meal: " + prevmeal);
     // prevmeal.classList.toggle('active');


   }

   function setActiveColor(e){
     console.log('clicked');
     document.getElementsByClassName("active")[0].classList.toggle("active");
     e.target.classList.toggle("active");
     activeColor = e.target.id;
     console.log('active color: ' + activeColor);
   }


let cubepos;

const onStartButtonClick = (cube) => {
  console.log("start button click");
  const buf1 = new Uint8Array([ 0x18, 0x00, 0x01, 0x01 ]);
  const buf2 = new Uint8Array([ 0x1d, 0x00, 0x01, 0x01, 0x01 ]);
  if(cube != undefined){
  cube.posChar.writeValue(buf1);
  //posCharacteristic = gCubes[0].posChar.readValue();
  //console.log(posCharacteristic);
  return cube.posChar.startNotifications().then(_ => {
    console.log('> Position Notifications started');
  if(cube == gCubes[0]){
  cube.posChar.addEventListener('characteristicvaluechanged',
      handleNotifications1);
    // handleSensorNotifications);

  }else if(cube == gCubes[1]){
  cube.posChar.addEventListener('characteristicvaluechanged',
    handleNotifications2);
  }else{
  cube.posChar.addEventListener('characteristicvaluechanged',
    handleNotifications3);
  }})
.catch(error => {
  console.log('Argh! There seems to be an issue with incoming notifications from cube. ' + error);
});

// gCubes[0].moveChar.writeValue(buf2);

// return gCubes[0].moveChar.startNotifications().then(_ => {
//   console.log('> Notifications started');
//   gCubes[0].moveChar.addEventListener('characteristicvaluechanged', function(event)
//   {
//     handleNotifications.call(this, event, 0);
//   }, false);
//
// })
// .catch(error => {
// console.log('Argh! ' + error);
// });
}
}


let a;
function handleNotifications1(event) {

// console.log("cube 1");

  let value = event.target.value;
//  console.log(value);
  //console.log(value.getInt16(1, true));
let a = [];
// Convert raw data bytes to hex values just for the sake of showing something.
// In the "real" world, you'd use data.getUint8, data.getUint16 or even
// TextDecoder to process raw data bytes.
for (let i = 0; i < value.byteLength; i++) {
  a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
}

// console.log(a);
// console.log(a);



cubePositionCalc(gCubes[0], a, value);
if(pUID.length>0){
for(i=0; i<pUID.length; i++){
socket.emit('rpos', gCubes[0].xpos[0], gCubes[0].ypos[0], gCubes[0].angle, 0, name, pUID[i], socket.id, directControl, a);
}
}
drawToio(0);
//console.log('> ' + a.join(' '));

}

function cubePositionCalc(cube, a, value) {
  var xoff;
  xoff = toiomin_draw[0];
  var yoff;
  yoff = toiomin_draw[1];

  if (cube.xpos[0] != undefined){
  cube.xpos[1] = cube.xpos[0];
  cube.ypos[1] = cube.ypos[0];
  }

  cube.xpos[0] = value.getInt16(1, true)-xoff;
  cube.ypos[0] = value.getInt16(3, true)-yoff;

  cube.xpos_notadj = value.getInt16(1, true);
  cube.ypos_notadj = value.getInt16(3, true);
  var xpos = (value.getInt16(1, true)).toString();
  var ypos = (value.getInt16(3, true)).toString();
  var angle = (value.getInt16(5, true)).toString();
  //console.log("x: ", xpos, "y: ", ypos, "angle: ", angle);
  document.getElementById("xpos").innerHTML = "x position: " + xpos;
  document.getElementById("ypos").innerHTML = "y position: " + ypos;
  document.getElementById("angle").innerHTML = "angle (degrees): " + angle;
  cube.angle = angle;
  // console.log(cube.angle);
  var posArr = [cube.xpos[0], cube.ypos[0]];
  return [xpos, ypos];
  // console.log(xpos);
  // console.log(ypos);

}

function handleNotifications2(event) {
  let value = event.target.value;

let a = [];
// Convert raw data bytes to hex values just for the sake of showing something.
// In the "real" world, you'd use data.getUint8, data.getUint16 or even
// TextDecoder to process raw data bytes.
for (let i = 0; i < value.byteLength; i++) {
  a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
}

  //console.log('cube 2 position: ' + a);
  cubePositionCalc(gCubes[1], a, value);
  if(pUID.length>0){
  for(i=0; i<pUID.length; i++){
  socket.emit('rpos', gCubes[1].xpos[0], gCubes[1].ypos[0], gCubes[1].angle, 1, name, pUID[i], socket.id, directControl, a);
  }
  }
  drawToio(1);
}

function handleNotifications3(event) {
  let value = event.target.value;

let a = [];
// Convert raw data bytes to hex values just for the sake of showing something.
// In the "real" world, you'd use data.getUint8, data.getUint16 or even
// TextDecoder to process raw data bytes.
for (let i = 0; i < value.byteLength; i++) {
  a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
}

  // console.log('cube 3 position: ' + a);
  cubePositionCalc(gCubes[2], a, value);
  if(pUID.length>0){
  for(i=0; i<pUID.length; i++){
  socket.emit('rpos', gCubes[2].xpos[0], gCubes[2].ypos[0], gCubes[2].angle, 2, name, pUID[i], socket.id, directControl, a);
  }
  }
  drawToio(2);

}

function drawToio(cubeno){
  console.log("drawing cube " + cubeno);
  let draw_id = "toio" + (cubeno+1);
  let cubeindex;
  for(i=0;i<document.querySelectorAll(".toio").length; i++){
    if(document.querySelectorAll(".toio")[i].id == draw_id){
      cubeindex = i;
    }
  }
    var ypos = ((gCubes[cubeno].ypos[0]/toiomax_draw[1])*200)-(cubeindex*toioSize);
    var xpos = (gCubes[cubeno].xpos[0]/toiomax_draw[0])*200;
    console.log(ypos);
    console.log(cubeindex);
    console.log(document.getElementById(draw_id).style.top);
    document.getElementById(draw_id).style.left = (xpos).toString() + "px";
    document.getElementById(draw_id).style.top = (ypos).toString() + "px";
    document.getElementById(draw_id).style.transform = "rotate("+ gCubes[cubeno].angle.toString() + "deg)";
  // if(gCubes[cubeno].xpos[1] != gCubes[cubeno].xpos[0] || gCubes[cubeno].ypos[1] != gCubes[cubeno].ypos[0]){
  //   // console.log("toio moving");
  //   let offsetvar;
  //   if(document.querySelectorAll("toio").length<2 && cubeno == 1){
  //     offsetvar = 0;
  //   }else{
  //     offsetvar = cubeno;
  //   }
  //   var ypos = ((gCubes[cubeno].ypos[0]/toiomax_draw[1])*200)-(offsetvar)*toioSize;
  //   var xpos = (gCubes[cubeno].xpos[0]/toiomax_draw[0])*200;
  //   document.getElementById(draw_id).style.left = (xpos).toString() + "px";
  //   document.getElementById(draw_id).style.top = (ypos).toString() + "px";
  //   document.getElementById(draw_id).style.transform = "rotate("+ gCubes[cubeno].angle.toString() + "deg)";

        // document.getElementById("toio").style.left = (xpos).toString() + "px";
    // document.getElementById('toio').style.top = (ypos).toString() + "px";
    // console.log("moving to: x: " + xpos + " y: " + ypos);
  }


function drawRemoteToio(cubeno, x, y, angle){
  let cubeindex;
  for(i=0;i<document.querySelectorAll(".toio").length; i++){
    if(document.querySelectorAll(".toio")[i].id == "toio"+cubeno){
      cubeindex = i;
    }
  }
    var ypos = ((y/toiomax_draw[1])*200)-cubeindex*toioSize;
    var xpos = (x/toiomax_draw[0])*200;
    document.getElementById("toio"+cubeno).style.left = (xpos).toString() + "px";
    document.getElementById("toio"+cubeno).style.top = (ypos).toString() + "px";
    document.getElementById("toio"+cubeno).style.transform = "rotate("+ angle + "deg)";

        // document.getElementById("toio").style.left = (xpos).toString() + "px";
    // document.getElementById('toio').style.top = (ypos).toString() + "px";
    // console.log("moving to: x: " + xpos + " y: " + ypos);
  }




function getMousePos(cube){
  const rect = event.target.getBoundingClientRect();
  var x = (event.clientX - rect.left)/200;
  var y = (event.clientY- rect.top)/200;
  console.log("mouse click x : " + x + " y : " + y);
  var xdiff = toiomax[0]-toiomin[0];
  var xmove = parseInt(x*xdiff);
  var ydiff = toiomax[1] - toiomin[1];
  var ymove = parseInt(y*ydiff)+5;
  let ygo;
  let xgo;
  console.log('x move: ' + xmove + " , " + "y move: " + ymove);


  xgo = toBits(xmove + toiomin[0]);
  ygo = toBits(ymove + toiomin[1]);

  if(activeRobot == 3 && isconnected1 == 0 && rcUID!=undefined){
    var buf4 = new Uint8Array([0x03,0x00,0x05,0x00,0x50,0x00, 0x00,xgo[0], xgo[1],ygo[0],ygo[1],0x5a,0x00]);
      socket.emit( 'r' , rcUID , 0 , 0 , buf4 , name );
  }else if(activeRobot ==3 && isconnected1 == 1 && rcUID!=undefined){
    var buf4 = new Uint8Array([0x03,0x00,0x05,0x00,0x50,0x00, 0x00,xgo[0], xgo[1],ygo[0],ygo[1],0x5a,0x00]);
      socket.emit( 'r' , rcUID , 1 , 0 , buf4 , name );
  }else if(activeRobot ==4 && isconnected2 == 0 && rcUID2!=undefined){
    var buf4 = new Uint8Array([0x03,0x00,0x05,0x00,0x50,0x00, 0x00,xgo[0], xgo[1],ygo[0],ygo[1],0x5a,0x00]);
      socket.emit( 'r' , rcUID2 , 0 , 0 , buf4 , name );
      console.log("remotely moving cube 1");
  }else if(activeRobot ==4 && isconnected2 == 1 && rcUID2!=undefined){
    var buf4 = new Uint8Array([0x03,0x00,0x05,0x00,0x50,0x00, 0x00,xgo[0], xgo[1],ygo[0],ygo[1],0x5a,0x00]);
      socket.emit( 'r' , rcUID2 , 1 , 0 , buf4 , name );
      console.log("remotely moving cube 2");
  }  else {
    if (cube != undefined){

        console.log("move cube to position");
        // console.log("x: " + xmove.toString(16) + " y: "+ ymove.toString(16));
        var buf = new ArrayBuffer(10)
        var a8 = new Uint8Array(buf);
        var buf1 = new Uint8Array([ 0x03, 0x00, 0x05, 0x00, 0x50, 0x00, 0x00]);
        var buf4 = new Uint8Array([0x03,0x00,0x05,0x00,0x50,0x00, 0x00,xgo[0], xgo[1],ygo[0],ygo[1],0x5a,0x00]);

       // console.log(buf4);
       //
         cube.moveChar.writeValue(buf4);
 }
}


}

function toBits(val){
  console.log(val);
  if(val > 255){
    // xmove = xmove.toString();
    valarr = [val-255, "0x01"];
    valarr = [valarr[0].toString(16), valarr[1]];
    // console.log(valarr);
    if(valarr[0] == 'NaN'){
        valarr[0] = "0x00";
    }else if(valarr[0].length ==1){
      valarr[0] = "0x0" + valarr[0];
    }else if(valarr[0].length >= 2){
      valarr[0] = "0x" + valarr[0];
    }
    // console.log(valarr);
  }else{
    valarr = [val, "0x00"];
    console.log(valarr);
    valarr = [valarr[0].toString(16), valarr[1]];
    if(valarr[0] == 'NaN'){
      valarr[0] = "0x00";
    }else if(valarr[0].length ==1){
    valarr[0] = "0x0" + valarr[0];
  }else if(valarr[0].length >= 2){
    valarr[0] = "0x" + valarr[0];
  }

  }
  return valarr;
}




function changeAngle(a){
  angle[0]=a[0];
  angle[1] = a[1];
  console.log(angle);
  console.log(xgo);
  console.log(ygo);
  console.log(speed1);
  var buf = new ArrayBuffer(10)
  var a8 = new Uint8Array(buf);
  //var buf4 = new Uint8Array([0x03,0x00,0x05,0x00,speed1,0x00, 0x00,xgo[0], xgo[1],ygo[0],ygo[1],angle[0],angle[1]]);
  var buf4 = new Uint8Array([0x03,0x00,0x05,0x00,speed1,0x00, 0x00,cubepos[0], cubepos[1],cubepos[2],cubepos[3],angle[0],angle[1]]);

     if (gCubes[0] != undefined){
         console.log("move cube to position");
         // console.log("x: " + xmove.toString(16) + " y: "+ ymove.toString(16));
         cube = gCubes[0];
        console.log(buf4);
  }
  //socket.emit('rpos', toiox[0], toioy[0], 0, name, pUID[i], directControl, a);

  if(isconnected1 != false){
    //btCube(nCube, characteristic, rbuf)

    var buf4 = new Uint8Array([0x03,0x00,0x05,0x00,speed1,0x00, 0x00,xgo[0], xgo[1],ygo[0],ygo[1],angle[0],angle[1]]);
    socket.emit( 'r' , rcUID , 0 , 0 , buf4 , name );
  }else if(isconnected1 ==false && gCubes[0] != undefined){
    cube.moveChar.writeValue(buf4);
  }
}


 function calculateSpeed(){
   speed1 = Math.floor(slideval*160);
   speed1 = '0x' + speed1.toString(16);
   console.log(speed1);
 }

const moveJoystick = (n, x, y, remote, speed) => {
if(n==0 && remote == true){
   if(isconnected1== 0 && rcUID!= undefined){
     socket.emit('remotejoystick',  rcUID, 0, x,y, speed, name, socket.id);
     console.log('remote joystick control');
   }else if(isconnected1== 1 && rcUID!= undefined){
     socket.emit('remotejoystick',  rcUID, 1, x,y, speed, name, socket.id);
     console.log('remote joystick control');
   }}

   else if(n==1  && remote == true){
     if(isconnected2== 0 && rcUID2!= undefined){
     socket.emit('remotejoystick',  rcUID2, 0, x,y, speed, name, socket.id);
     console.log('remote joystick control');
   }else if(isconnected2== 1 && rcUID2!= undefined){
     socket.emit('remotejoystick',  rcUID2, 1, x,y, speed, name, socket.id);
     console.log('remote joystick control');
   }}
   else{
     console.log("local joystick control");
     let cube = gCubes[n];
     let maxspeed;
     if(speed ==undefined){
     if(n==0){
     maxspeed = speed1;
   }else if(n==1 ){
   maxspeed = speed2;
   }
 }else{
   maxspeed = speed;
 }
   console.log(maxspeed);
     var buf = new Uint8Array([ 0x01, 0x01, 0x01, 0x64, 0x02, 0x01, 0x64]);

     let stopmot = 0;

     console.log("x: "+x);
     console.log("y: "+y);
   //calculate whether the motor should go forward or backward.
   //motor speeds are encoded as -.5 to .5 so if it's over 0 then it should go forward.
     let m1fw;
     let m2fw;

     if(y<0){
       console.log("forward");
       m1fw = true;
       m2fw = true
     }else{
       console.log("backward")
       m1fw = false;
       m2fw = false
     }

     let motor1;
     let motor2;

     if(x>0 && Math.abs(y)>0.2){
       console.log(Math.floor(Math.abs(x)*maxspeed),Math.floor(Math.abs(y)*maxspeed));
         motor1 = Math.floor(Math.abs(y)*maxspeed);
         motor2 = Math.floor(motor1-Math.abs(motor1*x));
         //motor2 = Math.floor(motor1/Math.abs(x*maxspeed*.25));
         motor1 = motor1.toString(16);
         motor1 = "0x" + motor1;
         motor2 = motor2.toString(16);
         motor2 = "0x" + motor2;


     }
     else if(x==0 && Math.abs(y)>0.2){
   console.log(Math.floor(Math.abs(x)*maxspeed),Math.floor(Math.abs(y)*maxspeed));
     motor1 = Math.floor(Math.abs(y)*maxspeed);
     motor1 = motor1.toString(16);
     motor1 = "0x" + motor1;
     motor2 = motor1;
   }
   else if(x<=0 && Math.abs(y)>0.2){
     console.log(Math.floor(Math.abs(x)*maxspeed),Math.floor(Math.abs(y)*maxspeed));
       motor2 = Math.floor(Math.abs(y)*maxspeed);
       motor1 = Math.floor(motor2-Math.abs(motor2*x));
       //motor1 = Math.floor(motor2/Math.abs(x*maxspeed*.25));
       motor2 = motor2.toString(16);
       motor2 = "0x" + motor2;
       motor1 = motor1.toString(16);
       motor1 = "0x" + motor1;
     }
     else if(Math.abs(y)<=0.2 && x>0){
       console.log(Math.floor(Math.abs(x)*maxspeed),Math.floor(Math.abs(y)*maxspeed));
       motor1 = Math.floor(Math.abs(x)*maxspeed*0.2);
       if(motor1<8){
        motor1 = 8;
       }else if(motor1>20){
        motor1 = 20;
       }
       motor2 = motor1;
       m2fw = false;
       m1fw = true;
     }else if(Math.abs(y)<=0.2 && x<=0){
       console.log(Math.floor(Math.abs(x)*maxspeed),Math.floor(Math.abs(y)*maxspeed));
       motor2 = Math.floor(Math.abs(x)*maxspeed*0.2);
       if(motor2<8){
        motor2 = 8;
       }else if(motor2>20){
        motor2 = 20;
       }
       motor1 = motor2;
       m1fw = false;
       m2fw = true;
     }


     //write forward and backward values
     if(m1fw == true && m2fw==true){
      buf = new Uint8Array([ 0x01, 0x01, 0x01, motor1, 0x02, 0x01, motor2]);
     //buf = new Uint8Array([ 0x01, 0x01, 0x01, 0x32, 0x01, 0x01, 0x32]);
     }else if(m1fw == false && m2fw==true){
      buf = new Uint8Array([ 0x01, 0x01, 0x02, motor1, 0x02, 0x01, motor2]);
     //buf = new Uint8Array([ 0x01, 0x01, 0x02, 0x96, 0x01, 0x01, 0x32]);
   }else if(m1fw == true && m2fw == false){
     buf = new Uint8Array([ 0x01, 0x01, 0x01, motor1, 0x02, 0x02, motor2]);
     //buf = new Uint8Array([ 0x01, 0x01, 0x01, 0x96, 0x02, 0x01, 0x64]);

   }else{
      buf = new Uint8Array([ 0x01, 0x01, 0x02, motor1, 0x02, 0x02, motor2]);
       //  buf = new Uint8Array([ 0x01, 0x01, 0x02, 0x96, 0x02, 0x02, 0x64]);
   }

     if( ( cube !== undefined ) && ( cube.moveChar !== undefined )){
       console.log(buf);
         cube.moveChar.writeValue( buf );
         console.log('move');

     }
   }

 }

function btCube(nCube, characteristic, rbuf){
  cube= gCubes[nCube];
  //0: move -- 1: sound -- 2: light -- 3:position

  if(cube != undefined){

  if(characteristic == 0){
    //used to move both with motors and with mat
    cube.moveChar.writeValue( rbuf );
  }else if(characteristic == 1){
    cube.soundChar.writeValue( rbuf );
  }else if(characteristic == 2){
    cube.lightChar.writeValue( rbuf );
  }else if(characteristic == 3){
    cube.posChar.writeValue( rbuf );
  }
}

 }

function littleEndian(num){
  let outarr = [];
  num = parseInt(num);
  if(num<65,535){
    if(num<255){
      outarr = [num, "0x00"];
      outarr = [outarr[0].toString(16), outarr[1]];
      if(outarr[0] == 'NaN'){
        outarr[0] = "0x00";
      }else if(outarr[0].length ==1){
      outarr[0] = "0x0" + outarr[0];
    }else if(outarr[0].length >= 2){
      outarr[0] = "0x" + outarr[0];
    }
  }else{
    outarr = [num-255, "0x01"];
    outarr = [outarr[0].toString(16), outarr[1]];
      if(outarr[0] == 'NaN'){
      outarr[0] = "0x00";
    }else if(outarr[0].length ==1){
      outarr[0] = "0x0" + outarr[0];
    }else if(outarr[0].length >= 2){
      outarr[0] = "0x" + outarr[0];
    }
    }

    return outarr;


  }else{
    console.log('ERROR: You are trying to encode a little endian number greater than two bits.');
    console.log('please see function littleEndian() for more information');
    return false;
  }

}

function stopping(n){
  if (n==0){
    if(isconnected1== 0 && rcUID!= undefined){
     socket.emit('remote', 1, rcUID, 0, 0,name, socket.id);
     //setInterval(function () {socket.emit('remote', 1, rcUID, 0, 0,name, socket.id)}, 10);
   }else if(isconnected1 == 1 && rcUID!= undefined){
     socket.emit("remote", 1, rcUID, 1, 0, name, socket.id);
     //setInterval(function () {socket.emit("remote", 1, rcUID, 1, 0, name, socket.id)}, 10);
   }else if(gCubes[0] !==undefined){
     cubeStop(0);
   }else{
     console.log("error stopping cube 0, either an issue with remote cube connection or gCubes[0] is undefined.")
   }}else if(n==1){
     if(isconnected2== 0 && rcUID2!= undefined){
      socket.emit('remote', 1, rcUID2, 0, 0,name, socket.id);
      //setInterval(function () {socket.emit('remote', 1, rcUID2, 0, 0,name, socket.id)}, 10);
    }else if(isconnected2 == 1 && rcUID2!= undefined){
      socket.emit("remote", 1, rcUID2, 1, 0, name, socket.id);
      //setInterval(function () {socket.emit("remote", 1, rcUID2, 1, 0, name, socket.id)}, 10);
    }else if(gCubes[1] !== undefined){
      cubeStop(1);
    }else{
      console.log("error stopping cube 1, either an issue with remote cube connection or gCubes[1] is undefined.")
    }
  }else{
    console.log("error with stopping function, n!=0 or 1.")
   }
 };


 function movingForward(n){
      console.log('moving forward');
      if(n==0){
        if(rcUID!=undefined && isconnected1 == 0){
          console.log(rcUID);
          socket.emit('remote', 0, rcUID, 0, speed1, name, socket.id);
        }else if(rcUID!=undefined && isconnected1 == 1){
          socket.emit('remote', 0, rcUID, 1, speed1, name, socket.id);
        }else if(gCubes[0]!==undefined){
          cubeMove( 1 ,0 , speed1);
        }else{
          console.log('error moving cube 0 forward, either an issue with remote connection or gCubes[0] is undefined.')
        }
      }else if(n==1){
            if(rcUID2!=undefined && isconnected2 == 0){
              console.log(rcUID2);
              socket.emit('remote', 0, rcUID2, 0, speed2, name, socket.id);
            }else if(rcUID2!=undefined && isconnected2 == 1){
              socket.emit('remote', 0, rcUID2, 1, speed2, name, socket.id);
            }else if(gCubes[1]!==undefined){
              cubeMove( 1 ,1 , speed2);
            }else{
              console.log('error moving cube 1 forward, either an issue with remote connection or gCubes[1] is undefined.')
            }
          }
        else{
              console.log("error with movingForward function, n!=0 or 1.")
        }

    };

  function movingBack(n){

    console.log('moving back');
    if(n==0){
      if(rcUID!=undefined && isconnected1 == 0){
        console.log(rcUID);
        socket.emit('remote', 2, rcUID, 0, speed1, name, socket.id);
      }else if(rcUID!=undefined && isconnected1 == 1){
        socket.emit('remote', 2, rcUID, 1, speed1, name, socket.id);
      }else if(gCubes[0]!==undefined){
        cubeMove( 2 ,0 , speed1);
      }else{
        console.log('error moving cube 0 movingBack, either an issue with remote connection or gCubes[0] is undefined.')
      }
    }else if(n==1){
          if(rcUID2!=undefined && isconnected2 == 0){
            console.log(rcUID2);
            socket.emit('remote', 2, rcUID2, 0, speed2, name, socket.id);
          }else if(rcUID2!=undefined && isconnected2 == 1){
            socket.emit('remote', 2, rcUID2, 1, speed2, name, socket.id);
          }else if(gCubes[1]!==undefined){
            cubeMove( 2 ,1 , speed2);
          }else{
            console.log('error moving cube 1 movingBack, either an issue with remote connection or gCubes[1] is undefined.')
          }
        }
      else{
            console.log("error with movingBack, n!=0 or 1.")
      }


     };

 function movingR(n){



   let turnspeed1 = Math.floor(parseInt(speed1)*0.5);
   turnspeed1 = '0x' + turnspeed1.toString(16);

   let turnspeed2 = Math.floor(parseInt(speed2)*0.5);
   turnspeed2 = '0x' + turnspeed2.toString(16);

   console.log('moving right');
   if(n==0){
     if(rcUID!=undefined && isconnected1 == 0){
       console.log(rcUID);
       socket.emit('remote', 4, rcUID, 0, turnspeed1, name, socket.id);
     }else if(rcUID!=undefined && isconnected1 == 1){
       socket.emit('remote', 4, rcUID, 1, turnspeed1, name, socket.id);
     }else if(gCubes[0]!==undefined){
       cubeMove( 4 ,0 , turnspeed1);
     }else{
       console.log('error moving cube 0 movingR, either an issue with remote connection or gCubes[0] is undefined.')
     }
   }else if(n==1){
         if(rcUID2!=undefined && isconnected2 == 0){
           console.log(rcUID2);
           socket.emit('remote', 4, rcUID2, 0, turnspeed2, name, socket.id);
         }else if(rcUID2!=undefined && isconnected2 == 1){
           socket.emit('remote', 4, rcUID2, 1, turnspeed2, name, socket.id);
         }else if(gCubes[1]!==undefined){
           cubeMove( 4 ,1 , turnspeed2);
         }else{
           console.log('error moving cube 1 movingR, either an issue with remote connection or gCubes[1] is undefined.')
         }
       }
     else{
           console.log("error with movingR, n!=0 or 1.")
     }

    };

    function movingL(n){


         let turnspeed1 = Math.floor(parseInt(speed1)*0.3);
         turnspeed1 = '0x' + turnspeed1.toString(16);

         let turnspeed2 = Math.floor(parseInt(speed2)*0.3);
         turnspeed2 = '0x' + turnspeed2.toString(16);

         console.log('moving left');
         if(n==0){
           if(rcUID!=undefined && isconnected1 == 0){
             console.log(rcUID);
             socket.emit('remote', 3, rcUID, 0, turnspeed1, name, socket.id);
           }else if(rcUID!=undefined && isconnected1 == 1){
             socket.emit('remote', 3, rcUID, 1, turnspeed1, name, socket.id);
           }else if(gCubes[0]!==undefined){
             cubeMove( 3 ,0 , turnspeed1);
           }else{
             console.log('error moving cube 0 movingR, either an issue with remote connection or gCubes[0] is undefined.')
           }
         }else if(n==1){
               if(rcUID2!=undefined && isconnected2 == 0){
                 console.log(rcUID2);
                 socket.emit('remote', 3, rcUID2, 0, turnspeed2, name, socket.id);
               }else if(rcUID2!=undefined && isconnected2 == 1){
                 socket.emit('remote', 3, rcUID2, 1, turnspeed2, name, socket.id);
               }else if(gCubes[1]!==undefined){
                 cubeMove( 3 ,1 , turnspeed2);
               }else{
                 console.log('error moving cube 1 movingR, either an issue with remote connection or gCubes[1] is undefined.')
               }
             }
           else{
                 console.log("error with movingR, n!=0 or 1.")
           }

       };

function u_notify(notif, uname){
  document.getElementById("notifications").innerHTML += "<div class='notification'>" + notif + "</div>";
  const notifn = document.querySelectorAll(".notification").length - 1;
  const notifid = "notification" + document.querySelectorAll(".notification").length;
  console.log("notification number " + notifn);
  console.log("notification id " + notifid);
  console.log(document.querySelectorAll(".notification")[notifn]);
  document.querySelectorAll(".notification")[notifn].id = notifid;
  setTimeout(function(){

    document.querySelectorAll(".notification")[notifn].classList.toggle("notification-change");

  }, 100);

  document.getElementById(notifid).style.top = notifn*35 + "px";
setTimeout(function(){

  document.getElementById(notifid).classList.remove("notification-change");

  console.log("closing notification");

  if(uname != undefined && joystick_notify.indexOf(uname)!=-1){
    const index = joystick_notify.indexOf(uname);
    joystick_notify.splice(index,1);
    console.log(joystick_notify);
  }
}, 4000);
setTimeout(function(){
  const element = document.getElementById(notifid);
  element.remove();

}, 4500);
}

function j_notify(notif, uname){
  console.log(uname);
  u_notify(notif, uname);
  console.log(joystick_notify.indexOf(uname));

}

   const initialize = () => {


     // Event Listning for GUI buttons.
     for( let cubeId of CUBE_ID_ARRAY ){
         document.getElementById( 'btConnectCube' + ( cubeId + 1) ).addEventListener( 'click', async ev => {
           console.log('clicked to connect cube');
             if( cubeId === 0 && ( gCubes[0] == undefined ||gCubes[0].device == undefined)){
                 console.log("attempting to connect cube 1");
                 gCubes[0] = connectNewCube();
                 console.log('cube 0 connected (cyan)');
                 
             }else if( cubeId === 1 && (gCubes[1] == undefined || gCubes[1].device == undefined)){
               console.log("attempting to connect cube 2");
                 gCubes[1] = connectNewCube();
                 console.log('cube 1 connected (green)');
             }else{
              if( gCubes[cubeId].device != undefined && gCubes[cubeId].moveChar!=undefined){
               console.log("closed bt connection menu");
               launchCubeModal();
               cubecc = cubeId;
              }
             }

           });
       }

       document.getElementById("video_fullscreen").addEventListener("click", expandVideo);

       for(i=0;i<document.getElementsByClassName('tabitem').length;i++){
       document.getElementsByClassName('tabitem')[i].addEventListener('click', setActive, false);
     }


     document.getElementById('toggle').addEventListener('click', async ev =>{
       document.getElementById('cube-control').classList.toggle('bbg');
        document.getElementById('canvas').classList.toggle('inactive');
        document.getElementById('dial').classList.toggle('inactive');
        document.getElementById('spd').classList.toggle('inactive');
       directControl = !directControl;
       console.log(directControl);
     })
     document.getElementById( 'connect' ).addEventListener('click', async ev=>{
       if(typeof isconnected1 == "boolean" && connecting1 == true){
         var user = document.getElementById( 'user' ).value;
         rcname1 = document.getElementById( user ).innerHTML;
         console.log(user);
         if( user != undefined && user != 0){
           document.getElementById( 'connected' ).style.display = 'block';
           document.getElementById('connected').innerHTML = "Connected to " + rcname1;
           document.getElementById('connect').innerHTML = "Disconnect";
           document.getElementById('user').style.visibility = 'hidden';
           socket.emit('user rc',  user, name, activeColor);

           if(connecting1 == true){
             console.log('user slice = ' + user.slice(-2));
             if(user.slice(-2) == "_2"){
               isconnected1 = 1;
               rcUID = user.slice(0, -2);
               document.getElementById( 'RemoteConnected1').src="images/Group 30.svg";

             }else{
               isconnected1 = 0;
               rcUID = user;
               document.getElementById( 'RemoteConnected1').src="images/Group 30.svg";

             }

             console.log("rcuid = " + rcUID);
             console.log("isconnected1 = " + isconnected1 + " ' connecting1 = '" + connecting1);
             document.getElementById("canvas").innerHTML += "<div id='toio3' class='toio'><p>&#129169;</p></div> ";
             addCubeSelectionEvent();
           }
         }

       }else if(typeof isconnected2 == "boolean"  && connecting2 == true){

         var user = document.getElementById( 'user' ).value;
         rcname2 = document.getElementById( user ).innerHTML;
         console.log(user);
         if( user != undefined && user != 0){
           document.getElementById( 'connected' ).style.display = 'block';
           document.getElementById('connected').innerHTML = "Connected to " + rcname2;
           document.getElementById('connect').innerHTML = "Disconnect";
           document.getElementById('user').style.visibility = 'hidden';
           socket.emit('user rc',  user, name, activeColor);
           if(user.slice(-2) == "_2"){
             isconnected2 = 1;
              rcUID2 = user.slice(0, -2);
              document.getElementById( 'RemoteConnected2').src="images/Group 30.svg";

           }else{
             isconnected2 = 0;
             rcUID2 = user;
             document.getElementById( 'RemoteConnected2').src="images/Group 30.svg";

           }

           console.log("rcuid2 = " + rcUID2);

           document.getElementById("canvas").innerHTML += "<div id='toio4' class='toio remote'><p>&#129169;</p></div> ";
           addCubeSelectionEvent();


         }
       }else if(typeof isconnected1 != "boolean" && connecting1 == true){
         console.log('attempting to disconnect');
         var user = document.getElementById( 'user' ).value;
         document.getElementById('connect').innerHTML = "Connect";
         document.getElementById('user').style.visibility = 'visible';
         document.getElementById('connected').style.display = 'none';
         if(connecting1 == true){
           isconnected1 = false;
           socket.emit('rc end', rcUID);

           const element = document.getElementById("toio3");
           element.remove();
           if(activeRobot == 3){
             activeRobot = undefined;
           }

           rcUID = undefined;
           document.getElementById( 'RemoteConnected1').src="images/Group 28.svg";

         }
       }else if(typeof isconnected2 != "boolean" && connecting2 == true){
         console.log('attempting to disconnect');
         var user = document.getElementById( 'user' ).value;
         document.getElementById('connect').innerHTML = "Connect";
         document.getElementById('user').style.visibility = 'visible';
         document.getElementById('connected').style.display = 'none';
         if(connecting2 == true){
           isconnected2 = false;
           socket.emit('rc end', rcUID2);
           const element = document.getElementById("toio4");
           element.remove();
          if(activeRobot == 4){
             activeRobot = undefined;
           }
           rcUID2 = undefined;
           document.getElementById( 'RemoteConnected2').src="images/Group 28.svg";
           addCubeSelectionEvent();
         }
         var user = null;
       }
     })


     document.getElementById('canvas').addEventListener('click', function(e) {
       if(e.target.id == "canvas"){
       getMousePos(gCubes[activeRobot-1]);
     }
     });

    //  document.getElementById('canvas').addEventListener('touchstart', async ev => {
    //    if(e.target.id == "canvas"){
    //    getMousePos(gCubes[activeRobot-1]);
    //  }
    //  });

     document.getElementById('canvas').addEventListener('touchmove', function(e) {
       if(e.target.id == "canvas"){
       getMousePos(gCubes[activeRobot-1]);
     }
     });


            document.getElementById("spin1").addEventListener('click', async ev=> {
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

            })


            // document.getElementById("spin1").addEventListener('touchstart', async ev=> {
            //   if(isconnected1 == 0 && rcUID!=undefined){
            //     socket.emit('spinCube',  rcUID, name, 0);
            //     console.log('remote spin');
            //   }else if(isconnected1 == 1 && rcUID!=undefined){
            //     socket.emit('spinCube',  rcUID, name, 1, socket.id);
            //     console.log('remote spin');
            //   }else {
            //   spinCube( gCubes[0] );
            //   console.log("local spin")
            // }

            // })


            // document.getElementById('party1').addEventListener('touchstart', async ev=>{
            //   if(isconnected1 == 0 && rcUID!=undefined){
            //     socket.emit('party', rcUID, name, 0, socket.id);
            //     console.log('remote party');
            //   }else if(isconnected1 == 1 && rcUID!=undefined){
            //     socket.emit('party', rcUID, name, 1, socket.id);
            //     console.log('remote party');
            //   }else{

            //   partyCube(gCubes[0]);
            // }
            // })

            document.getElementById('party1').addEventListener('click', async ev=>{
              if(isconnected1 == 0 && rcUID!=undefined){
                socket.emit('party', rcUID, name, 0, socket.id);
                console.log('remote party');
              }else if(isconnected1 == 1 && rcUID!=undefined){
                socket.emit('party', rcUID, name, 1, socket.id);
                console.log('remote party');
              }else{

              partyCube(gCubes[0]);
            }
            })

            // document.getElementById('shuffle1').addEventListener('touchstart', async ev=>{
            //   if(isconnected1 == 0 && rcUID!=undefined){
            //     socket.emit('shuffle', rcUID, name, 0, socket.id);
            //     console.log('remote shuffle');
            //   }else if(isconnected1 == 1 && rcUID!=undefined){
            //     socket.emit('shuffle', rcUID, name, 1, socket.id);
            //     console.log('remote shuffle');
            //   }else{
            //   cubeShuffle(gCubes[0]);
            // }
            // })
            document.getElementById('shuffle1').addEventListener('click', async ev=>{
              if(isconnected1 == 0 && rcUID!=undefined){
                socket.emit('shuffle', rcUID, name, 0, socket.id);
                console.log('remote shuffle');
              }else if(isconnected1 == 1 && rcUID!=undefined){
                socket.emit('shuffle', rcUID, name, 1, socket.id);
                console.log('remote shuffle');
              }else{
              cubeShuffle(gCubes[0]);
            }
            })

            document.getElementById("spin2").addEventListener('click', async ev=> {
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

            })


            // document.getElementById("spin2").addEventListener('touchstart', async ev=> {
            //   if(isconnected2 == 0 && rcUID2!=undefined){
            //     socket.emit('spinCube',  rcUID2, name, 0, socket.id);
            //     console.log('remote spin');
            //   }else if(isconnected2 == 1 && rcUID2!=undefined){
            //     socket.emit('spinCube',  rcUID2, name, 1, socket.id);
            //     console.log('remote spin');
            //   }else {
            //   spinCube( gCubes[1] );
            //   console.log("local spin")
            // }

            // })


            // document.getElementById('party2').addEventListener('touchstart', async ev=>{
            //   if(isconnected2 == 0 && rcUID2!=undefined){
            //     socket.emit('party', rcUID2, name, 0, socket.id);
            //     console.log('remote party');
            //   }else if(isconnected2 == 1 && rcUID2!=undefined){
            //     socket.emit('party', rcUID2, name, 1, socket.id);
            //     console.log('remote party');
            //   }else{

            //   partyCube(gCubes[1]);
            // }
            // })

            document.getElementById('party2').addEventListener('click', async ev=>{
              if(isconnected2 == 0 && rcUID2!=undefined){
                socket.emit('party', rcUID2, name, 0, socket.id);
                console.log('remote party');
              }else if(isconnected2 == 1 && rcUID2!=undefined){
                socket.emit('party', rcUID2, name, 1, socket.id);
                console.log('remote party');
              }else{

              partyCube(gCubes[1]);
            }
            })

            // document.getElementById('shuffle2').addEventListener('touchstart', async ev=>{
            //   if(isconnected2 == 0 && rcUID2!=undefined){
            //     socket.emit('shuffle', rcUID2, name, 0, socket.id);
            //     console.log('remote shuffle');
            //   }else if(isconnected2 == 1 && rcUID2!=undefined){
            //     socket.emit('shuffle', rcUID2, name, 1, socket.id);
            //     console.log('remote shuffle');
            //   }else{
            //   cubeShuffle(gCubes[1]);
            // }
            // })
            document.getElementById('shuffle2').addEventListener('click', async ev=>{
              if(isconnected2 == 0 && rcUID2!=undefined){
                socket.emit('shuffle', rcUID2, name, 0, socket.id);
                console.log('remote shuffle');
              }else if(isconnected2 == 1 && rcUID2!=undefined){
                socket.emit('shuffle', rcUID2, name, 1, socket.id);
                console.log('remote shuffle');
              }else{
              cubeShuffle(gCubes[1]);
            }
            })

            for(i=0;i<document.getElementsByClassName('colors').length;i++){
            document.getElementsByClassName('colors')[i].addEventListener('click', setActiveColor, false);
            //document.getElementsByClassName('colors')[i].addEventListener('touchstart', setActiveColor, false);
          }

          document.getElementById('RemoteConnected1').addEventListener('click', async ev=>{
            document.getElementById('modalbgrc').style.display = "block";
            connecting1 = true;
            if(typeof isconnected1 != "boolean"){
              document.getElementById( 'connected' ).style.display = 'block';
              document.getElementById('connected').innerHTML = "Connected to " + rcname1;
              document.getElementById('connect').innerHTML = "Disconnect";
              document.getElementById('user').style.visibility = 'hidden';
            }else{
              var user = document.getElementById( 'user' ).value;
              document.getElementById('connect').innerHTML = "Connect";
              document.getElementById('user').style.visibility = 'visible';
              document.getElementById('connected').style.display = 'none';
            }
          })

          // document.getElementById('RemoteConnected1').addEventListener('touchstart', async ev=>{
          //   document.getElementById('modalbgrc').style.display = "block";
          //   connecting1 = true;
          //   if(typeof isconnected1 != "boolean"){
          //     document.getElementById( 'connected' ).style.display = 'block';
          //     document.getElementById('connected').innerHTML = "Connected to " + rcname1;
          //     document.getElementById('connect').innerHTML = "Disconnect";
          //     document.getElementById('user').style.visibility = 'hidden';
          //   }else{
          //     var user = document.getElementById( 'user' ).value;
          //     document.getElementById('connect').innerHTML = "Connect";
          //     document.getElementById('user').style.visibility = 'visible';
          //     document.getElementById('connected').style.display = 'none';
          //   }
          // })

          document.getElementById('RemoteConnected2').addEventListener('click', async ev=>{
            document.getElementById('modalbgrc').style.display = "block";
            connecting2 = true;
            console.log(isconnected2);
            if(typeof isconnected2 != "boolean"){
              document.getElementById( 'connected' ).style.display = 'block';
              document.getElementById('connected').innerHTML = "Connected to " + rcname2;
              document.getElementById('connect').innerHTML = "Disconnect";
              document.getElementById('user').style.visibility = 'hidden';
            }else{
              var user = document.getElementById( 'user' ).value;
              document.getElementById('connect').innerHTML = "Connect";
              document.getElementById('user').style.visibility = 'visible';
              document.getElementById('connected').style.display = 'none';
            }
          })

          // document.getElementById('RemoteConnected2').addEventListener('touchstart', async ev=>{
          //   document.getElementById('modalbgrc').style.display = "block";
          //   connecting2 = true;
          //   if(typeof isconnected2 != "boolean"){
          //     document.getElementById( 'connected' ).style.display = 'block';
          //     document.getElementById('connected').innerHTML = "Connected to " + rcname2;
          //     document.getElementById('connect').innerHTML = "Disconnect";
          //     document.getElementById('user').style.visibility = 'hidden';
          //   }else{
          //     var user = document.getElementById( 'user' ).value;
          //     document.getElementById('connect').innerHTML = "Connect";
          //     document.getElementById('user').style.visibility = 'visible';
          //     document.getElementById('connected').style.display = 'none';
          //   }
          // })

          for(i=0; i<document.querySelectorAll(".modalbg").length; i++){
            document.querySelectorAll('.modalbg')[i].addEventListener('click', closeModal);
            //document.querySelectorAll('.modalbg')[i].addEventListener('touchstart', closeModal);

          }

          document.getElementById('close').addEventListener('click', closeModal);

          // document.getElementById('close').addEventListener('touchstart', closeModal);
          document.getElementById('cancel').addEventListener('click', closeModal);

         // document.getElementById('cancel').addEventListener('touchstart', closeModal);
          //
          document.getElementById('disconnect').addEventListener('click', closeModal);
          //
          // document.getElementById('disconnect').addEventListener('touchstart', closeModal);

          //
          document.getElementById('disconnect').addEventListener('click', function(){disconnect()});

         // document.getElementById('disconnect').addEventListener('touchstart', function(){disconnect()});

          document.getElementById('disconnect').addEventListener('click', function(){disconnect()});
   }

function expandArrow(){
  console.log("mouse over");
  document.getElementById("video_fullscreen").classList.add("video_fullscreen_expanded");
  document.getElementById("expand").style.transition = "opacity 1s ease-out 0.7s, margin-top 1s ease-in-out 0.3s";
  document.getElementById("video_fullscreen").style.transition = "height 1s ease-in 0s";

  document.getElementById("expand").classList.add("expnd_txt");
}

function collapseArrow(){
  console.log("mouse leave");
  document.getElementById("video_fullscreen").classList.remove("video_fullscreen_expanded");
  document.getElementById("expand").style.transition = "opacity 0.7s ease , margin-top 1s ease-in-out ";
  document.getElementById("video_fullscreen").style.transition = "height .9s ease-in .2s";


  document.getElementById("expand").classList.remove("expnd_txt");

}

function collapseVideo(){
  console.log("collapse video");

  document.getElementById("arrow").innerHTML = "&#129171;";
  if(window.innerWidth<=1200){
    document.getElementById("arrow").style.marginTop = "1px";
    document.getElementById("meet").style.height = "48vh";
    console.log("small window");
  }else{
  document.getElementById("arrow").style.marginTop = "-2px";
  document.getElementById("meet").style.height = "50vh";
  }
  document.querySelector(".controls").style.display = "flex";

  // document.getElementById("video_fullscreen").addEventListener("mouseover", expandArrow);
  // document.getElementById("video_fullscreen").addEventListener("mouseleave", collapseArrow); 
  document.getElementById("video_fullscreen").removeEventListener("click", collapseVideo);
  document.getElementById("video_fullscreen").addEventListener("click", expandVideo);
}

function expandVideo(){
  console.log("click");
  document.getElementById("meet").style.height = "90vh";
  document.getElementById("arrow").innerHTML = "&#129169;";
  if(window.innerWidth<=1200){
    document.getElementById("arrow").style.marginTop = "-36px";
    console.log("small window");
  }else{
    document.getElementById("arrow").style.marginTop = "-36px";
  }
  document.querySelector(".controls").style.display = "none";
  // setTimeout(function() {
  //   document.getElementById("video_fullscreen").removeEventListener("mouseover", expandArrow);
  //   document.getElementById("video_fullscreen").removeEventListener("mouseleave", collapseArrow);  
  // }, 1000);
  document.getElementById("video_fullscreen").removeEventListener("click", expandVideo);
  document.getElementById("video_fullscreen").addEventListener("click", collapseVideo);
}

function closeModal(e){
  if((e.target.id == "modalbgrc" || e.target.id == "close" || e.target.id =="modalbgcc" || e.target.id=="cancel" || e.target.id =="disconnect")){
    for(i=0; i<document.querySelectorAll(".modalbg").length; i++){
    if(document.querySelectorAll(".modalbg")[i].style.display != "none"){
        document.querySelectorAll(".modalbg")[i].style.display = "none";
  }
  }

  console.log("closing modal");
  console.log(document.querySelectorAll("#modalbg").length);
  connecting2 = false;
  connecting1 = false;
}
}

function launchCubeModal(){
  document.getElementById("modalbgcc").style.display = "block";

}

function onDisconnected(n){
  if(gCubes[n-1]!=undefined){
 alert("Error: Connection to cube " + n + " interrupted");
 document.getElementById( 'btConnectCube' + n).src="images/Group 29.svg";

 gCubes[n-1] = undefined;
 cubecc = undefined;
 socket.emit('btended', name, n-1);

 const toioID = "toio" + n;
 console.log(toioID);
 const element = document.getElementById(toioID);
 element.remove();
}

}

function disconnect(){
  n = cubecc;
  console.log("disconnecting robot");
  document.getElementById( 'btConnectCube' + (n+1)).src="images/Group 29.svg";
  const toioID = "toio" + (n+1);
  console.log(toioID);
  const element = document.getElementById(toioID);
  element.remove();

  gCubes[n].device.gatt.disconnect();
  gCubes[n] = undefined;
  cubecc = undefined;
  socket.emit('btended', name, n);


}

   socket.on("connect", () => {
     console.log(socket.connected); // true
     socket.emit("handshake");
   });

   socket.on("ulist connect", (activeUsers) => {
     userlist = activeUsers;
     console.log(userlist);
     console.log(userlist.length);
   });



   socket.on('handshake', (activeUsers) =>{
     console.log(activeUsers);
     document.getElementById('user').length = 0;
     for(let i=0;i<activeUsers.length;  i++){
    if(activeUsers[i].name !== undefined && activeUsers[i].userID != socket.id){
    if(activeUsers[i].bt1 == true){
     console.log(i, " ", activeUsers[i].name);
     select = document.getElementById('user');
     var opt = document.createElement('option');

     opt.setAttribute('id', activeUsers[i].userID);
     opt.value = activeUsers[i].userID;
     opt.innerHTML = activeUsers[i].name + " (1)";
     select.appendChild(opt);
     console.log('added ' + activeUsers[i].name);
   }

   if(activeUsers[i].bt2 == true){

     console.log(i, " ", activeUsers[i].name);
     select = document.getElementById('user');
     var opt = document.createElement('option');
     //fix this, it's wrong
     opt.setAttribute('id', activeUsers[i].userID + "_2");
     opt.value = activeUsers[i].userID + "_2";
     opt.innerHTML = activeUsers[i].name + " (2)";
     select.appendChild(opt);
     console.log('added ' + activeUsers[i].name);
   }
   }
   }

   })

    socket.on('user list', (activeUsers, newUser, cube) => {
      let usersList = activeUsers;
      console.log(name);
      console.log(newUser);
      const sessionID = socket.id;
      console.log("session ID " + sessionID);
      if(sessionID !== newUser.userID){
        if(cube==0){
      select = document.getElementById('user');
      var opt = document.createElement('option');
      opt.setAttribute('id', newUser.userID);
      opt.value = newUser.userID;
      opt.innerHTML = newUser.name + " (1)";
      select.appendChild(opt);
      console.log('adding cube 1');
      console.log(activeUsers);
    }
       else if(cube==1){
         select = document.getElementById('user');
         var opt = document.createElement('option');
         opt.setAttribute('id', newUser.userID + "_2");
         opt.value = newUser.userID + "_2";
         opt.innerHTML = newUser.name + " (2)";
         select.appendChild(opt);
         console.log('adding cube 2');
         console.log(activeUsers);
         }
    }
   console.log(usersList, " ", newUser);
     });



    socket.on('user left', (userName, UID) => {
    console.log(userName, " left the room");
    if(document.getElementById(UID) !=null){
      var x = document.getElementById(UID);
      x.remove(x.selectedIndex);
    }
    if(document.getElementById(UID + "_2") !=null){
     var x= document.getElementById(UID + "_2");
     x.remove(x.selectedIndex);
    }
    if(document.getElementById(userName) != null){
    var x = document.getElementById(userName);
    x.remove(x.selectedIndex);
  }
  var un2 = userName + " 2";
  if(document.getElementById(un2) != null){
    var y = document.getElementById(un2);
    console.log("remove " + y);
    y.remove(y.selectedIndex);
  }
  if(rcUID == UID){
    alert("Connection to " + rcname1 +" was interrupted, ending remote control.");
    isconnected1 = false;
    const element = document.getElementById("toio3");
    element.remove();
    rcUID = undefined;
    document.getElementById( 'RemoteConnected1').src="images/Group 28.svg";
    if(activeRobot == 3){
       activeRobot = undefined;
     }
   }
   if(rcUID2 == UID){
     alert("Connection to " + rcname2 + " was interrupted, ending remote control.");
     isconnected2 = false;
     const element = document.getElementById("toio4");
     element.remove();
     rcUID2 = undefined;
     document.getElementById( 'RemoteConnected2').src="images/Group 28.svg";
     if(activeRobot == 4){
        activeRobot = undefined;
      }
    }

    });

  socket.on('user disconnected cube', (UID, cube) => {
  console.log(UID, " disconnected cube ", cube);
  if(document.getElementById(UID) !=null && cube == 0){
    var x = document.getElementById(UID);
    x.remove(x.selectedIndex);
  }
  if(document.getElementById(UID + "_2") !=null && cube==1){
   var x= document.getElementById(UID + "_2");
   x.remove(x.selectedIndex);
  }
  if(rcUID == UID && isconnected1 == cube){
    alert("Connection to " + rcname1 + " was interrupted, ending remote control.");
    isconnected1 = false;
    rcUID = undefined;
    const element = document.getElementById("toio3");
    element.remove();
    document.getElementById( 'RemoteConnected1').src="images/Group 28.svg";
    if(activeRobot == 3){
       activeRobot = undefined;
     }
  }

  if(rcUID2 == UID && isconnected2 == cube){
    alert("Connection to " + rcname2 +" was interrupted, ending remote control.");
    isconnected2 = false;
    const element = document.getElementById("toio4");
    element.remove();
    rcUID2 = undefined;
    document.getElementById( 'RemoteConnected2').src="images/Group 28.svg";
    if(activeRobot == 4){
       activeRobot = undefined;
     }
   }

});




      socket.on('user rc', (userID, ruser, rname, rcolor) =>{
          //rcUID = userID;
          if(socket.id == userID){
            //rcUID = undefined;

          }else{

          }
          console.log(userID);
          pUID.push(ruser);
          console.log("remote connection");
          socket.emit('rpos', toiox[0], toioy[0], 0, name, pUID[i], directControl, a);
      });

      socket.on('user rc 2', (userID2) =>{
          rcUID2 = userID2;
          if(socket.id == userID2){
            rcUID2 = undefined;
          }
          console.log(rcUID2);

      });

let joystick_notify = [];
socket.on('joystick', (nCube, x, y,speed, uname, controllingUID) =>{
  const cube = gCubes[nCube];

   if( cube !== undefined && socket.id != controllingUID){
   moveJoystick(nCube, x,y, false, speed);
   if(joystick_notify.indexOf(uname) == -1){
     const notification = uname + " moving your robot " + (nCube+1) + " with joystick.";
     console.log("joystick notification");
     joystick_notify.push(uname);
     j_notify(notification, uname);
   }


   }

});


socket.on('r', (nCube, characteristic, rbuf, uname) =>{
  btCube(nCube, characteristic, rbuf);
  console.log('remote control', uname);
  u_notify(uname + " moving your robot " + (nCube+1) + " with canvas control.");
  if(rbuf[0] == 0x03){
    console.log(uname + " moved your toio with canvas control");
  }else if(rbuf[0] == 0x01){
    // u_notify(uname + " moving your robot " + (nCube+1) + " with arrows.");

  }
});

socket.on('rpos', (x, y, an, num, uname, remID, dirCon, a) =>{
 console.log(remID);
 console.log(rcUID);
console.log("does remote uid equal?");
console.log(rcUID == remID);
console.log("cube number =" + num);
console.log("isconnectd1= " + isconnected1);
  if(remID != socket.id){

  if(num==0 && isconnected1 == 0 && rcUID==remID){
    console.log('drawing toio 3 for remote toio 0');
  drawRemoteToio(3, x,y, an);
  
}else if(num == 1 && isconnected1 == 1 && rcUID==remID){
  console.log('drawing toio 3 for remote toio 1');

  drawRemoteToio(3, x,y, an);
}

if(num == 0 && isconnected2 == 0 && rcUID2==remID){
  console.log('drawing toio 4 for remote toio 0');

  drawRemoteToio(4, x,y, an);
}else if(num == 1 && isconnected2 == 1 && rcUID2==remID){
  console.log('drawing toio 4 for remote toio 1');

  drawRemoteToio(4, x,y, an);
  }
  //cubepos = [a[7], a[8], a[9], a[10]];
  // if(dirCon == true){
  //   let buf4 = new Uint8Array([0x03,0x00,0x05,0x00,speed1,0x00, 0x00,x[0], x[1],y[0],y[1],an[0],an[1]]);
  //   console.log(buf4);
  //     btCube(0, 0, buf4);
  // }
}
  // console.log('rpos ' + x + " , " + y);
});

socket.on('dc', (x, y, an, uname, dirCon, speed) =>{
  if(uname != name){
  if(dirCon == true){
    let buf4 = new Uint8Array([0x03,0x00,0x05,0x00,speed,0x00, 0x00,x[0], x[1],y[0],y[1],an[0],an[1]]);
    console.log(uname + ' moved your toio with dc');
    let matx = String(parseInt(x[1])) + String(parseInt(x[0])-70);
    let maty = String(parseInt(y[1])) + String(parseInt(y[0])-70);
    console.log(uname + " moved your toio to x: " + matx + " , y: " + maty);
    // console.log(buf4);
      btCube(0, 0, buf4);
  }
}
  // console.log('dc ' + x + " , " + y);
});

socket.on('spinCube', (user, uname, n, rq_UID) =>{
  console.log('remote cube spin');
  if(socket.id != rq_UID && gCubes[n] != undefined){
    u_notify(uname + " spinning your robot " + (n+1) + ".");

    spinCube(gCubes[n]);
  }
})

socket.on('party', (user, uname, n, rq_UID) =>{
  console.log('remote party');
  if(socket.id != rq_UID && gCubes[n] != undefined){
    partyCube(gCubes[n]);
    u_notify(uname + " partying with your robot " + (n+1) + ".");

  }
})

socket.on('shuffle', (user, uname, n, rq_UID) =>{
  console.log('remote shuffle');
  if(socket.id != rq_UID && gCubes[n] != undefined){
    cubeShuffle(gCubes[n]);
    u_notify(uname + " shuffling your robot " + (n+1) + ".");

  }
})

socket.on('forward', (nCube, speed, uname, userid) => {
const cube = gCubes[nCube];
console.log('forward remote');
console.log(socket.id);
console.log(userid);
if( cube !== undefined && userid != socket.id){
cubeMove( 1, nCube, speed);
console.log('forward remote');
u_notify(uname + " moving your robot " + (nCube+1) + " forward.");

}


 });

 socket.on('back', (nCube, speed, uname, userid) => {
 const cube = gCubes[nCube];
 console.log('back');
 if( cube !== undefined && userid != socket.id){
 cubeMove( 2, nCube, speed );
 u_notify(uname + " moving your robot " + (nCube+1) + " backward.");

 }
  });

  socket.on('left', (nCube, speed, uname, userid) => {
  const cube = gCubes[nCube];
  console.log('left');
  if( cube !== undefined && userid != socket.id){
  cubeMove( 3, nCube, speed );
  u_notify(uname + " moving your robot " + (nCube+1) + " left.");

  }

   });

   socket.on('right', (nCube, speed, uname) => {
   const cube = gCubes[nCube];
   console.log('right');
   if( cube !== undefined && rcUID != socket.id){
   cubeMove( 4, nCube , speed);
   u_notify(uname + " moving your robot " + (nCube+1) + " right.");

   }

    });

    socket.on('stop', (nCube, speed, uname) => {
    const cube = gCubes[nCube];
    console.log('stop');
    if( cube !== undefined && rcUID != socket.id){
    cubeStop( nCube );
    }

     });

     socket.on('charge', (nCube, speed) => {
     const cube = gCubes[nCube];
     console.log('charge');
     if( cube !== undefined ){
     cubeMove( 5, nCube , 0xFF);
     }

      });

socket.on('remote user', (rUID, rname, rcolor) => {
  pUID.push(rUID);
  console.log("remote user connected " + pUID);
    console.log(rname + " connected remotely");
    console.log(rname + ' connected to your toio ' + rcolor);
    u_notify(rname + " connected to your robot remotely.");

  //  document.getElementsByClassName('connected_user')[0].innerHTML += "<h5 style='color:"+rcolor +"' id='user_" +rUID + "'>"+ rname + "</h5>";
});

socket.on('rc end', (rUID) =>{
  const index = pUID.indexOf(rUID);
  //const index1 = pUID.indexOf(rUID);
if (index > -1) {
  pUID.splice(index, 1);
}

if (index1 > -1) {
  pUID.splice(index, 1);
}
console.log('remote user disconnected, removing ' + rUID +" from list of connected users: " + pUID);

if(document.getElementById('user_' + rUID) !=null){
document.getElementById('user_' + rUID).innerHTML = " ";
}
// if(document.getElementById('user_' + rUID2) !=null){
// document.getElementById('user_' + rUID2).innerHTML = " ";
// }
})

slider1.oninput = function() {
val = parseInt(document.getElementById("slider1").value);
speed1 = littleEndian(val)[0];
// console.log((254).toString(16))
console.log(val);
console.log(speed1);
}

slider2.oninput = function() {
val = parseInt(document.getElementById("slider2").value);
speed2 = littleEndian(val)[0];
// console.log((254).toString(16))
console.log(val);
console.log(speed2);
}


// slider2.oninput = function(){
//   s2val = parseInt(slider2.value);
//   angle = littleEndian(s2val);
//   console.log("angle: " + s2val);
//   console.log("angle: " + angle);
//   changeAngle();
// }

   initialize();
