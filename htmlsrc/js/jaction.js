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
	
	console.log(screen.width );
	console.log(screen.height );
	showWorkshoplist();
	
	$("body").click(function(e){
		if (typeof e.target.src == "undefined") {
	 
			$(".dropdownmenu").removeClass("showclassdiskplay");
		}else{

            if (e.target.src.indexOf("menulog.png") < 0){
				$(".dropdownmenu").removeClass("showclassdiskplay");
			}

		}		
			 
			 
	});
	
});
$(document).on("pagehide", "#workshoplist", function(){
	
	 V = [];
	 clearTimeout(iTime1);
	
});
var g_url;
$(document).on("pageshow", "#stationlist", function(){
	
	if (typeof g_url == "undefined") {window.location.href="#workshoplist"; return;} 
	//showStationlist();
	
});
$(document).on("pagehide", "#stationlist", function(){
	
	 
	VV = [];
	clearTimeout(iTime2);
	
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
	clearTimeout(iTime3);
	
	  
	  
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
var iTime3;
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
	
	
		
	iTime3 = setTimeout("showgaojingcontent("+lineid+")", 30000);
}
var iTime2;
var VV = new Array();
function showStationlist(url){
	g_url = url;
	$("#stationlistid > .tableheaderlistcontent").html("");
	
	$("#workshopname").text( url.split("=")[1]);
	showLoading();
	
	var linestrorig =  ' 	   <TR  onclick="gotoshebeixiangqing();getLineInfo(\'!!LineID!!\',\'!!nowstate!!\')">           \
										<TD  >L!!LineID!!</TD>     \
										<TD >!!SumDay!!</TD>       \
										<TD  style="color:!!color!!">!!%%!!%</TD>       \
										<TD  >!!Velocity!!<img src="img/!!downup!!.png" class="ui-li-icon"> </TD>         \
										<TD  >              \
										!!status!!  \
										</TD>         \
										<TD >!!TimeLast!!</TD>         \
										<TD >!!ExceptionCount!!</TD>       \
								 </TR>      \
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
			    
				linestr = linestr.replace(/!!downup!!/g,"equalicon");
			}else{
				rate = parseInt(item.Velocity) - parseInt(VV[idx]);
				 
				if (rate < 0) linestr = linestr.replace(/!!downup!!/g,"downicon");
				if (rate == 0) linestr = linestr.replace(/!!downup!!/g,"equalicon");
				if (rate > 0) linestr = linestr.replace(/!!downup!!/g,"upicon");
			
			}
			VV[idx] = item.Velocity;
			
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
		 
		$("#stationlistid > .tableheaderlistcontent").html(liststrs ) ;
		
		//FixTable("stationlistid", 1, screen.width,500);
		
		
	});
	 
	iTime2 = setTimeout("showStationlist('"+url+"')", 30000);
	//iTime2 = setTimeout("alert('l')", 5000);
	 
}
var iTime1;
var V = new Array();
function showWorkshoplist(){
	 
	//$("#workshoplistcontent").html("") ;
	$("#workshopid > .tableheaderlistcontent").html("");
	
	showLoading();
    var linestrorig =  '    <TR  onclick="gotostationlist();showStationlist(\'/jgetlineinfo?workshop=!!WsName!! \')"> \
									<TD  >!!WsName!!</TD> \
									<TD >!!SumDay!!</TD> \
									<TD style="color:!!color!!" >!!%%!!%</TD> \
									<TD  >!!X-Y!!</TD> \
									<TD  >!!V!!<img src="img/!!downup!!.png" class="ui-li-icon"> </TD> \
								  \
							 </TR>  \
                                      \
						  ' ;
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
			   
				linestr = linestr.replace(/!!downup!!/g,"equalicon");
			}else{
				rate = parseInt(item.Velocity) - parseInt(V[idx]);
				 
				if (rate < 0) linestr = linestr.replace(/!!downup!!/g,"downicon");
				if (rate == 0) linestr = linestr.replace(/!!downup!!/g,"equalicon");
				if (rate > 0) linestr = linestr.replace(/!!downup!!/g,"upicon");
			
			}
			V[idx] = item.Velocity;
			 
			linestr = linestr.replace(/!!X-Y!!/g, item.LineCountAuto +"/"+item.LineCount);
			
			 
			liststrs = liststrs + linestr;
		});
		//$("#workshoplistcontent").html(liststrs ) ;
		$("#workshopid > .tableheaderlistcontent").html(liststrs);
		//console.log($("#showworkshoplistid").html());
		
		FixTable("workshopid", 1, screen.width,500);
		iTime1 = setTimeout("showWorkshoplist()", 30000);
		
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
	   
	   $(".begintablecontent").css({"width":viewwidth-tabwidth-2+"px" });
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
   $(headerstr+"  .tableheaderlistcontent").css({"width":viewwidth-tabwidth-2+"px" });
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

 
function clickMenuRight(){
	 
	 
	$(".dropdownmenu").toggleClass("showclassdiskplay");
	 
	  
	 
	
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
function closeDoor(){
	
	 
	window.close();
	document.close();
	navigator.app.exitApp();  
	
}
function FixTable1(TableID, FixColumnNumber, width, height, overflowx, overflowy) {
 /// 参数说明
 /// <param name="TableID" type="String">
 ///     要锁定的Table的ID
 /// </param>
 /// <param name="FixColumnNumber" type="Number">
 ///     要锁定列的个数
 /// </param>
 /// <param name="width" type="Number">
 ///     显示的宽度
 /// </param>
 /// <param name="height" type="Number">
 ///     显示的高度
 /// </param>
 if ($("#" + TableID + "_tableLayout").length != 0) {
  $("#" + TableID + "_tableLayout").before($("#" + TableID));
  $("#" + TableID + "_tableLayout").empty();
 } else {
  $("#" + TableID).after(
    "<div id='" + TableID
      + "_tableLayout' style='overflow:hidden;height:"
      + height + "px; width:100%;'></div>");
 }
 $(
   '<div id="' + TableID + '_tableFix"></div>' + '<div id="' + TableID
     + '_tableHead"></div>' + '<div id="' + TableID
     + '_tableColumn"></div>' + '<div id="' + TableID
     + '_tableData"></div>').appendTo(
   "#" + TableID + "_tableLayout");
 var oldtable = $("#" + TableID);
 var tableFixClone = oldtable.clone(true);
 tableFixClone.attr("id", TableID + "_tableFixClone");
 $("#" + TableID + "_tableFix").append(tableFixClone);
 var tableHeadClone = oldtable.clone(true);
 tableHeadClone.attr("id", TableID + "_tableHeadClone");
 $("#" + TableID + "_tableHead").append(tableHeadClone);
 var tableColumnClone = oldtable.clone(true);
 tableColumnClone.attr("id", TableID + "_tableColumnClone");
 $("#" + TableID + "_tableColumn").append(tableColumnClone);
 $("#" + TableID + "_tableData").append(oldtable);
 $("#" + TableID + "_tableLayout table").each(function() {
  $(this).css("margin", "0");
 });
 var HeadHeight = $("#" + TableID + "_tableHead thead").height();
 HeadHeight += 2;
 $("#" + TableID + "_tableHead").css("height", HeadHeight);
 $("#" + TableID + "_tableFix").css("height", HeadHeight);
 var ColumnsWidth = 0;
 var ColumnsNumber = 0;
 $("#" + TableID + "_tableColumn tr:last td:lt(" + FixColumnNumber + ")")
   .each(function() {
    ColumnsWidth += $(this).outerWidth(true);
    ColumnsNumber++;
   });
 ColumnsWidth += 2;
 if ($.browser.msie) {
  switch ($.browser.version) {
  case "7.0":
   if (ColumnsNumber >= 3)
    ColumnsWidth--;
   break;
  case "8.0":
   if (ColumnsNumber >= 2)
    ColumnsWidth--;
   break;
  }
 }
 $("#" + TableID + "_tableColumn").css("width", ColumnsWidth);
 $("#" + TableID + "_tableFix").css("width", ColumnsWidth);
 $("#" + TableID + "_tableData").scroll(
   function() {
    $("#" + TableID + "_tableHead").scrollLeft(
      $("#" + TableID + "_tableData").scrollLeft());
    $("#" + TableID + "_tableColumn").scrollTop(
      $("#" + TableID + "_tableData").scrollTop());
   });
 $("#" + TableID + "_tableFix").css({
  "overflow" : "hidden",
  "position" : "relative",
  "z-index" : "50",
  "background-color" : "Silver"
 });
 $("#" + TableID + "_tableHead").css({
  "overflow" : "hidden",
  "width" : "98.4%" ,
  "position" : "relative",
  "z-index" : "45",
  "background-color" : "#FFFFFF"
 });
 $("#" + TableID + "_tableColumn").css({
  "overflow" : "hidden",
  "height" : height - 17,
  "position" : "relative",
  "z-index" : "40",
  "background-color" : "Silver"
 });
 $("#" + TableID + "_tableData").css({
  "overflow-x" : overflowx,
  "overflow-y" : overflowy,
  "width" : "100%",
  "height" : height,
  "position" : "relative",
  "z-index" : "35"
 });
 if ($("#" + TableID + "_tableHead").width() > $(
   "#" + TableID + "_tableFix table").width()) {
  $("#" + TableID + "_tableHead").css("width",
    $("#" + TableID + "_tableFix table").width());
  $("#" + TableID + "_tableData").css("width",
    $("#" + TableID + "_tableFix table").width() + 17);
 }
 if ($("#" + TableID + "_tableColumn").height() > $(
   "#" + TableID + "_tableColumn table").height()) {
  $("#" + TableID + "_tableColumn").css("height",
    $("#" + TableID + "_tableColumn table").height());
  $("#" + TableID + "_tableData").css("height",
    $("#" + TableID + "_tableColumn table").height() + 17);
 }
 $("#" + TableID + "_tableFix").offset(
   $("#" + TableID + "_tableLayout").offset());
 $("#" + TableID + "_tableHead").offset(
   $("#" + TableID + "_tableLayout").offset());
 $("#" + TableID + "_tableColumn").offset(
   $("#" + TableID + "_tableLayout").offset());
 $("#" + TableID + "_tableData").offset(
   $("#" + TableID + "_tableLayout").offset());

 /*鼠标滑过换色*/
 $("#"+TableID+" tbody tr").hover( 
     function () { 
        $(this).addClass("over");
      },
      function () {
       if (this.rowIndex % 2 == 0) { 
         $(this).removeClass("over");
      } else { 
       $(this).removeClass("over");
      }
       
      });
}

function FixTable(TableID, FixColumnNumber, width, height) { 
	/// <summary> 
	/// 锁定表头和列 
	/// <para> sorex.cnblogs.com </para> 
	/// </summary> 
	/// <param name="TableID" type="String"> 
	/// 要锁定的Table的ID 
	/// </param> 
	/// <param name="FixColumnNumber" type="Number"> 
	/// 要锁定列的个数 
	/// </param> 
	/// <param name="width" type="Number"> 
	/// 显示的宽度 
	/// </param> 
	/// <param name="height" type="Number"> 
	/// 显示的高度 
	/// </param> 
	if ($("#" + TableID + "_tableLayout").length != 0) { 
	$("#" + TableID + "_tableLayout").before($("#" + TableID)); 
	$("#" + TableID + "_tableLayout").empty(); 
	} 
	else { 
	$("#" + TableID).after("<div id='" + TableID + "_tableLayout' style='overflow:hidden;height:" + height + "px; width:" + width + "px;'></div>"); 
	} 
	$('<div id="' + TableID + '_tableFix"></div>' 
	+ '<div id="' + TableID + '_tableHead"></div>' 
	+ '<div id="' + TableID + '_tableColumn"></div>' 
	+ '<div id="' + TableID + '_tableData"></div>').appendTo("#" + TableID + "_tableLayout"); 
	var oldtable = $("#" + TableID); 
	var tableFixClone = oldtable.clone(true); 
	tableFixClone.attr("id", TableID + "_tableFixClone"); 
	$("#" + TableID + "_tableFix").append(tableFixClone); 
	var tableHeadClone = oldtable.clone(true); 
	tableHeadClone.attr("id", TableID + "_tableHeadClone"); 
	$("#" + TableID + "_tableHead").append(tableHeadClone); 
	var tableColumnClone = oldtable.clone(true); 
	tableColumnClone.attr("id", TableID + "_tableColumnClone"); 
	$("#" + TableID + "_tableColumn").append(tableColumnClone); 
	$("#" + TableID + "_tableData").append(oldtable); 
	$("#" + TableID + "_tableLayout table").each(function () { 
	$(this).css("margin", "0"); 
	}); 
	var HeadHeight = $("#" + TableID + "_tableHead thead").height(); 
	HeadHeight += 2; 
	$("#" + TableID + "_tableHead").css("height", HeadHeight); 
	$("#" + TableID + "_tableFix").css("height", HeadHeight); 
	var ColumnsWidth = 0; 
	var ColumnsNumber = 0; 
	$("#" + TableID + "_tableColumn tr:last td:lt(" + FixColumnNumber + ")").each(function () { 
	ColumnsWidth += $(this).outerWidth(true); 
	ColumnsNumber++; 
	}); 
	ColumnsWidth += 2; 
	if ($.support.msie) { 
	switch ($.support.version) { 
	case "7.0": 
	if (ColumnsNumber >= 3) ColumnsWidth--; 
	break; 
	case "8.0": 
	if (ColumnsNumber >= 2) ColumnsWidth--; 
	break; 
	} 
	} 
	$("#" + TableID + "_tableColumn").css("width", ColumnsWidth); 
	$("#" + TableID + "_tableFix").css("width", ColumnsWidth); 
	$("#" + TableID + "_tableData").scroll(function () { 
	$("#" + TableID + "_tableHead").scrollLeft($("#" + TableID + "_tableData").scrollLeft()); 
	$("#" + TableID + "_tableColumn").scrollTop($("#" + TableID + "_tableData").scrollTop()); 
	}); 
	$("#" + TableID + "_tableFix").css({ "overflow": "hidden", "position": "relative", "z-index": "50", "background-color": "white" }); 
	$("#" + TableID + "_tableHead").css({ "overflow": "hidden", "width": width , "position": "relative", "z-index": "45", "background-color": "white" }); 
	$("#" + TableID + "_tableColumn").css({ "overflow": "hidden", "height": height , "position": "relative", "z-index": "40", "background-color": "white" }); 
	$("#" + TableID + "_tableData").css({ "overflow": "scroll", "width": width, "height": height, "position": "relative", "z-index": "35" }); 
	if ($("#" + TableID + "_tableHead").width() > $("#" + TableID + "_tableFix table").width()) { 
	$("#" + TableID + "_tableHead").css("width", $("#" + TableID + "_tableFix table").width()); 
	$("#" + TableID + "_tableData").css("width", $("#" + TableID + "_tableFix table").width() ); 
	} 
	if ($("#" + TableID + "_tableColumn").height() > $("#" + TableID + "_tableColumn table").height()) { 
	$("#" + TableID + "_tableColumn").css("height", $("#" + TableID + "_tableColumn table").height()); 
	$("#" + TableID + "_tableData").css("height", $("#" + TableID + "_tableColumn table").height() ); 
	} 
	$("#" + TableID + "_tableFix").offset($("#" + TableID + "_tableLayout").offset()); 
	$("#" + TableID + "_tableHead").offset($("#" + TableID + "_tableLayout").offset()); 
	$("#" + TableID + "_tableColumn").offset($("#" + TableID + "_tableLayout").offset()); 
	$("#" + TableID + "_tableData").offset($("#" + TableID + "_tableLayout").offset()); 
} 