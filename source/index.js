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
    $("#header,#footer").fadeIn()
    $("#content").fadeIn('slow');

});

module.exports = buddhinfo;
