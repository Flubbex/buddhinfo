var Vue         = require("../lib/vue");
var Menu_Model  = require("../model/menu");

function Menu_View(domelementid,menudata){

      var vue = new Vue({
              el:domelementid,
              data:new Menu_Model(menudata),
              methods:{
                    closeReader:function(title){
                        vue.readingtitles = vue.readingtitles.filter(
                            function(subtitle)
                            {
                                return subtitle!==title
                            })

                    },
                    createTab:function(title){
                      var id = "title_"+vue.readingtitles.length;

                      $("<div id='"+id+"'>If this works, eat me.</div>").appendTo("#content");

                      return "#"+id;
                    },
                    openDirect:function(title){
                      window.location = title.src;
                    },
                    openTab:function(title){
                      window.open(title.src,'_blank');
                    },
                    Share:function(title){

                    },
                    addToList:function(title){
                      vue.currentlist.push(title);
                    },
                    newList:function(){
                        console.log(vue);
                        vue.currentlist      = [];
                        vue.currentlist.note = null;
                    },
                    openList:function(){

                    },
                    saveList:function(list){
                        $("<div title='List export'>"+
                            "<textarea>"+
                            JSON.stringify(list)+
                            "</textarea>").dialog().hide().fadeIn();
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
module.exports = Menu_View;
