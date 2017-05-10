var Vue              = require("../lib/vue");
var Titlelist_Model  = require("../model/titlelist");

function Titlelist_View(controller,
                        domelementid,
                        titlelist,
                        config){

      var vue = new Vue({
              el:domelementid,
              data:{titlelist:titlelist,opentitle:null,config:config},
              methods:{
                    openTitle:function(title)
                    {
                        controller.emit("openTitle",title);
                    },
                    openTab:function(title){
                      window.open(title.src,'_blank');
                    },
                    addToList:function(title){
                        controller.emit("addToList",title);
                    },
                    clearSearch:function(){
                      $("#search").val('');
                        vue
                        .filter
                        = null;
                    },
                    countEntries:function(category,filter)
                    {
                      if (filter===null)
                        return 0

                      var count = 0;
                      category.content.map(function(title)
                      {
                        if (title.name.toUpperCase().
                              includes(filter.toUpperCase()))
                              count++
                      });
                      return count;

                    }}});

      $("#search").keyup(function(e){
        if (e.target.value==="")
        {
          vue.opencategory = null;
          vue.filter = null;
        }
        else
        {
          vue.opencategory = 'all';
          vue.filter = e.target.value;
        }
        });
      return vue;
}
module.exports = Titlelist_View;
