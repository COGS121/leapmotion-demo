$(document).ready(function() {
    var colorMap = ["#dcdcdc", "#5B90BF", "#96b5b4", "#a3be8c", "#ab7967", "#d08770"];
    var leftColorRGB = {
        "red": 220,
        "green": 220,
        "blue": 220
    };
    var rightColorRGB = {
        "red": 220,
        "green": 220,
        "blue": 220
    };

    Leap.loop(function(frame) {
        var leftFingers = 0;
        var rightFingers = 0;
        var hands = frame.hands;
        for (var i = 0; i < hands.length; i++) {
            var hand = hands[i];
            if (hand.type == "left") {
                leftFingers = fingerExtended(hand);
                updateColor(hand.type, leftFingers);
            } else if (hand.type == "right") {
                rightFingers = fingerExtended(hand);
                updateColor(hand.type, rightFingers);
            }
        }
    });

    function isValid(obj) {
        return (typeof obj) != 'undefined';
    }

    function fingerExtended(hand) {
        var total = 0;
        var fingers = hand.fingers;
        for (var index = 0; index < fingers.length; index++) {
            total += fingers[index].extended ? 1 : 0;
        }
        return total;
    }

    function updateColor(side, strength) {
        if (strength < 0 || strength >= colorMap.length) {
            return;
        }
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorMap[strength]);
        if (side == "left") {
            leftColorRGB.red = parseInt(result[1], 16);
            leftColorRGB.green = parseInt(result[2], 16);
            leftColorRGB.blue = parseInt(result[3], 16);
            leftChart.datasets[0].fillColor = colorStringfy(side, 0.2);
            leftChart.datasets[0].strokeColor = colorStringfy(side, 1);
            leftChart.datasets[0].lightStroke = colorStringfy(side, 1);
            leftChart.update();
        }
        if (side == "right") {
            rightColorRGB.red = parseInt(result[1], 16);
            rightColorRGB.green = parseInt(result[2], 16);
            rightColorRGB.blue = parseInt(result[3], 16);
            rightChart.datasets[0].fillColor = colorStringfy(side, 0.2);
            rightChart.datasets[0].strokeColor = colorStringfy(side, 1);
            rightChart.datasets[0].lightStroke = colorStringfy(side, 1);
            rightChart.update();
        }
    }

    function colorStringfy(side, opacity) {
        if (side == "left") {
            return "rgba(" + leftColorRGB.red + "," + leftColorRGB.green + "," + leftColorRGB.blue + "," + opacity + ")";
        }
        if (side == "right") {
            return "rgba(" + rightColorRGB.red + "," + rightColorRGB.green + "," + rightColorRGB.blue + "," + opacity + ")";
        }
    }

    var leftChart = new Chart(document.getElementById("leftChart").getContext("2d")).Line({
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        }]
    }, Chart.defaults.Line);

    var rightChart = new Chart(document.getElementById("rightChart").getContext("2d")).Radar({
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        datasets: [{
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 90, 81, 56, 55, 40]
        }]
    }, Chart.defaults.Radar);
});
