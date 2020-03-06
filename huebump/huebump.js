// huebump code
//IP of the bridge
let bridgeIP;

//JSON data about lights
let lightInfo;
let stopLights = false;
let on = true;
let brightness = 254;
let transitiontime = 0;
let lightAmount;
let songBPM = 100;

//TEMPORARY
let userID = "b6yoDz5SoZXLpsh-kgkuBVCuzz0BdTljllp--WfK";

//Check cookies
console.log(document.cookie);

// setting all buttons to their respective functions
$(document).ready(function() {
  //api call returns json. internalipaddress is the IP of the bridge
  $(".get-lights").click(function() {
    $(".get-lights").html(
      "<img class='load-img d-none d-md-block' src='./speaker.png'>"
    );
    $.getJSON("https://discovery.meethue.com", function(data) {
      //checks if IP value exists for bridge. returns error to the button if not
      if (data.length !== 0 && data[0].hasOwnProperty("internalipaddress")) {
        bridgeIP = data[0].internalipaddress;

        //sets cookie so site remembers bridgeIP and userID
        document.cookie = "bridgeIP = " + bridgeIP + ";";

        console.log("Local IP of hue bridge 0: " + data[0].internalipaddress);

        //get user ID
        //userID = getUserID(bridgeIP);

        //get lights
        getLights(bridgeIP, userID);
      } else {
        $(".get-lights").html("Could not find hue bridge. Try again?");
      }
    });
  });

  $(".strobe-lights").click(function() {
    setLightBPM("test");
  });
  $(".stop-lights").click(function() {
    stopLights = !stopLights;
  });
  $(".transition-set").click(function() {
    setTransitionTime();
  });
  $(".getUser").click(function() {
    alert(document.cookie);
  });
});

//gets the cached userID for the bridge from cookies, or creates one if it does not exist already
function getUserID(bridgeIP) {
  let send = JSON.stringify({ devicetype: "huebump" });
  $.post("http://" + bridgeIP + "/api", send, function(data) {
    console.log(data);
    if (data[0].hasOwnProperty("success")) {
      console.log("Found username: " + data[0].success.username);
      //sets userID cookie
      document.cookie = "userID = " + userID + ";";

      return data[0].success.username;
    }
  });
}

//get all lights connected to the bridge into an array
function getLights(bridgeIP, userID) {
  let apiURL = "http://" + bridgeIP + "/api/" + userID + "/lights";
  console.log("getLights() URL is : " + apiURL);

  $.getJSON(apiURL, function(data) {
    console.log(data);
    let lightAmount = Object.keys(data).length;
    console.log("There are " + lightAmount + " lights.");
  });
}

function setLightBPM(type) {
  //sets the repeat delay to beats per second

  //in one minute, there
  timeout = 30000 / songBPM;
  let bpmURL = "http://" + bridgeIP + "/api/" + userID + "/lights/4/state";
  console.log(bpmURL);

  let ajaxContent;
  if (on == true) {
    ajaxContent = JSON.stringify({
      on: false,
      bri: brightness,
      transitiontime: transitiontime
    });
  } else {
    ajaxContent = JSON.stringify({
      on: true,
      bri: brightness,
      transitiontime: transitiontime
    });
  }
  console.log("sending " + !on);

  $.ajax({
    url: bpmURL,
    type: "PUT",
    data: ajaxContent,
    success: function() {
      on = !on;
      console.log("Lights on: " + !on);
    }
  });
  console.log("BPM is " + songBPM);

  if (stopLights == true) {
    return;
  }
  setTimeout(setLightBPM, timeout);
}



//tap to get bpm instead of using mic
function bpmTapper() {
  var count = 0;
  var msecsFirst = 0;
  var msecsPrevious = 0;

  function ResetCount() {
    count = 0;
    document.TAP_DISPLAY.T_AVG.value = "";
    document.TAP_DISPLAY.T_TAP.value = "";
    document.TAP_DISPLAY.T_RESET.blur();
  }

  function TapForBPM(e) {
    document.TAP_DISPLAY.T_WAIT.blur();
    timeSeconds = new Date();
    msecs = timeSeconds.getTime();
    if (msecs - msecsPrevious > 1000 * document.TAP_DISPLAY.T_WAIT.value) {
      count = 0;
    }

    if (count == 0) {
      document.TAP_DISPLAY.T_AVG.value = "First Beat";
      document.TAP_DISPLAY.T_TAP.value = "First Beat";
      msecsFirst = msecs;
      count = 1;
    } else {
      bpmAvg = (60000 * count) / (msecs - msecsFirst);
      document.TAP_DISPLAY.T_AVG.value = Math.round(bpmAvg * 100) / 100;
      document.TAP_DISPLAY.T_WHOLE.value = Math.round(bpmAvg);
      count++;
      document.TAP_DISPLAY.T_TAP.value = count;
    }
    msecsPrevious = msecs;
    return true;
  }
  document.onkeypress = TapForBPM;
}

// Using getUserMedia with the Web Audio API

//PIPE WEB MIC INTO AUDIO API THEN GET BPM

// Chrome supports live microphone input from getUserMedia() to the Web Audio API for real-time effects. Piping microphone input to the Web Audio API looks like this:

// window.AudioContext = window.AudioContext ||
//                       window.webkitAudioContext;

// const context = new AudioContext();

// navigator.mediaDevices.getUserMedia({audio: true}).
//   then((stream) => {
//     const microphone = context.createMediaStreamSource(stream);
//     const filter = context.createBiquadFilter();
//     // microphone -> filter -> destination
//     microphone.connect(filter);
//     filter.connect(context.destination);
// });

// https://www.html5rocks.com/en/tutorials/getusermedia/intro/
// https://webaudiodemos.appspot.com/input/index.html




//initiates listener for beatdetektor
var context, analyser, bpm, bpmDisplay, currentBPMDisplay;
var SAMPLE_SIZE = 2048;

function startListening() {
  context = new (window.AudioContext || window.webkitAudioContext)();
  analyser = context.createAnalyser();
  bpmDisplay = document.getElementById("bpmDisplay");
  bpm = new BeatDetektor(85, 169);

  analyser.fftSize = SAMPLE_SIZE;

  navigator.webkitGetUserMedia(
    { audio: true },
    function(stream) {
      var microphone = context.createMediaStreamSource(stream);

      // Demo to:
      // connect source through a series of filters
      //var compressor = context.createDynamicsCompressor();
      //var reverb = context.createConvolver();
      //var volume = context.createGainNode();

      //microphone.connect(compressor);
      //compressor.connect(reverb);
      //reverb.connect(volume);
      //volume.connect(context.destination);

      // microphone -> filter -> destination.
      microphone.connect(analyser);

      bpmUpdate();
    },
    function() {
      alert("fail");
    }
  );
}

function bpmUpdate(time) {
  // Get the frequency-domain data
  var data = new Uint8Array(SAMPLE_SIZE),
    length = data.length,
    sum,
    average,
    bar_width,
    scaled_average;
  analyser.getByteFrequencyData(data);

  // Beatdetektor api
  bpm.process(time / 1000, data);
  songBPM = bpm.win_bpm_int_lo;
  bpmDisplay.innerHTML = bpm.win_bpm_int_lo;

  window.requestAnimationFrame(bpmUpdate);
}
