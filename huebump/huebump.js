// huebump code
//IP of the bridge
let bridgeIP = "";
let userID = "";




$.getJSON("https://discovery.meethue.com", function(data){         
            
    //checks if IP value exists for bridge. returns error to the button if not
        if(data.length !== 0 && data[0].hasOwnProperty('internalipaddress')) {
                bridgeIP = data[0].internalipaddress;
                console.log("Local IP of hue bridge 0: " + data[0].internalipaddress);                
                //get user ID
                userID = getUserID(bridgeIP);
                //get lights
        }
        else{
            $(".get-lights").html("Could not find hue bridge. Try again?")
        }
    });


//api call returns json. internalipaddress is the IP of the bridge
$(".get-lights").click(function(){
    $(".get-lights").html("<img class='load-img d-none d-md-block' src='./speaker.png'>");
      $.getJSON("https://discovery.meethue.com", function(data){         
            
    //checks if IP value exists for bridge. returns error to the button if not
        if(data.length !== 0 && data[0].hasOwnProperty('internalipaddress')) {
                bridgeIP = data[0].internalipaddress;
                console.log("Local IP of hue bridge 0: " + data[0].internalipaddress); 
                
                //get user ID
                userID = getUserID(bridgeIP);
                //get lights
        }
        else{
            $(".get-lights").html("Could not find hue bridge. Try again?")
        }
    });
})



//gets the cached userID for the bridge from cookies, or creates one if it does not exist already
function getUserID(bridgeIP){
    let send = JSON.stringify({"devicetype":"huebump"});
    $.post(
        "http://"+bridgeIP+"/api", 
        send,
        function(data){
            console.log(data);
            if(data[0].hasOwnProperty("success")){
                
                console.log("Found username: " + data[0].success.username);
                return data[0].success.username;
            }
    });
}



//get all lights connected to the bridge into an array
function getLights(bridgeIP, userID){

    let apiURL = bridgeIP + '/api/' + userid
        $.getJSON(
        apiURL,
        function(data) {
            console.log(data);
            var size = Object.keys(data).length;
            console.log(size);
            $('#light_container').empty();

            var toAdd = document.createDocumentFragment();
            for (var i = 0; i < size; i++) {
                var obj = data[i + 1];
                console.log(obj.state.on);
                var newDiv = document.createElement('a');
                newDiv.id = i + 1;
                newDiv.setAttribute('onclick', 'toggle_on();');
                newDiv.innerHTML = 'Light ' + (i + 1);

                if (obj.state.on == true) {
                    newDiv.className = 'light_on';
                    console.log('light' + i + ' is on');
                    newDiv.value = 'ON';
                } else if (obj.state.on == false) {
                    newDiv.className = 'light_off';
                    newDiv.value = 'OFF';
                    console.log('light' + i + ' is off');
                } else {
                    newDiv.classname = 'light';
                }
                toAdd.appendChild(newDiv);
            }
            $('#light_container').append(toAdd);
        }
);
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


