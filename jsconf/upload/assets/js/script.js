/**
 * Created by jillvandendriessche on 3/9/16.
 */

var clickOrTap = 'click';
var twang = new Audio('assets/audio/twang.mp3');

var Scripty = {
    online: true,
    accelerationTreshold: 4,
    velocity: 20,
    init: function () {
        var self = this;

        /* event to error message */
        $('#errors a').on('click', function (e) {
            e.preventDefault();
            $(this).parent().hide();
            localStorage.setItem('noerrors', 1)
        });

        /* Vibration API */
        //don't use click on mobile: it will have a short delay...
        $('#antenna').on(clickOrTap, function (e) {
            self.animateAntenna(self, e);
        });

        /* Battery status API*/


        /* Swipe */
        //zepto has swipe and pinch
        $('body')
            .on('swipeLeft', self.animateArmsRight)
            .on('swipeRight', self.animateArmsLeft);


        /* Image upload */
        $('#avatar').on('change', function (e) {
            self.uploadImage.call(self, e);
        });

        /* Motion sensors */
        $('#extreme').on(clickOrTap, function (e) {
            self.activateAccelerationMode.call(self, e);
        });

        /* Network API */
        if (navigator.onLine === false) {
            alert('you are offline');
            this.online = false;
            $('#online span').text('offline');
        }


    },

    uploadImage: function (e) {
        var self = this;
        console.log(e);
        var file = e.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.addEventListener('load', function (e) {
                self.writeToCanvas(event.target.result);
            }, false);
        }
    },
    writeToCanvas: function (picture) {
        console.log(picture);
        var img = new Image();
        img.src = picture;
        img.addEventListener('load', function (e) {
            CanvasWriter.writeImage(img, 'avatar-output');
            $('#bubble').addClass('show');
        });
    },
    showBatteryCharge: function (battery) {


    },
    animateAntenna: function (e) {
        var animationEvent = MiniModernizr.whichAnimationEvent();
        var deAntenne = $('#antenna');
        deAntenne.one(animationEvent, function () {
            deAntenne.removeClass('animate-antenna');
        });
        deAntenne.addClass('animate-antenna');
        twang.play();

        if (navigator.vibrate) {
            navigator.vibrate([100, 100, 1000]);
        }
    },
    animateArmsRight: function () {
        $('#arm-left,#arm-right').removeClass('animate-arms-left').addClass('animate-arms-right');
    },
    animateArmsLeft: function () {
        $('#arm-left,#arm-right').removeClass('animate-arms-right').addClass('animate-arms-left');
    },
    activateAccelerationMode: function (e) {
        e.preventDefault();
        $('#bubblewrapper').css('display', 'none');
        $('body').addClass('animate-extreme');

        var self = this;
        window.ondevicemotion = function (e) {
            var acceleration = 0;

            if (window.orientation === 90 || window.orientation === -90) {
                acceleration = -1 * e.accelerationIncludingGravity.y;
            } else {
                acceleration = e.accelerationIncludingGravity.x;
            }

            if (acceleration < self.accelerationTreshold && acceleration > (self.accelerationTreshold * -1))
                self.moveBot(document.getElementById('robot').offsetLeft - (acceleration * self.velocity));

                console.log(acceleration);
        }
    },
    moveBot: function (direction) {

        var robotWidth = document.getElementById('robot').offsetWidth;
        var areaWidth = $('main').width(); // zepto normalises offsetwidth, width, e.a. to "real" width
        // Fix for zepto being a pain in IOS 8
        if (areaWidth === 0) {
            areaWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        }

        /* screen width is useless due to retina screens */

        if ((direction > robotWidth / 2) && (direction < (areaWidth - robotWidth / 2))) {
            $('#robot').css('left', direction + 'px');
            $('#wheels img').addClass('animate-wheels');
        }


    },
    showErrors: function (errorid) {
        if (localStorage.getItem('noerrors') != 1) {
            //  $('#errors').show().find('#'+errorid).show(); -> doesn't work on zepto on IOS 6
            $('#errors').css('display', 'block').find('#' + errorid).css('display', 'block');
        }

    }

};

CanvasWriter = {
    maxWidth: 80,
    writeImage: function (img, canvasid) {
        var canvas = document.getElementById(canvasid);
        var context = canvas.getContext('2d');

        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (img.width > this.maxWidth) {
            img.height *= this.maxWidth / img.width;
            img.width = this.maxWidth;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);

    }
};

MiniModernizr = {
    whichAnimationEvent: function () {
        var a,
            el = document.createElement("fakeelement");

        var animations = {
            "animation": "animationend",
            "OAnimation": "oAnimationEnd",
            "MozAnimation": "animationend",
            "WebkitAnimation": "webkitAnimationEnd"
        };

        for (a in animations) {
            if (el.style[a] !== undefined) {
                return animations[a];
            }
        }
    }
};


Zepto(function ($) {

    Scripty.init();

});

