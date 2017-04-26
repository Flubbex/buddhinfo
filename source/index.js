var $         = require('jquery');
var Vue       = require("./vue");
var filelist  = require("./filelist");

function openPDF(uri)
{
    $("#reader")[0].src = uri;
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
  console.log(e)
  if (e!=="")
    filter.show();
  else
    $(".linktab").show();
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
