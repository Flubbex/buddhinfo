var Vue         = require("../lib/vue");
var fluxview    = require("../lib/fluxview");

var Titlelist_View = fluxview({
    el:"readercontrols",
    vue:null,
    initialize:function(){
      console.log("Setting up reader");
      this.vue = new Vue({
                          el:"#readercontrols",
                          data:{
                                title:null
                              },
                          methods:{
                                closeReader:function()
                                {
                                    $("#reader").parent().fadeOut();
                                  },
                                gotoBookmark:function(){},
                                setBookmark:function(){},
                                saveTitle:function(){},
                                complain:function(){}
                                
                              }}
                              );
                            }

});
module.exports = Titlelist_View;

