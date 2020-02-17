// huebump code
//IP of the bridge
let bridgeIP;

//JSON data about lights
let lightInfo;
let stopLights = false;


//TEMPORARY
let userID = "b6yoDz5SoZXLpsh-kgkuBVCuzz0BdTljllp--WfK"; 


$(document).ready(function(){
    //api call returns json. internalipaddress is the IP of the bridge
    $(".get-lights").click(function(){
        $(".get-lights").html("<img class='load-img d-none d-md-block' src='./speaker.png'>");
        $.getJSON("https://discovery.meethue.com", function(data){         
                
        //checks if IP value exists for bridge. returns error to the button if not
            if(data.length !== 0 && data[0].hasOwnProperty('internalipaddress')) {
                    bridgeIP = data[0].internalipaddress;
                    console.log("Local IP of hue bridge 0: " + data[0].internalipaddress); 
                    
                    //get user ID
                    //userID = getUserID(bridgeIP);
                    
                    //get lights
                    getLights(bridgeIP, userID);
            }
            else{
                $(".get-lights").html("Could not find hue bridge. Try again?")
            }
        });
    });


    $(".test-lights").click(function(){
        setLightBPM("test", 5000);
    });
})






//functions



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

    let apiURL = "https://" + bridgeIP + '/api/' + userID + '/lights';
    console.log("getLights() URL is : " + apiURL);

        $.getJSON(
            apiURL,
            function(data){
                console.log(data);
                let size = Object.keys(data).length;
                console.log("There are " +size+ " lights.");
            }
        );
}
    


function setLightBPM(type, bpm){
    

    let bpmURL = "http://" + bridgeIP+ "/api/"+userID+"/lights/4/state";
    console.log(bpmURL);
    let ajaxContent;
    let on = true;
    if(on == true){
        ajaxContent = JSON.stringify({"on":false});
    }
    else{
        ajaxContent =  JSON.stringify({"on":true});
    } 
    console.log

    $.ajax({
        url: bpmURL,
        type: 'PUT',
        data: ajaxContent,
        success: function(){
           on = !on;
           console.log("Lights on: " + on);
        }
    })

    if(stopLights == true){
        return;
    }
    // setTimeout(setLightBPM, bpm);
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


