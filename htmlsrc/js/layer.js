var o = 0;
$(document).ready(function(){
	
    $(".caidantop").click(function(){
		 
	    if(o == 0) {
		    $(".subnav").show();
			o = 1;
		}else{
			$(".subnav").hide();
			o = 0;
			
		}
    });
	
	
 
 
});
function hidediv(){
  $('.subnav').hide();
  o = 0;


}
 




	
 