$(document).ready(function(){
    $("a").hover(function(){
      $(this).animate({top: '-20px'},3);
      $("#pawprint").toggleClass("show");
      var position = $(this).position();
      $("#pawprint").animate({left: position.left},20);
      $("#pawprint").animate({bottom: position.top-3},20);
    });
    $("a").mouseout(function(){
        $(this).animate({top: '0px'},20);
      });
    $("#about").click(function(){
      $('html,body').animate({
        scrollTop: $(".about").offset().top
      }, 700);
    });
    $("#schedule").click(function(){
      $("#pop").toggleClass(sup);
    });

  });
  
