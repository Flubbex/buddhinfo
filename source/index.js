var $
    = window.jQuery
    = window.$
    = require('jquery');
var UI = require('jquery-ui');

//Globals :(

var Buddhinfo_Controller  = require("./controller/buddhinfo");
var filelist              = require("./filelist");
var fluxview              = require("./lib/fluxview");

var buddhinfo = new Buddhinfo_Controller(filelist);

$(document).ready(function(){

    fluxview.ready(window);
    buddhinfo.start();
    //console.log(UI);
    //$("<div>Test</div>").dialog();
    $("#wallpaper").fadeIn('faster');

    window.setTimeout(function(){
        $("#header,#footer,#content,#search").fadeIn('slow');
    },1000);
});

module.exports = buddhinfo;
