var Vue         = require("../lib/vue");
var fluxview    = require("../lib/fluxview");

var Reader_View = fluxview({
    el:"readercontainer",
    vue:null,
    initialize:function(){
      this.vue = new Vue({
                          el:"#readercontainer",
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
module.exports = Reader_View;

