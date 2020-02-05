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
const bridgeIP = "";


//api call returns json. internalipaddress is the IP of the bridge
$(".get-lights").click(function(){
    $(".get-lights").html("<img class='load-img d-none d-md-block' src='./speaker.png'>");
      $.getJSON(" https://www.meethue.com/api/nupnp", function(result){
        console.log(result);
        if(result) {
            try {
                let bridgeIP = JSON.parse(result).internalipaddress;
                console.log(bridgeIP);
            } catch(e) {
                console.log(e);
                $(".get-lights").html("Could not find hue bridge. Try again?")
            }
        }
    });
})