var $           = require('jquery');
var Vue         = require("./vue");
var filelist    = require("./filelist");

var Buddhinfo = {
  viewTitles:{
        el: '#titles',
        data: {filelist:filelist,filter:""},
        methods:{
        openPDF:function(url)
        {
          if (!Buddhinfo.settings.directurl)
            $("#reader")[0].src = url;
          else
            window.open(url, '_blank');
        }
      }
  },
  settings:{directurl:false},
  listopen:false,
  DOMready:function()
  {
    Buddhinfo.viewTitles = new Vue(Buddhinfo.viewTitles);
    
    //Crossfading
    $("body").fadeIn('slow');
    $("#footer,#header,#titles,#reader,\
      #clearsearch,#search,#directurl,#readermode").fadeIn('fast');
    
    
    $('#search').keyup(function(e){
      $(".linklist").show()
      
      Buddhinfo.viewTitles.filter = e.target.value;
       
    });
  
    $("#clearsearch").mouseup(function(){
      Buddhinfo.viewTitles.filter = "";
      $("#search").val("");
      $(".linklist").hide();
      $(".linktabs").show();
    });
  
    $("#readermode").mouseup(function(){
      var mode = $(this)[0].innerHTML;
      Buddhinfo.settings.directurl = (mode==="Reader Mode");
      if (Buddhinfo.settings.directurl)
      {
        $(this)[0].innerHTML = "Direct URL";
        $("#reader").slideUp('fast');
      }
      else
      {
        $(this)[0].innerHTML = "Reader Mode";
        $("#reader").slideDown('fast');
      }
    });
    
  $('.linktab').click(function(){
    Buddhinfo.listopen = $(this).next(".linklist");
    if (Buddhinfo.listopen.is(':visible'))
    {
      Buddhinfo.listopen.slideUp('fast',function(){
      Buddhinfo.showAll();
      });
    }
    else
    {
      Buddhinfo.hideAllExcept($(this),function(){
          Buddhinfo.listopen.slideDown('fast');
        });
    }
    });
  
  },
  hideAllExcept:function(tag,callback)
  {
      $(".linktab").slideUp('fast',function(){
        tag.slideDown('fast',callback);
      });
  },
  showAll:function()
  {
      $(".linktab").slideDown('fast');
  }
}

$(document).ready(Buddhinfo.DOMready);

module.exports = Buddhinfo;
