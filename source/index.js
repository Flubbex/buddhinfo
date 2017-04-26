var $ = require('jquery');

window.loadPDF = function(uri)
{
    $("#reader")[0].src = uri;
}

function loadIndex(index)
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
  $('.linktab').click(function(){
    var linklist = $(this).next();
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
