var $         = require('jquery');
var Vue       = require("./vue");
var filelist  = require("./filelist");
var settings  = {directurl:false};
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

function search(e)
{
  $(".linklist").show();
  var filter = $("button:not(:contains("+e+"))");
  console.log(e);
  if (e!=="")
    filter.hide();
  else
    $(".linklist").hide();
}

$(document).ready(function(){
  
  var app = new Vue({
    el: '#titles',
    data: {filelist:filelist},
    methods:{
      openPDF:openPDF
    }
  });
  
  
  $('#search').keyup(function(e){
    search(e.target.value)
  });
  
  $("#readermode").click(function(){
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
    var linklist = $(this).next(".linklist");
    if (linklist.is(':visible'))
    {
      linklist.slideUp('fast',function(){
        showAll();
      });
    }
    else
    {
      hideAllExcept($(this),function(){
          linklist.slideDown('fast');
        });
    }
  });
});
