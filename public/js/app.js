$(document).ready(function () {

  // init hide all obj details
  $(".schema").hide();
  $(".field .props").hide();
  var first = $(".objects li:first");
  first.addClass('active');
  $(".schema[data-name='"+ $('a', first).attr('data-name')+"']").show();

  //append events(hide,click) to listings
  $('.objects li a').live('click', function(){
    // hide all others
    $('.objects li.active').toggleClass('active');
    $(".schema:visible").toggle();
    var obj_name = $(this).attr('data-name');
    $(this).parent().toggleClass('active');
    $(".schema[data-name='"+obj_name+"']").toggle();
  });
  // open field
  $('.field .head').live('click', function(){
    $(this).next('.props').toggle();
  });

});