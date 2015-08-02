
$(document).on("pageshow", "#login", function(){
	
	  setTimeout("inputpassword()",5000);
	
	  
	  
});
$(document).on("pageshow", "#log_on", function(){
	
	 $("#fullname").click(function(){
		 if ( $("#fullname").val() == "用户名"){
			$("#fullname").val("");
			$("#mima").val("");
		 }
      });
	  
	   $("#mima").click(function(){
		  if ( $("#mima").val() == "密码"){
			$("#fullname").val("");
			$("#mima").val("");
		  }
      });
	
	   
	  
});

$(document).on("pageshow", "#shebeitongjitubiao", function(){
	 var divbutheight = $(".floatpicbuts").height();
	 var winheight = $(window).height() ;
	 var bottommargin = (winheight - divbutheight)/2;
	// $(".floatpicbuts").css("margin-bottom",bottommargin+"px");
	 $("#main1").css("height" , winheight - 120 + "px");
	 $("#main2").css("height" , winheight - 120 + "px");
	 console.log(winheight);
	  console.log(divbutheight);
	 option2 = {
		tooltip: {
			show: true
		},
		legend: {
			data:['日产量','目标产量','产量累计线']
		},
		grid : {
			x : 25 ,
			x2 : 25
		},
		xAxis : [
			{
				type : 'category',
				data : ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"]
			}
		],
		yAxis : [
			{
				type : 'value'
			}
		],
		series : [
			{
				"name":"日产量",
				"type":"bar",
				"data":[1, 30, 50, 20, 20, 30]
			},
			 {
						"name":"目标产量",
						"type":"line",
						"data":[50, 50,50, 50, 50, 50]
			 },
			  {
						"name":"产量累计线",
						"type":"line",
						"data":[150, 200, 220, 240, 300, 320]
			  }
		]
	};

	drawechart("main2",option2);
	
	 
                    
	 option1 = {
		tooltip: {
			show: true
		},
		legend: {
			data:['小时产量','目标产量','产量累计线']
		},
		grid : {
			x : 25 ,
			x2 : 25
		},
		xAxis : [
			{
				type : 'category',
				data : ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"]
			}
		],
		yAxis : [
			{
				type : 'value'
			}
		],
		series : [
			{
				"name":"小时产量",
				"type":"bar",
				"data":[15, 5, 2, 2, 6, 2]
			}
			,
			 {
						"name":"目标产量",
						"type":"line",
						"data":[15, 15,15, 15, 15, 15]
			 },
			  {
						"name":"产量累计线",
						"type":"line",
						"data":[15, 20, 22, 24, 30, 32]
			  }
		]
	};

	 drawechart("main1",option1);
		
		 
	  
	 
	 
	$("#main2").on("swipe",function(){
	    
		  $("#main2").hide();
		  $("#main1").show();
		  drawechart("main1",option1);
		  $(".centerechartname").text("当日产量统计图-小时产量");
		 	 
	});

	$("#main1").on("swipe",function(){
	 
		$("#main1").hide();
		$("#main2").show();
		drawechart("main2",option2);
		$(".centerechartname").text("本月产量统计图-日产量");
  
	});
	  
	
	$("#main1").show();  
 
    $("#main2").hide(); 
});




function drawechart(id_div,optionset){
	   
	         require.config({
            paths: {
                echarts: './jmobile/echarts-2.2.1/build/dist'
            }
        });
        
        // 使用
        require(
            [
                'echarts',
                'echarts/chart/pie' ,// 使用柱状图就加载bar模块，按需加载
				'echarts/chart/line' ,
				'echarts/chart/bar' ,
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById(id_div)); 
                
                var option = optionset;
        
                // 为echarts对象加载数据 
                myChart.setOption(option); 
            }
        );
	   
	   
	   
	   };

function showLoading(){
$.mobile.loadingMessageTextVisible = true;
//$.mobile.showPageLoadingMsg("a", "加载中..." );
  $.mobile.loading('show', {  
        text: '加载中...', //加载器中显示的文字  
        textVisible: true, //是否显示文字  
        theme: 'b',        //加载器主题样式a-e  
        textonly: false,   //是否只显示文字  
        html: ""           //要显示的html内容，如图片等  
    }); 
} 
//隐藏loading
function hideLoading(){
//$.mobile.hidePageLoadingMsg();

 $.mobile.loading('hide');
} 	
function dengluto(){
	 
	if ( $("#mima").val() == "passpass"  && $("#fullname").val() == "admin") {
		   
		   
		   document.location.href="#workshoplist";
	   }
	
}
function changetowslist(){
	 hideLoading();
	document.location.href="#workshoplist";
	
	
}
function gotostationlist(){
	 
	document.location.href='#stationlist';
	
}
function gotoshebeixiangqing(){
	document.location.href='#shebeixiangqing';
}
function gotomainpage(){
	/*var num = 0-window.history.length;
	console.log(num);
	history.go(num);*/
	document.location.href="#workshoplist";
	
}
function inputpassword(){
	
	document.location.href="#log_on";
	return;
	var password = prompt("请输入登录密码");
	if ( password == "passpass" ) {
		showLoading();
		setTimeout("changetowslist()",3000);
		
		
		return;
	}
	setTimeout("inputpassword()",5000);
	 
	
	
	
	
	
}