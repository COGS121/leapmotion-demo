$(document).ready(function() {
    var options = {
        enableGestures: true
    };

    var controller = Leap.loop(options, function(frame) {
        if (frame.hands.length > 0) {
            var hand = frame.hands[0];
            if (hand.grabStrength > 0.75) {
                positions = hand.screenPosition();
                move("#first", positions[0], positions[1]);
                changeSize("#first", positions[2] / 2, positions[2] / 2);
            }
        }
    }).use('screenPosition', {
        scale: 0.75
    });

    function move(ref, x, y) {
        $(ref).offset({
            left: x,
            top: y
        });
    }

    function changeSize(ref, x, y) {
        $(ref).width(250 + x);
        $(ref).height(250 + y);
    }
});
