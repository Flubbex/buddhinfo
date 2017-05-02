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
        $("#header").slideDown(300,function(){
            $("#footer").fadeIn();
            $("#search").slideDown(300);
            $("#content").fadeIn(250);
            });
    },500);

});

module.exports = buddhinfo;
