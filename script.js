// clock faces
const LOCALFACE = document.querySelector("#localFace");
const TPEFACE = document.querySelector("#tpeFace");

// clock hands
const LOCALHOURHAND = document.querySelector("#localHour");
const TPEHOURHAND = document.querySelector("#tpeHour");
const MINUTEHAND = document.querySelector("#minute");

// icons
const LOCALSUN = document.querySelector("#localSun");
const LOCALMOON = document.querySelector("#localMoon");
const TPESUN = document.querySelector("#tpeSun");
const TPEMOON = document.querySelector("#tpeMoon");

//https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
//create object for current date and time of local location
let localTime = new Date();

//create object for current date and time of Taipei
let tpeTimeZone = new Date().toLocaleString("en-US", {timeZone: "Asia/Shanghai"});
let tpeTime = new Date(tpeTimeZone);

//store current time from date object
let localHr = localTime.getHours();
// let localHr = 3;
let localMin = localTime.getMinutes();
let localSec = localTime.getSeconds(); //using this only for position calc
let tpeHr = tpeTime.getHours();

//convert time to degrees for position
let localHrPos = (localHr*360/12) + (localMin*(360/60)/12);
let localMinPos = (localMin*360/60);
let tpeHrPos = (tpeHr*360/12) + (localMin*(360/60)/12);

// display time when loading
function timeDisplay(){
  // convert hrs and min to minute position
  localHrPos = localHrPos + ((360/12)/60); //360deg over 12hrs over 60 mins
  localMinPos = localMinPos + ((360/60)); //360deg over 60mins
  tpeHrPos = tpeHrPos + ((360/12)/60); //360deg over 12hrs over 60 mins

  // transform hand positions
  LOCALHOURHAND.style.transform = "rotate(" + localHrPos + "deg)";
  TPEHOURHAND.style.transform = "rotate(" + tpeHrPos+ "deg)";
  MINUTEHAND.style.transform = "rotate(" + localMinPos + "deg)";
}

// delay interval and display time first
setTimeout(function(){
  timeDisplay();
}, 1);

//grab time every min (aka 60000 ms)
var interval = setInterval(timeDisplay, 60000);


// GRAPHIC DISPLAY BELOW

//face gradient display
// let localFaceOpacity = (localHr-11)/24;
// let tpeFaceOpacity = (tpeHr+24-11)/24;
//
// LOCALFACE.style.fill = "#263238";
// LOCALFACE.style.opacity = localFaceOpacity;
//
// TPEFACE.style.fill = "#313C42";
// TPEFACE.style.opacity = tpeFaceOpacity;

// if local hour is great than 6:00 and less than 18:00
if(6 <= localHr && localHr < 18){
  //display sun
  LOCALSUN.classList.remove("hide");
  LOCALSUN.classList.add("local");

  //hide moon
  LOCALMOON.classList.remove("local");
  LOCALMOON.classList.add("hide");

  //display morning face color
  LOCALFACE.classList.remove("local-face-night");
  LOCALFACE.classList.add("local-face-morning");
} else { //night time
  //hide sun
  LOCALSUN.classList.remove("local");
  LOCALSUN.classList.add("hide");

  //display moon
  LOCALMOON.classList.remove("hide");
  LOCALMOON.classList.add("local");

  //display night color
  LOCALFACE.classList.remove("local-face-morning");
  LOCALFACE.classList.add("local-face-night");
};



if(6 <= tpeHr && tpeHr < 18){
  TPESUN.classList.remove("hide");
  TPESUN.classList.add("tpe");

  TPEMOON.classList.remove("tpe");
  TPEMOON.classList.add("hide");

  TPEFACE.classList.remove("tpe-face-night");
  TPEFACE.classList.add("tpe-face-morning");
} else{
  TPESUN.classList.remove("tpe");
  TPESUN.classList.add("hide");

  TPEMOON.classList.remove("hide");
  TPEMOON.classList.add("tpe");

  TPEFACE.classList.remove("tpe-face-morning");
  TPEFACE.classList.add("tpe-face-night");
};
