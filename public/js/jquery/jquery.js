
$(function(){  
  $(".login").click(function(){   
    $(".white").css( "opacity", "0.7")
    $(".temp").css( "opacity", "1")
    $(".white").css( "visibility", "visible")
    $(".temp").css( "visibility", "visible")

  });
  $(".close a").click(function(){
    $(".white").css( "opacity", "0")
    $(".temp").css( "opacity", "0")
    $(".temp2").css( "opacity", "0")                                       
  });  
  $(".cadastrar").click(function(){
    $(".temp").css( "opacity", "0")
    $(".temp2").css( "opacity", "1")
  }) 
  $(".showlogin").click(function(){
    $(".temp").css( "opacity", "1")
    $(".temp2").css( "opacity", "0")
  }) 

});

