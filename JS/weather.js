$(document).ready(function() {
    //assigns request function to request button/retrieves lat long
    $('#request').click(request);

    $(document).on('keypress', function(e) {
        if (e.which == 13) {
            request();
        }
    });
});

//accepts lat and long values from above, sends get request
function request() {
    $.getJSON(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            $('#address').val() +
            '&key=AIzaSyBM53VkGTsTDMYZrbQImxOJd4ESAJnqXfU',
        function(data) {
            lat = data.results[0].geometry.location.lat;
            long = data.results[0].geometry.location.lng;

            console.log(lat);
            console.log(long);

            $.getJSON(
                'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/8e46d8383f69f9f889a13b1a00838106/' +
                    lat +
                    ',' +
                    long,
                function(data) {
                    //string from JSON to add to result div
                    output =
                        data.timezone +
                        '<br />' +
                        data.hourly.summary +
                        '<br />' +
                        JSON.stringify(data.currently.temperature) +
                        '<br />' +
                        data.currently.precipProbability * 100 +
                        '%' +
                        '<br />' +
                        data.currently.humidity * 100 +
                        '%';

                    //adds weather to result div
                    $('#hide').css('visibility', 'visible');
                    $('#result').html(output);
                }
            );
        }
    );
}
