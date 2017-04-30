var Vue         = require("../lib/vue");
var fluxview    = require("../lib/fluxview");

var Titlelist_View = fluxview({
    el:"titlelist",
    vue:null,
    initialize:function(){
      $("#search").keyup(function(e){
        if (e.target.value==="")
        {

          Titlelist_View.vue.opencategory = null;
          Titlelist_View.vue.filter = null;

        }
        else
        {
          Titlelist_View.vue.opencategory = 'all';
          Titlelist_View.vue.filter = e.target.value;
        }

      });
      this.vue = new Vue({
                          el:"#titlelist",
                          data:{
                                titlelist:null,
                                opencategory:null,
                                opentitle:null,
                                filter:null},
                          methods:{
                                openInline:function(title)
                                {
                                    $("#reader")[0].src =
                                      title.src;
                                    $("#reader").parent().fadeIn();
                                },
                                openDirect:function(title){
                                  window.location = title.src;
                                },
                                openTab:function(title){
                                  window.open(title.src,'_blank');
                                },
                                Share:function(title){

                                },
                                clearSearch:function(){
                                  $("#search").val('');
                                  Titlelist_View
                                    .vue
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

                                },

                                }
                          });
    },
    /*openCategory:function(category){
      Titlelist_View.vue.category = category;
    },
    openTitle:function(title){
      Titlelist_View.vue.title = title;
    },
    openPDF:function(url){
      Titleinfo_View.emit("openPDF",url);
    },
    hideAllExcept:function(tag,callback)
    {
      Titleinfo_View.emit("hideAllExcept",{tag:tag,callback:callback});
    },
    showAll:function()
    {
      Titleinfo_View.emit("showAll");
    }*/
});
module.exports = Titlelist_View;
