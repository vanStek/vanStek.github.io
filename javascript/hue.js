$('#get_lights').click(function(){
    $.getJSON('https://10.0.0.78/api/rVHJqasih6l0fzSXE4m8KfH9ljAMq6bXtZmRdcTf/lights', function (data) {
        console.log(data);
        data = JSON.stringify(data);
        $('#json').append(data);



        });

	})

$('#light_on').click(function(){$.ajax({
        url: 'https://10.0.0.78/api/rVHJqasih6l0fzSXE4m8KfH9ljAMq6bXtZmRdcTf/lights/4/state',
        type: 'PUT',
        data: JSON.stringify({"on": true}),
        success: function(){alert("Light 4 has been turned on")}}
    )}
)

$('#light_off').click(function(){$.ajax({
        url: 'https://10.0.0.78/api/rVHJqasih6l0fzSXE4m8KfH9ljAMq6bXtZmRdcTf/lights/4/state',
        type: 'PUT',
        data: JSON.stringify({"on":false}),
        success: function(){alert("Light 4 has been turned off")}}
    )}
)
