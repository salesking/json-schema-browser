$(document).ready(function () {

  var anchor = window.location.hash.substring(1);
  // init hide all obj details
  $(".schema").hide();
  $(".collapsed .field .props").hide();
  // activate from anchor
  if (anchor.length>1){
    var obj = $(".objects li a[data-name='"+anchor+"']").parent();
    var obj_name = anchor;
  }else{
    var obj = $(".objects li a[data-name='invoice']").parent();
    var obj_name = 'invoice';
  }
  obj.addClass('active');
  $(".schema[data-name='"+ obj_name +"']").show();

  //append events(hide,click) to listings
  $('.objects li a').live('click', function(){
    // deactivate all
    $('.objects li.active').toggleClass('active');
    $(".schema:visible").toggle();
    // activate
    $(this).parent().toggleClass('active');
    // hide connected schema
    $(".schema[data-name='"+ $(this).attr('data-name')+"']").toggle();
  });

  // open a field definition
  $('.field .head').live('click', function(e){
    if (e.target.tagName == 'A'){
      $(".objects a[href='"+$(e.target).attr('href')+"']").trigger('click');
    }else{
      $(this).next('.props').toggle();
    }
  });

  // got to related in table view
  $('.table .link a').live('click', function(e){
    $(".objects a[href='"+$(e.target).attr('href')+"']").trigger('click');
  });
  //focus search
  $('#filter').focus();
  // filter objects
  $('#filter').keyup(function(){
    var val = $(this).val().toLowerCase();
    $(".objects li").show()
    $(".objects li a").not("[data-name^='"+ val +"']").parent().hide();
  });

  // filter fields
  $('#filterFlds').keyup(function(){
    var val = $(this).val().toLowerCase();
    $(".field").show();
    $(".field").not("[data-name*='"+ val +"']").hide();
  });

});