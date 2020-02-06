// old hue code

$('#get_lights').click(function() {
    $.getJSON(
        'https://10.0.0.78/api/rVHJqasih6l0fzSXE4m8KfH9ljAMq6bXtZmRdcTf/lights',
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
});

function toggle_on() {
    var light = event.target.id;

    if (event.target.value == 'OFF' || event.target.value == null) {
        {
            $.ajax({
                url:
                    'https://10.0.0.78/api/rVHJqasih6l0fzSXE4m8KfH9ljAMq6bXtZmRdcTf/lights/' +
                    light +
                    '/state',
                type: 'PUT',
                data: JSON.stringify({ on: true }),
                success: function() {
                    console.log('Light ' + light + ' has been turned on');
                    //alert("Light "+ light +" has been turned on")
                }
            });
        }
        $('#' + light)
            .removeClass()
            .addClass('light_on');
        event.target.value = 'ON';
    } else if (event.target.value == 'ON') {
        {
            $.ajax({
                url:
                    'https://10.0.0.78/api/rVHJqasih6l0fzSXE4m8KfH9ljAMq6bXtZmRdcTf/lights/' +
                    light +
                    '/state',
                type: 'PUT',
                data: JSON.stringify({ on: false }),
                success: function() {
                    console.log('Light ' + light + ' has been turned off');
                    //alert("Light "+light+" has been turned off")
                }
            });
        }
        $('#' + light)
            .removeClass()
            .addClass('light_off');
        event.target.value = 'OFF';
    }
}




// huebump code
//IP of the bridge
let bridgeIP = "";
let userID = "";

//api call returns json. internalipaddress is the IP of the bridge
$(".get-lights").click(function(){
    $(".get-lights").html("<img class='load-img d-none d-md-block' src='./speaker.png'>");
      $.getJSON(" https://www.meethue.com/api/nupnp", function(data){         
            
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
    $.post(bridgeIP+"/api", send);
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
    