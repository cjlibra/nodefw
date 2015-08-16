function clicksbxq(){
	$("#tabdev1").addClass("tabtab");
	$("#tabdev2").removeClass("tabtab");
	$("#tabdev3").removeClass("tabtab");
	
	
}
function clicktjtb(){
	$("#tabdev2").addClass("tabtab");
	$("#tabdev1").removeClass("tabtab");
	$("#tabdev3").removeClass("tabtab");
}


function clickhdgj(){
	$("#tabdev3").addClass("tabtab");
	$("#tabdev2").removeClass("tabtab");
	$("#tabdev1").removeClass("tabtab");
	
}
$(document).on("pageshow", "#login", function(){
	
	setTimeout("inputpassword()",5000);
	
	  
	  
});
$(document).on("pageshow", "#workshoplist", function(){
	
	showWorkshoplist();
	
});
$(document).on("pagehide", "#workshoplist", function(){
	
	 V = [];
	 clearTimeout(iTime);
	
});
var g_url;
$(document).on("pageshow", "#stationlist", function(){
	if (typeof g_url == "undefined") {window.location.href="#workshoplist"; return;} 
	//showStationlist();
	
});
$(document).on("pagehide", "#stationlist", function(){
	
	 
	VV = [];
	clearTimeout(iTime);
	
});
$(document).on("pageshow", "#shebeixiangqing", function(){
	if (typeof g_lineid == "undefined") {window.location.href="#workshoplist"; return;} 
	showtabl("#shebeixiangqing");
	$("#tabdev1").addClass("tabtab");
	$("#tabdev2").removeClass("tabtab");
	$("#tabdev3").removeClass("tabtab");
	
	  
	  
});
$(document).on("pagehide", "#shebeixiangqing", function(){
	  
	$(".tabindex").hide();
	
	  
	  
});
$(document).on("pageshow", "#huodongbaojing", function(){
	  
	showtabl("#huodongbaojing");
	if (typeof g_lineid == "undefined") {window.location.href="#workshoplist"; return;}
	var lineid = g_lineid ;
	showgaojingcontent(lineid);
	
	  
	  
});
$(document).on("pagehide", "#huodongbaojing", function(){
	  
	$(".tabindex").hide();
	
	  
	  
});
$(document).on("pageshow", "#shebeitongjitubiao", function(){
	  
	showtabl("#shebeitongjitubiao");
	if (typeof g_lineid == "undefined") {window.location.href="#workshoplist"; return;}
	var lineid = g_lineid;
	showTongjitubiao(lineid)
	
	  
	  
});
$(document).on("pagehide", "#shebeitongjitubiao", function(){
	  
	$(".tabindex").hide();
	
	  
	  
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
	
	 $("#main1").css("height" , winheight - 120 + "px");
	 $("#main2").css("height" , winheight - 120 + "px");
	
    var loption1= {
			tooltip: {
				show: true
			},
			legend: {
				data:['自动运行时间','小时目标产量','每小时产量']
			},
			grid : {
				x : 35 ,
				x2 : 35
			},
			xAxis : [
				{
					type : 'category',
					data : ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24" ]
				}
			],
			yAxis : [
				{
					type : 'value'
				}
			],
			series : [
				{
					"name":"",
					"type":"bar",
					"data":[],
					markPoint : {
							data : [
								{type : 'max', name: '最大值'},
								{type : 'min', name: '最小值'}
							]
						}
				},
				 {
					"name":"",
					"type":"line",
					"data":[],
					markPoint : {
							data : [
								{type : 'max', name: '最大值'},
								{type : 'min', name: '最小值'}
							]
						}
				},
				 {
					"name":"",
					"type":"line",
					"data":[],
					markPoint : {
							data : [
								{type : 'max', name: '最大值'},
								{type : 'min', name: '最小值'}
							]
						}
				}
			]
		};
	drawechart("main2",loption1);
	drawechart("main1",loption1);
	showLoading();
		
		 
	  
	 
	 
	$("#main2").on("swipe",function(){
	    
		  $("#main2").hide();
		  $("#main1").show();
		   drawechart("main1",0);
		  drawechart("main1",option1);
		  $(".centerechartname").text("当日产量统计图-小时产量");
		 	 
	});

	$("#main1").on("swipe",function(){
	 
		$("#main1").hide();
		$("#main2").show();
		 drawechart("main2",0);
	    drawechart("main2",option2);
		$(".centerechartname").text("本月产量统计图-日产量");
  
	});
	  
	
	$("#main1").show();  
 
    $("#main2").hide(); 
});
//var time1 = new Date().Format("yyyy-mm-dd");
var data = new Date();
var year = data.getFullYear();  //获取年
var month = data.getMonth() + 1;    //获取月
var day = data.getDate(); //获取日
nowstr = year+"-"+month+"-"+day ;
nowatr = "2014-12-08";
function showTongjitubiao(lineid){
	var atype=0 ;
	var aunit=0 ;
	var adays = 0;
	var adate = nowatr;
	var url = "/datatochart?atype="+atype+"&aunit="+aunit+"&adate="+adate+"&adays="+adays+"&lineid="+lineid ;
	$.getJSON(url,null,function(data){ 
		   hideLoading();
		   setechart0(data);
		 
	});
	atype= 1 ;
	aunit= 1 ;
	adays = 0 ;
	url = "/datatochart?atype="+atype+"&aunit="+aunit+"&adate="+adate+"&adays="+adays+"&lineid="+lineid ;
	$.getJSON(url,null,function(data){ 
		   hideLoading();
		   setechart1(data);
		 
	});
	
}

var option1;
var option2;
function setechart0(data){
	option1= {
			tooltip: {
				show: true
			},
			legend: {
				data:['每小时产量','日目标产量','累计产量']
			},
			grid : {
				x : 55 ,
				x2 : 55
			},
			xAxis : [
				{
					type : 'category',
					data : ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24" ]
				}
			],
			yAxis : [
				{
					type : 'value'
				}
			],
			series : [
				{
					"name":"每小时产量",
					"type":"bar",
					"data":[5, 20, 40, 10, 10, 20],
					markPoint : {
							data : [
								{type : 'max', name: '最大值'},
								{type : 'min', name: '最小值'}
							]
						}
				},
				 {
					"name":"日目标产量",
					"type":"line",
					"data":[15, 30, 30, 10, 20, 20],
					markPoint : {
							data : [
								{type : 'max', name: '最大值'},
								{type : 'min', name: '最小值'}
							]
						}
				},
				 {
					"name":"累计产量",
					"type":"line",
					"data":[15, 30, 30, 10, 20, 20],
					markPoint : {
							data : [
								{type : 'max', name: '最大值'},
								{type : 'min', name: '最小值'}
							]
						}
				}
			]
		};
	 
		
		
		option1.legend.data[0]="每小时产量";
		option1.legend.data[1]="日目标产量";
		option1.legend.data[2]="累计产量";
		option1.series[0].name=option1.legend.data[0];
		option1.series[1].name=option1.legend.data[1];
		option1.series[2].name=option1.legend.data[2];
		var sumval = data.Plan.PlanDay  ;
		option1.series[0].data=[];
		option1.series[1].data=[];
		option1.series[2].data=[];
		for (var i=0;i<24;i++){
		   option1.series[1].data.push(sumval);
		   option1.series[2].data.push(0);
		   option1.series[0].data.push(0);
		}
	 
	
	if (data.Uphstations==null  ) {
		 
		drawechart("main1",0);
	 
	}else{
			 
			$.each(data.Uphstations,function(idx,item){ 
				
					var  thehours = item.Hours.split(" ");
					var thehour = parseInt(thehours[1]);
			
					option1.series[0].data[thehour] = item.UPH;
				
					 
			}); 
			
		
			var sumwhole = 0;
			for (var i=0;i<24;i++){
				sumwhole = sumwhole+option1.series[0].data[i];
				option1.series[2].data[i] = sumwhole;

			}
		
			drawechart("main1",option1);			

		
    }
	

}
function setechart1(data){

     option2= {
			tooltip: {
				show: true
			},
			legend: {
				data:['每日产量','月目标产量','累计产量']
			},
			grid : {
				x : 55 ,
				x2 : 55
			},
			xAxis : [
				{
					type : 'category',
					data : ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]
				}
			],
			yAxis : [
				{
					type : 'value'
				}
			],
			series : [
				{
					"name":"每日产量",
					"type":"bar",
					"data":[5, 20, 40, 10, 10, 20],
					markPoint : {
							data : [
								{type : 'max', name: '最大值'},
								{type : 'min', name: '最小值'}
							]
						}
				},
				 {
					"name":"月目标产量",
					"type":"line",
					"data":[15, 30, 30, 10, 20, 20],
					markPoint : {
							data : [
								{type : 'max', name: '最大值'},
								{type : 'min', name: '最小值'}
							]
						}
				},
				 {
					"name":"累计产量",
					"type":"line",
					"data":[15, 30, 30, 10, 20, 20],
					markPoint : {
							data : [
								{type : 'max', name: '最大值'},
								{type : 'min', name: '最小值'}
							]
						}
				}
			]
		};
		
		var objnow = new Date(nowstr);  
		var daysofthemonth = DaysOfMonth( objnow); 
		 
		var dayval = data.Plan.PlanDay  ;
		
		option2.legend.data[0]="每日产量";
		option2.legend.data[1]="月目标产量";
		option2.legend.data[2]="累计产量";
		option2.series[0].name=option2.legend.data[0];
		option2.series[1].name=option2.legend.data[1];
		option2.series[2].name=option2.legend.data[2];
		var sumval = data.Plan.PlanMonth  ;
		option2.series[0].data=[];
		option2.series[1].data=[];
		option2.series[2].data=[];
		for (var i=0;i<daysofthemonth;i++){
		   option2.series[1].data.push(sumval);
		   option2.series[2].data.push(0);
		   option2.series[0].data.push(0);
		}
		
	
	
	if (data.Updstations==null  ) {
		 
		
		drawechart("main2",0);
		
		 
		 
		
	}else{
		
		$.each(data.Updstations,function(idx,item){ 
			
				var  thedays = item.Days.split("-");
				var theday = parseInt(thedays[2]);
			
				option2.series[0].data[theday-1] = item.UPD;
		
				 
				 
		}); 
		var sumwhole = 0;
		for (var i=0;i<daysofthemonth;i++){
			sumwhole = sumwhole+option2.series[0].data[i];
			option2.series[2].data[i] = sumwhole;
		
		}
	
	
	    drawechart("main2",option2);
    }
	 
	 
	


}
function DaysOfMonth(dateval)
{
	var month = dateval.getMonth();
	 
	var year = dateval.getFullYear();
	var day = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
	if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
	{
		day[1] = 29;
	}
	 
	return day[month ];
}
function showgaojingcontent(lineid){
	$("#huodongbaojing > .begintablecontent").html("");
	showLoading();
	var linestrorig =   '  <TABLE class="tableheaderlistcontent"   >      \
							   <TR>    \
									<TH  >!!MachineType!!</TH>  \
									<TH >!!ExceptionCode!!</TH>   \
									<TH  > !!ErrorDesc!!       </TH>   \
									<TH  >!!ErrorTime!! </TH>			  \
							   </TR>    \
				        </TABLE> ' ;
	var liststrs="";
	$.getJSON("/jgetalarms?lineid="+lineid,null,function(data){ 
		 
		$.each(data,function(idx,item){ 
			/*if(idx==0){ 
				 return true;//同countinue，返回false同break 
			}  */
			hideLoading();
			linestr = linestrorig ;
			 
			var tmpType = item.MachineType;
			if (item.MachineType =="Loader") {
				tmpType = "放板机";
			}else{
			    if (item.MachineType =="Unloader") {
					tmpType = "收板机";
				} 
			}
			linestr = linestr.replace(/!!MachineType!!/g,tmpType);
			 
			linestr = linestr.replace(/!!ExceptionCode!!/g,item.ExceptionCode);
			linestr = linestr.replace(/!!ErrorDesc!!/g,item.ErrorDesc);
			linestr = linestr.replace(/!!ErrorTime!!/g,item.ErrorTime);
			
			liststrs = liststrs + linestr;
	    });
		$("#huodongbaojing > .begintablecontent").html(liststrs ) ;
	});
	
	
		
	iTime = setTimeout("showgaojingcontent("+lineid+")", 30000);
}
var iTime;
var VV = new Array();
function showStationlist(url){
	g_url = url;
	$("#showStationlistcontent").html("");
	$("#workshopname").text( url.split("=")[1]);
	showLoading();
	
	var linestrorig =  ' <a href="#shebeixiangqing" onclick="javascript:getLineInfo(\'!!LineID!!\',\'!!nowstate!!\')">   \
							  <TABLE class="tableheaderlistcontent"   > \
									\
								   <TR>           \
										<TH  >L!!LineID!!</TH>     \
										<TH >!!SumDay!!</TH>       \
										<TH  style="color:!!color!!">!!%%!!%</TH>       \
										<TH  ><img src="img/!!downup!!.png" class="ui-li-icon"> !!Velocity!!</TH>         \
										<TH  >              \
										!!status!!  \
										</TH>         \
										<TH >!!TimeLast!!</TH>         \
										<TH >!!ExceptionCount!!</TH>       \
								 </TR>      \
                                          \
							</TABLE></a>     \
							 ' ;
	var liststrs="";
	//{"LineID":1,"SumDay":7062,"PlanSumDay":7000,"Velocity":1008,"Status":"自动运行中","UpdateTime":"2015-01-13 05:01:32","ExceptionCount":0}
	$.getJSON(url,null,function(data){ 
		 
		$.each(data,function(idx,item){ 
			/*if(idx==0){ 
				 return true;//同countinue，返回false同break 
			}  */
			hideLoading();
			linestr = linestrorig ;
			 
			linestr = linestr.replace(/!!LineID!!/g,item.LineID);
			 
			linestr = linestr.replace(/!!SumDay!!/g,item.SumDay);
			var rate = parseInt(item.SumDay )/parseInt(item.PlanSumDay) *100;
			if (rate < 1) linestr = linestr.replace(/!!color!!/g,"green");
			if (rate == 1) linestr = linestr.replace(/!!color!!/g,"white");
			if (rate > 1) linestr = linestr.replace(/!!color!!/g,"red");
			linestr = linestr.replace(/!!%%!!/g,rate.toFixed(2));
			linestr = linestr.replace(/!!Velocity!!/g,item.Velocity);
			
			if (typeof VV[idx] == 'undefined'){
			    VV[idx] = item.Velocity;
				linestr = linestr.replace(/!!downup!!/g,"equalicon");
			}else{
				rate = parseInt(item.Velocity) - parseInt(VV[idx]);
				 
				if (rate < 0) linestr = linestr.replace(/!!downup!!/g,"downicon");
				if (rate == 0) linestr = linestr.replace(/!!downup!!/g,"equalicon");
				if (rate > 0) linestr = linestr.replace(/!!downup!!/g,"upicon");
			
			}
			
			var statusStr = "" ;
			if (item.Status == "自动运行中"){
				statusStr = '<img src="img/yunxing.png" class="runingstate"  /> <span style="color:rgb(72,144,55)"> 运行 </span>  ';
			}
			if (item.Status == "停止"){
				statusStr = '<img src="img/tingzhi.png" class="runingstate" /><span style="color:rgb(221,85,26)" > 停止 </span>  ';
			}
			if (item.Status == "手动"){
				statusStr = '<img src="img/shoudong.png" class="runingstate" /><span style="color:rgb(148,107,37)" > 手动 </span> ';
			}
			if (item.Status == "待机"){
				statusStr = '<img src="img/daiji.png" class="runingstate" /><span style="color:rgb(113,111,111)" > 待机 </span> ' ;
			}
			if (item.Status == "通讯中断"){
				statusStr = '<img src="img/zhongduan.png" class="runingstate" /><span style="color:rgb(231,24,26)" > 中断 </span>' ;
			}
			linestr = linestr.replace(/!!status!!/g, statusStr );
			linestr = linestr.replace(/!!nowstate!!/g, item.Status ); 
			linestr = linestr.replace(/!!TimeLast!!/g, item.TimeLast);
			linestr = linestr.replace(/!!ExceptionCount!!/g, item.ExceptionCount);
			
			 
			liststrs = liststrs + linestr;
		});
		$("#showStationlistcontent").html(liststrs ) ;
		
		iTime = setTimeout("showStationlist("+url+")", 30000);
	});
	
}
var V = new Array();
function showWorkshoplist(){
	$("#workshoplistcontent").html("") ;
	showLoading();
    var linestrorig =  ' <a href="#stationlist" onclick="javascript:showStationlist(\'/jgetlineinfo?workshop=!!WsName!! \')">   \
						<TABLE class="tableheaderlistcontent"   > \
								\
							   <TR> \
									<TH  >!!WsName!!</TH> \
									<TH >!!SumDay!!</TH> \
									<TH style="color:!!color!!" >!!%%!!%</TH> \
									<TH  >!!X-Y!!</TH> \
									<TH  ><img src="img/!!downup!!.png" class="ui-li-icon"> !!V!!</TH> \
								  \
							 </TR>  \
                                      \
						</TABLE></a>  ' ;
	var liststrs="";
	$.getJSON("/jgetwsinfo",null,function(data){ 
		 
		$.each(data,function(idx,item){ 
			/*if(idx==0){ 
				 return true;//同countinue，返回false同break 
			}  */
			hideLoading();
			linestr = linestrorig ;
			 
			linestr = linestr.replace(/!!WsName!!/g,item.WsName);
			 
			linestr = linestr.replace(/!!SumDay!!/g,item.SumDay);
			var rate = parseInt(item.SumDay )/parseInt(item.PlanSumDay) *100;
			if (rate < 1) linestr = linestr.replace(/!!color!!/g,"green");
			if (rate == 1) linestr = linestr.replace(/!!color!!/g,"white");
			if (rate > 1) linestr = linestr.replace(/!!color!!/g,"red");
			linestr = linestr.replace(/!!%%!!/g,rate.toFixed(2));
			linestr = linestr.replace(/!!V!!/g,item.Velocity);
			
			if (typeof V[idx] == 'undefined'){
			    V[idx] = item.Velocity;
				linestr = linestr.replace(/!!downup!!/g,"equalicon");
			}else{
				rate = parseInt(item.Velocity) - parseInt(V[idx]);
				 
				if (rate < 0) linestr = linestr.replace(/!!downup!!/g,"downicon");
				if (rate == 0) linestr = linestr.replace(/!!downup!!/g,"equalicon");
				if (rate > 0) linestr = linestr.replace(/!!downup!!/g,"upicon");
			
			}
			 
			linestr = linestr.replace(/!!X-Y!!/g, item.LineCountAuto +"/"+item.LineCount);
			
			 
			liststrs = liststrs + linestr;
		});
		$("#workshoplistcontent").html(liststrs ) ;
		
		iTime = setTimeout("showWorkshoplist()", 30000);
	});
			
	
	
}
function clearLineInfo(){
	$("#workshop").text("");
	$("#linetype").text("");
	$("#MachineID").text("");
	$("#MachineName").text("");
	$("#MachineType").text("");
	$("#TotalOutput").text("");
	$("#CurOutput").text("");
	$("#CurTotalOutput").text("");
	$("#CurPartNum").text("");
	$("#CurBatchNum").text("");
	$("#UpdateTime").text("");
	$("#LoaderStatus").text("");
	
	$("#MachineID1").text("");
	$("#MachineName1").text("");
	$("#MachineType1").text("");
	$("#TotalOutput1").text("");
	$("#CurOutput1").text("");
	$("#CurTotalOutput1").text("");
	$("#CurPartNum1").text("");
	$("#CurBatchNum1").text("");
	$("#UpdateTime1").text("");
	$("#UnloaderStatus1").text("");
			
}
function getLineInfo(lineid,nowstate){
	 
	g_lineid  = lineid;
	clearLineInfo(); 
	$.getJSON("/infoloaderbylineid?lineid="+lineid+"&&loader=1" ,null,function(data){ 
				
			 
			$("#workshop").text(data.Workshop);
			$("#linetype").text(data.LineType);
			$("#MachineID").text(data.MachineID);
			$("#MachineName").text(data.MachineName);
			$("#MachineType").text(data.MachineType);
			$("#TotalOutput").text(data.TotalOutput);
			$("#CurOutput").text(data.CurOutput);
			$("#CurTotalOutput").text(data.CurTotalOutput);
			$("#CurPartNum").text(data.CurPartNum);
			$("#CurBatchNum").text(data.CurBatchNum);
			$("#UpdateTime").text(data.UpdateTime);
			$("#LoaderStatus").text(data.LoaderStatus);
			
		 $(".headernameword").text(data.Workshop+" L"+ lineid+" "+data.LineType);
	}); 
	
	 $.getJSON("/infoloaderbylineid?lineid="+lineid+"&&loader=0" ,null,function(data){ 
				
			 
			//$("#workshop").text(data.Workshop);
			//$("#linetype").text(data.LineType);
			$("#MachineID1").text(data.MachineID);
			$("#MachineName1").text(data.MachineName);
			$("#MachineType1").text(data.MachineType);
			$("#TotalOutput1").text(data.TotalOutput);
			$("#CurOutput1").text(data.CurOutput);
			$("#CurTotalOutput1").text(data.CurTotalOutput);
			$("#CurPartNum1").text(data.CurPartNum);
			$("#CurBatchNum1").text(data.CurBatchNum);
			$("#UpdateTime1").text(data.UpdateTime);
			$("#UnloaderStatus1").text(data.UnloaderStatus);
			
		 
	}); 
	removeClassFunc($(".headerleftname"));//.removeClass(["backrunning","backstop","backhandle","backwait","backbroken"]);
	removeClassFunc($(".headerrightpic"));//.removeClass(["backrunning","backstop","backhandle","backwait","backbroken"]);
	if (nowstate == "自动运行中"){
		
		$(".headerleftname").addClass("backrunning");
		$(".headerrightpic").addClass("backrunning");
		$(".headerrightpic > img").prop("src","img/yunxingstate.png");
	}
	if (nowstate == "停止"){
		$(".headerleftname").addClass("backstop");
		$(".headerrightpic").addClass("backstop");
		$(".headerrightpic > img").prop("src","img/tingzhistate.png");
	}
	if (nowstate == "手动"){
		$(".headerleftname").addClass("backhandle");
		$(".headerrightpic").addClass("backhandle");
		$(".headerrightpic > img").prop("src","img/shoudongstate.png");
	}
	if (nowstate == "待机"){
		$(".headerleftname").addClass("backwait");
		$(".headerrightpic").addClass("backwait");
		$(".headerrightpic > img").prop("src","img/daijistate.png");
	}
	if (nowstate == "通讯中断"){
		$(".headerleftname").addClass("backbroken");
		$(".headerrightpic").addClass("backbroken");
		$(".headerrightpic > img").prop("src","img/zhongduanstate.png");
	}
	
	
	
}
function removeClassFunc(obj){
	obj.removeClass("backrunning");
	obj.removeClass("backstop");
	obj.removeClass("backhandle");
	obj.removeClass("backwait");
	obj.removeClass("backbroken");
}
function  showtabl(headerstr){
	var fontsize = 9;
	var viewheight = $(window).height();
	var viewwidth = $(window).width();
	var headerheight = $(headerstr +">[data-role='header']").height()+2;
	var headerlistheight = 0;
	var tableheaderheight = $("#huodongbaojing .tableheaderlist1").height();
	console.log(tableheaderheight );
	var tabwidth = $(".tabindex").width();
	if (headerstr == "#huodongbaojing"){
	   
	   $(".tableheaderlist1").css({"width":viewwidth-tabwidth-2+"px" });
	   $(".begintablecontent").css({"margin-top":tableheaderheight+"px"});
	}
	if (headerstr == "#shebeixiangqing"){
	  $("#shebeixiangqingcontent").css({"width":viewwidth-tabwidth-3+"px"});
	}
	if (headerstr == "#shebeitongjitubiao"){
	  $("#shebeitongjitubiaocontent").css({"width":viewwidth-tabwidth-3+"px"});
		
	}
	var contentheight = viewheight - headerheight  ;
	console.log(headerheight  );
	console.log(contentheight);
	console.log(viewwidth);
	console.log(tabwidth);
	$(".tabindex ").css({"display":"block","right":0+"px" ,"bottom":2+"px" ,"height":contentheight+"px"});
	$(".tabdev").css({"height":4*fontsize -2+"px" ,"padding-top":(contentheight/3-4*fontsize)/2+"px","padding-bottom":(contentheight/3-4*fontsize)/2+"px"});
   $(headerstr+" .tableheaderlistcontent").css({"width":viewwidth-tabwidth-2+"px" });
   console.log($(".tableheaderlistcontent").css("width"));
}

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