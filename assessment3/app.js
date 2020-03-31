$( "#accordion" ).accordion({
  collapsible: true
});

function slide(n) {
  if(n === 1){
    $('#dot').animate({left: '2px'}, 300);
    $('#content1').show();
    $('#content2').hide();
    $('#content3').hide();
  } else if(n === 2){
    $('#dot').animate({left: '40px'}, 300);
    $('#content1').hide();
    $('#content2').show();
    $('#content3').hide();
  } else{
    $('#dot').animate({left: '77.5px'}, 300);
    $('#content1').hide();
    $('#content2').hide();
    $('#content3').show();
  }
  
}