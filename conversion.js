function Earthquake_conv() {

    var input = document.getElementById('input').value;
    var joules;
    var tnt;

    joules = Math.pow(10, 1.5 * input + 4.8);
    tnt = joules * 0.00000000024;

    document.getElementById("joules").value = (joules.toFixed(1) + ' joules');
    document.getElementById("TNT").value = (tnt.toFixed(3)) + ' tons of TNT';

}
