var Vue             = require("../lib/vue");
var Dashboard_Model = require("../model/userdata");
var Titlelist_Model = require("../model/titlelist");

function Dashboard_View(controller,domelementid,dashboarddata){

      var vue = new Vue({
              el:domelementid,
              data:dashboarddata,
              methods:{
                        saveList:function(titlelist){
                                console.log(titlelist);
                                titlelist.key = $("#listname").val();
                                vue.lists.push(titlelist);
                        },
                        saveListAs:function(titlelist){
                            $("<div title='Enter a name'>"+
                              "<p>Note: Any previously existing"+
                              "list with the same name WILL be"+
                              "overridden. But that's probably"+
                              "what you want, isn't it?</p>"+
                              "<input type='text' "+
                              "value='New List "+listid+"'/>"+
                              "</div>").dialog().hide().fadeIn();

                        },
                        newList:function(){
                            var id = vue.lists.push(new Titlelist_Model())-1;
                            vue.currentlist = id;
                        },
                        destroyList:function(listid){
                            vue.lists.splice(listid,1);
                            vue.currentlist = vue.currentlist-1;
                        },
                        openTitle:function(title){
                            controller.emit("openTitle",title);
                        },
                        downloadTitle:function(title){
                          window.open(title.src,'_blank');
                        },
                      }

            });

      return vue;
}
module.exports = Dashboard_View;
