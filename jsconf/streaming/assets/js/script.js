/**
 * Created by jillvandendriessche on 3/9/16.
 */



var Scripty = {
    online : true,
    accelerationTreshold: 4,
    velocity: 20,
    init: function(){
        var self = this;

        /* event to error message */
        $('#errors a').on('click',function(e){e.preventDefault(); $(this).parent().hide(); localStorage.setItem('noerrors',1)});

        /* Vibration API */

        /* Battery status API*/


        /* Swipe */


        /* Image upload */


        /* Motion sensors */


        /* Network API */
        if (navigator.onLine === false) {
            alert('you are offline');
            this.online = false;
            $('#online span').text('offline');
        }


    }
    ,readVideoStream: function(){

    },
    streamSuccess: function(stream){

    },
    streamFail: function(){

    },
    changeMood: function(e){

    },
    hideMe: function(){

    },

    uploadImage: function(e){

    },
    writeToCanvas: function(picture){

    },
    showBatteryCharge: function(battery){


    },
    animateAntenna: function(){


    },
    animateArmsRight: function(){

    },
    animateArmsLeft: function(){

    },
    activateAccelerationMode: function(e){

    },
    moveBot: function(direction){

        var robotWidth = document.getElementById('robot').offsetWidth;
        var areaWidth = $('main').width(); // zepto normalises offsetwidth, width, e.a. to "real" width
        // Fix for zepto being a pain in IOS 8
        if(areaWidth === 0){
            areaWidth =   (window.innerWidth > 0) ? window.innerWidth : screen.width;
        }

        /* screen width is useless due to retina screens */

        if((direction > robotWidth/2) && (direction < (areaWidth -  robotWidth / 2))){
            $('#robot').css('left',direction+'px');
            $('#wheels img').addClass('animate-wheels');
        }


    },
    showErrors: function(errorid){
        if(localStorage.getItem('noerrors') != 1){
            //  $('#errors').show().find('#'+errorid).show(); -> doesn't work on zepto on IOS 6
            $('#errors').css('display','block').find('#'+errorid).css('display','block');
        }

    }

};

CanvasWriter = {
    maxWidth: 80,
    writeImage: function(img,canvasid){
        var canvas = document.getElementById(canvasid);
        var context = canvas.getContext('2d');

        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        if(img.width > this.maxWidth) {
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
     whichAnimationEvent: function(){
        var a,
            el = document.createElement("fakeelement");

        var animations = {
            "animation"      : "animationend",
            "OAnimation"     : "oAnimationEnd",
            "MozAnimation"   : "animationend",
            "WebkitAnimation": "webkitAnimationEnd"
        }

        for (a in animations){
            if (el.style[a] !== undefined){
                return animations[a];
            }
        }
    }
};


Zepto(function($){

   Scripty.init();

});

