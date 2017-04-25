var $ = require('jquery');

window.loadPDF = function(uri)
{
    $("#reader")[0].src = uri;
}

function loadIndex(index)
{
    $("#reader").html(uri);
}

$(document).ready(function(){
  $('.linktab').click(function(){
    var linklist = $(this).next();
    if (linklist.is(':visible'))
      linklist.slideUp('fast');
    else
      linklist.slideDown('fast');
  });
});
