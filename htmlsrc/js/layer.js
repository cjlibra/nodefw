var o = 0;
$(document).ready(function(){
	$("body").click(function(){
		/*  console.log( $('.subnav').css('display'));
		  var showstate =  $('.subnav').css('display');
		  if (showstate == "block" && o == 0){
			  hidediv();
		  }*/
		 
		   
	});
    $(".mainmenu").click(function(){
		 
	    if(o == 0) {
		    $(".subnav").show();
			o = 1;
		}else{
			$(".subnav").hide();
			o = 0;
			
		}
    });
	$(document).on("pageshow", "#sbztqt", function(){
	      centerelement();
	});
	
	$(document).on("pageshow", "#tjtubiao", function(){
	       var width = $("#kaisitongji").width();
		   width = document.body.clientWidth ;
		   $("#kaisitongji").css({
			   "width" : "50%" ,
			   "margin-left" : width / 4 +"px" 
		   
		   });
		   console.log(width);
	});
	
	
	$(document).on("pageshow", "#mainpage", function(){
		var width = $("#guwm").width();
	    $("#guwm a img").css("margin-left",width /2 - 50 + "px");
	});
	
	$(document).on("pageshow", "#hdgjlog", function(){
	      var width = $(".gjtail").width();
		  var offset = (width*8/100-10)/2;
		  $(".gjtaill1").css("margin-left",offset+"px");
		 //  $(".gjtaill1").css("margin-left","100px");
		  console.log(width);
		  console.log(offset);
	});
 
 
});
function hidediv(){
  $('.subnav').hide();
  o = 0;


}
function hdgjallaction(){
	nowlineid = "*";
	console.log("clcik");
 
	
	
}
 
function centerelement(){
	var width = 0;
	width = $("#selects .submitimg").width() ;
	console.log(width );
	//$(".submitimg").css("padding-left",width / 2 - 50 +"px");
	var offset = width / 2 - 50 +"px";
	$("#selects .submitimg a img").css("margin-left",offset);
	
	width = $("#vsel1").width();
	var width1 = $("#selects .submitimg").width() ;
	var leftmargin = (width1-width)/2;
	$("#vsel1").css("margin-left",leftmargin+"px");
	$("#vsel2").css("margin-left",leftmargin+"px");
	
	width = $("#contentid").width();
	//width = document.body.clientWidth ;
	//$(".bottomimg").css("padding-left", (width - 150 -140 -4)/2 +"px");
	var padleft = $(".bottomimg").css("padding-left");
	$(".bottomimg").css("padding-left" ,   (width - 140 -130 -4  )/2 +"px");
	//$(".bottomimg").css("padding-left" ,   "0px");
	 
	
	
}



	
 