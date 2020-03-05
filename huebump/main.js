var context, analyser,
    bpm, bpmDisplay, currentBPMDisplay;
var SAMPLE_SIZE = 2048;

function startListening () {
    context = new (window.AudioContext || window.webkitAudioContext)()
    analyser = context.createAnalyser();
    bpmDisplay = document.getElementById('bpm');
    bpm = new BeatDetektor(85, 169);

    analyser.fftSize = SAMPLE_SIZE;

    navigator.webkitGetUserMedia({audio: true}, function(stream) {
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
    }, function () { alert('fail'); });

}

function bpmUpdate (time) {

    // Get the frequency-domain data
    var data = new Uint8Array(SAMPLE_SIZE),
        length = data.length,
        sum, average, bar_width, scaled_average;
    analyser.getByteFrequencyData(data);


    // Beatdetektor api
    bpm.process(time/1000, data);
    bpmDisplay.innerHTML = bpm.win_bpm_int_lo;

    window.requestAnimationFrame(bpmUpdate);
}
