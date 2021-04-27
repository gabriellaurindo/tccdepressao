$(function(){
  $(".login").click(function(){   
    $(".white").css( "visibility", "visible")
    $(".temp").css( "visibility", "visible")
    $(".white").css( "opacity", "0.7")
    $(".temp").css( "opacity", "1")
   });
 
  $(".close a").click(function(){
    $(".white").css( "opacity", "0")
    $(".temp").css( "opacity", "0")
    $(".white").css( "visibility", "hidden")
    $(".temp").css( "visibility", "hidden")                 
                     
                     
    
                     });  
    
    
    
    
    
    
    
});