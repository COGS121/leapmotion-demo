$(document).ready(function() {
    var options = {
        enableGestures: true
    };

    var controller = Leap.loop(options, function(frame) {
        // code here
    });

    controller.on("gesture", function(gesture) {
        switch (gesture.type) {
            case "circle":
                console.log("Circle Gesture");
                break;
            case "keyTap":
                console.log("Key Tap Gesture");
                break;
            case "screenTap":
                console.log("Screen Tap Gesture");
                break;
            case "swipe":
                console.log("Swipe Gesture");
                break;
            default:
                console.log("No Gesture");
                break;
        }
    });
});
