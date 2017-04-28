var $     
    = window.jQuery 
    = window.$
    = require('jquery');
var UI
    = window.$.UI
    = require("jquery-ui");
    
//Globals :(

var Buddhinfo_Controller  = require("./controller/buddhinfo");
var filelist              = require("./filelist");
var fluxview              = require("./lib/fluxview");

var buddhinfo = new Buddhinfo_Controller(filelist);

$(document).ready(function(){
  
    fluxview.ready(window);
    buddhinfo.start();
    
});

module.exports = buddhinfo;
