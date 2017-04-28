var Titlelist_View = require("../view/titlelist");
var Titleinfo_View = require("../view/titleinfo");

function Buddhinfo_Controller(titles)
{
  this.titles         = titles;
  this.settings       = {directurl:false};
  this.titlelist_view = Titlelist_View;
  this.titleinfo_view = Titleinfo_View;
  
}

Buddhinfo_Controller.prototype.start = function()
{
  this.titlelist_view.vue.titlelist = this.titles;
  console.log("CRAZY BUS ♪ CRAZY BUS ♬ ");
};

module.exports =  Buddhinfo_Controller;
