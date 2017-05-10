var Vue              = require("../lib/vue");

var Reader_Model     = require("../model/reader");

function Title_View(controller,domelementid,readerdata,userdata){

      var vue = new Vue({
              el:domelementid,
              data:{reader:readerdata,user:userdata},
              methods:{
                        setBookmark:function(title){
                            controller.emit("setBookmark",title);
                        },
                        gotoBookmark:function(title){
                            controller.emit("gotoBookmark",title);
                        },
                        addToList:function(title){
                            controller.emit("addToList",title);
                        },
                        closeReader:function(domid){
                            controller.emit("closeTab",domid);
                        }

                      }
            });
      return vue;
}
module.exports = Title_View;
