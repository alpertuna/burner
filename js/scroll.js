$(function() {
  $('a[href^="#"]:not([href="#"])').click(function() {
      $('.body').animate({
          scrollTop: $('.body').scrollTop() + $( $.attr(this, 'href') ).offset().top - 49
      }, 500);
      return false;
  });

  $('h1[id],h2[id],h3[id],h4[id]').each(function(){
      $(this).append(
          ' ',
          $('<a>', {'href': '#' + $(this).attr('id'), 'class': 'hashlink'}).html(
              $('<i>', {'class': 'fa fa-hashtag'})
          )
      );
  });
});
