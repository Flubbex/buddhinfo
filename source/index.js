var $
    = window.jQuery
    = window.$
    = require('jquery');
//Globals :(

var Buddhinfo_Controller  = require("./controller/buddhinfo");
var filelist              = require("./filelist");
var fluxview              = require("./lib/fluxview");

var buddhinfo = new Buddhinfo_Controller(filelist);

$(document).ready(function(){

    fluxview.ready(window);
    buddhinfo.start();
    window.setTimeout(function(){
        $("#wallpaper").fadeIn(     250,function(){
            $("#header").fadeIn(    250);
            $("#footer").fadeIn(    250);
            $("#search").fadeIn(    250);
            $("#content").fadeIn(   250);
            });
    },250);

});

module.exports = buddhinfo;
