var $
    = window.jQuery
    = window.$
    = require('jquery');

require('./lib/jquery-ui.min');

//Globals :(

var Buddhinfo_Controller  = require("./controller/buddhinfo");
var filelist              = require("./filelist");
var fluxview              = require("./lib/fluxview");

var buddhinfo = new Buddhinfo_Controller();

window.dbg = function(){
        return buddhinfo;
    }

var onerror = function(e){
        var div             = document.createElement("div");
            div.className   = "error";
            div.setAttribute('title','Something broke!');
        var error           = document.createElement("p");
            error.innerHTML = e.message;
        var tip           = document.createElement("span");
            tip.innerHTML = "The page will reload now.";


        div.appendChild(error);
        div.appendChild(tip);

        $(div)
        .dialog({
            modal:true,
            buttons:{
                    "Oh,okay.":function(){
                        buddhinfo.emit("reloadPage",0)
                        }
            }})
        .parent()
        .hide()
        .fadeIn()

        buddhinfo.nuked = true;
        $("#content,#wallpaper").fadeOut(1000);

};

function onunload(event)
{
    if (buddhinfo.nuked)
        return event.preventDefault();

    buddhinfo.save();
    return "Everything is saved! Thanks for visiting.";
}
window.addEventListener         ('error' ,onerror);
window.document.addEventListener('error' ,onerror);
$(window).bind('beforeunload',onunload);

function resize(e)
{
    $("#content").css('height',
        (window.innerHeight
            -$("#header").height()
            -50)+'px');
}

//window.addEventListener('resize',resize);

buddhinfo.ready(function()
{
    $("#content")   .tabs();
    $("#titlelist") .accordion({
      collapsible:true,
      active:false,
      heightStyle: "content",
      beforeActivate:function(e,f){
        if (!this._hidden)
        {
            this._hidden = $(this)
                .children("h3")
                .not(f.newHeader)
                .slideUp();
        }
        else
        {
            $(this).children("h3").slideDown();
            this._hidden = null;
        }
      }
    });
    $("#header,#footer,#content,#search")
                    .delay(500)
                    .fadeIn(500);
});

$(document).ready(function(){
    fluxview.ready(window);
    buddhinfo.start(filelist);
});

module.exports = buddhinfo;
