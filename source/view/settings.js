var Vue             = require("../lib/vue");

function Settings_View(controller,domelementid,settingsdata){

      var vue = new Vue({
              el:domelementid,
              data:settingsdata,
              methods:{
                        nukeData:function(){
                            $("<div title='Reset'>"+
                                "<p>Are you sure? All your lists, notes and such will be lost.</p>"+
                                "</div>").dialog({buttons:{
                                  "Yes":function(){
                                    controller.emit("nuke");
                                    controller.emit("reloadPage",2000);
                                    $("#content,#wallpaper").fadeOut(1000);
                                    $("#loader")
                                        .delay(500)
                                        .animate({bottom:"75%",opacity:0},1000);
                                    $(this).parent().fadeOut();
                                  },
                                  "No":function(){
                                    $(this).dialog("close");

                                }}}).hide().fadeIn();
                        }
                      }

            });

      return vue;
}
module.exports = Settings_View;
