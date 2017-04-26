var $           = require('jquery');
var Vue         = require("./vue");
var filelist    = require("./filelist");
var settings    = {directurl:false};
var searchcache = [];
var listopen    = null;

function openPDF(uri)
{
    if (!settings.directurl)
      $("#reader")[0].src = uri;
    else
      window.location = uri;
}

function openIndex(index)
{
    $("#reader").html(uri);
}

function hideAllExcept(tag,callback)
{
    $(".linktab").slideUp('fast',function(){
      tag.slideDown('fast',callback);
    });
}

function showAll()
{
    $(".linktab").slideDown('fast');
}

$(document).ready(function(){
  
  var app = new Vue({
    el: '#titles',
    data: {filelist:filelist,filter:""},
    methods:{
      openPDF:openPDF
    }
  });
  
  
  $('#search').keyup(function(e){
      app.filter = e.target.value;
      if (!listopen)
        $(".linklist").show()
  });
  
  $("#clearsearch").mouseup(function(){
    app.filter = "";
    $("#search").val("");
    $(".linklist").hide();
    $(".linktabs").show();
  });
  
  $("#readermode").mouseup(function(){
    var mode = $(this)[0].innerHTML;
    settings.directurl = (mode==="Reader Mode");
    if (settings.directurl)
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
    listopen = $(this).next(".linklist");
    
    if (listopen.is(':visible'))
    {
      listopen.slideUp('fast',function(){
        showAll();
      });
    }
    else
    {
      hideAllExcept($(this),function(){
          listopen.slideDown('fast');
        });
    }
  });
});
