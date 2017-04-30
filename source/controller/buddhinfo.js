var Titlelist_View = require("../view/titlelist");
var Reader_View = require("../view/reader");

function Buddhinfo_Controller(titles)
{
  this.titles         = titles;
  this.settings       = {directurl:false};
  this.titlelist_view = Titlelist_View;
  this.reader_view    =  Reader_View;
  
}

Buddhinfo_Controller.prototype.start = function()
{
  this.titlelist_view.vue.titlelist = this.titles;
  console.log("Yup, still works. ");
};

module.exports =  Buddhinfo_Controller;
