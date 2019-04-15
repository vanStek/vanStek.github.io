$(document).ready(function(){
    //assigns request function to request button/retrieves lat long
    $("#request").click(request);
});

//accepts lat and long values from above, sends get request
function request(){


    $.getJSON('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/8e46d8383f69f9f889a13b1a00838106/'+ $('#lat').val() +',' + $('#long').val(),  function (data){
        //string from JSON to add to result div
        output = "<br /> Location: "  + data.timezone
                +"<br />Summary: " + data.hourly.summary
                + "<br />Temperature: " + JSON.stringify(data.currently.temperature)
                + "<br /> Precipitation Probability: " + JSON.stringify(data.currently.precipProbability)
                + "<br />Humidity: " + data.currently.humidity * 100 +"%";

        //adds weather to result div
        $("#result").html(output);


    });
}
