$(document).ready(function(){ 
  //  $("#sel2").empty();
	
	$("#sel1").change(function(){
		
		       
		       var sel1value = $("#sel1").val();
			  
			   if (sel1value == "1")
			   {
			  
			      GetJsonWS();
			      
			   }
			   else
			   {
			    
			      GetJsonLT();
				 
			   }
		
		
	});
	 
	
	$("#sel2").change(function(){
		     var sel2value = $('#sel2 option:first').val();
			 var sel2select = $("#sel2  option:selected").text(); 
			  
			 if (sel2value == -1)
			 {
				$(".submitimg a").attr("href" , "#sbztmain");
			    $(".submitimg a").attr("href" ,$(".submitimg a").attr("href")+"?val="+sel2select+"&which=0") ;
				val = sel2select;
				which = 0;
			 }
			 else
			 {
			    $(".submitimg a").attr("href" , "#sbztmain");
			    $(".submitimg a").attr("href" ,$(".submitimg a").attr("href")+"?val="+sel2select+"&which=1") ;
				val = sel2select;
				which = 1;
			 
			 }
		
		
	});
	
	
	$(document).on("pageshow", "#sbztmain", function(){
            
			tout = 0;
			if (typeof val == 'undefined' || typeof which =='undefined'){
			    val = "aaaa";
	            which = 99;
			}
	
			sbztmainact(val, which);
			
    });
	$(document).on("pageshow", "#sbxqall", function(){
            
			 
			if (typeof funcflag == 'undefined'  ){
			     window.location.href = "#sbztqt";
			}
	
			 
			
    });
	
	$(document).on("pagehide", "#sbztmain", function(){
            
			tout  = 99;
			console.log("sbztmain is hide");
			clearTimeout(ttout);
    });
	$(document).on("pageshow", "#tjtubiao", function(){
            SetRadioCheck();
			if (typeof nowlineid === 'undefined'){
				 window.location.href = "#sbztqt";
			}
			cleartubiaopage();
			
    });
	$(document).on("pageshow", "#hdgjlog", function(){
		    var lineid;
			if (typeof nowlineid === 'undefined'){
				lineid="*";
				nowlineid = "*";
			}else{
				lineid = nowlineid;
			}
            GetJsonAlarms(lineid,0);
			console.log("stationis "+lineid);
			$("#selpaixuid").change(function(){
		
		       
		       var sel1value = $("#selpaixuid").val();
			  
			   if (sel1value == "1")
			   {
			  
			     GetJsonAlarms(nowlineid,1);
			      
			   }
			    if (sel1value == "2")
			   {
			    
			     GetJsonAlarms(nowlineid,2);
				 
			   }
		
		
		    });
			
    });
	
	
	 
	 
});
function cleartubiaopage(){
		$("#canneng").text("");
		$("#pianchachan").text("");
		$("#pianchajin").text("");
		$("#jiadonglv").text("");
		
		drawechart("main0",{});
		drawechart("main1",{});
		drawechart("main2",{});
	
}
function login(){
	
	if ($("#password").val() != "passpass"){
		 window.location.href = "#login";
		 
	}else{
		 
		 window.location.href = "#mainpage";
	}
	
	
}
function changeimgsbbj(){
	$(".paixuhang2 a img").prop("src","./img/sbxq.png");
	$(".paixuhang2 a").prop("href","#sbxqall");
	
}
function chakanqubu(val ,which){
	 
	if ( typeof(ttout) != "undefined" ){
	   console.log("thread is stop ");
	   console.log(ttout);
	   clearTimeout(ttout);
	}
	 
	tout = 0;
	this.val = val;
	this.which = which;
	//sbztmainact(val, which);
	
	
}
function clickqbck(){
	val = "aaaa";
	which = 99;
	
	
}

function tjtubiaoact(lineid){
	
	 
	$(".sbline1-1").html("<p> 站台"+lineid /*+" "+ wstitle + " " +lttitle */+ "</p>");
	nowlineid = lineid;
}

function begintongji(){
	    cleartubiaopage();
		
		var atype = $('input:radio[name=atype]:checked').val();
		var aunit = $('input:radio[name=aunit]:checked').val();
		var adate = $("#tjdateinput").val();
		var adays = $("#tjts").val();
		var lineid = nowlineid
		if (adate == ""){
			alert("请先选择日期");
			return;
		}
		if (aunit === undefined){
			alert("请先点选时间单位");
			return;
			
		}
		if (atype == 2 || atype == 3){//如果自定义必须输入天数
			if (adays < 2){
				alert("请先选择天数");
			   return;
			}
		}
			 //datatochart?atype=0&aunit=0&adate=2014-12-12&adays=0&lineid=1
		url = "/datatochart?atype="+atype+"&aunit="+aunit+"&adate="+adate+"&adays="+adays+"&lineid="+lineid ;
		console.log(url);
		
		var datesel = new Date(adate);
	    console.log(datesel);
	    var datenow = new Date();
		if (datesel > datenow){
			alert("请正确选择时间，你把时间选择在未来了");
			return;
		}
		$.getJSON(url,null,function(data){ 
			if (atype==0 && aunit==0){
			   setechart0(data);
			}
			 if (atype==1 && aunit==1){
			   setechart1(data);
			}
			 if (atype==2 && aunit==1){
			    console.log("this is 2 setchart");
			   setechart2(data);
			}
			 if (atype==3 && aunit==2){
			   setechart3(data);
			}
		});
		  
 
	
	
	
}
function SetRadioCheck(){
				 
		$("#radio-xiaoshi").prop("disabled","disabled");
		$("#radio-ri").prop("disabled","disabled");			
		$("#radio-ban").prop("disabled","disabled");
		
		 $("#tjts").prop("disabled","disabled");
		
		$("#radio-ribao").click(function(){
			
			$("#tjdate").text("统计日期：");
			 console.log($('input:radio[name=aunit]:checked').val());
		//	$("#radio-yuebao").prop("checked",false).checkboxradio("refresh");
		//	$("#radio-zdy1").prop("checked",false).checkboxradio("refresh");
		//	$("#radio-zdy2").prop("checked",false).checkboxradio("refresh");
			 
			
		//	$("#radio-xiaoshi").prop("checked","checked").checkboxradio("refresh") ;
		//	$("#radio-xiaoshi").prop("checked","checked").checkboxradio("refresh") ;
			 
			
			$("#radio-ri").removeAttr("checked" ).checkboxradio("refresh") ;
			$("#radio-ri").prop("disabled","disabled").checkboxradio("refresh") ;
			 
			$("#radio-ban").removeAttr("checked" ).checkboxradio("refresh");
			$("#radio-ban").prop("disabled","disabled").checkboxradio("refresh") ;
			
			 //$("#tjts").prop("disabled",true).selectmenu("refresh",true);
			 $("#tjts").prop("disabled",true);
			// $("#tjts").selectmenu("refresh",true);
			$("#radio-xiaoshi").removeAttr("disabled").checkboxradio("refresh") ;
			$("#radio-xiaoshi").prop("checked","checked").checkboxradio("refresh")  ;
			 console.log($('input:radio[name=aunit]:checked').val());
			
		
		});
		
		$("#radio-yuebao").click(function(){
			
			$("#tjdate").text("统计月份：");
		//	$("#radio-ribao").prop("checked",false).checkboxradio("refresh");
		//	$("#radio-zdy1").prop("checked",false).checkboxradio("refresh");
		//	$("#radio-zdy2").prop("checked",false).checkboxradio("refresh");
			 
			$("#radio-xiaoshi").prop("checked",false) ;
			$("#radio-xiaoshi").prop("disabled",true).checkboxradio("refresh");
			$("#radio-ri").prop("disabled",false);
			$("#radio-ri").prop("checked",true).checkboxradio("refresh");
			
			$("#radio-ban").prop("checked",false);
			$("#radio-ban").prop("disabled",true).checkboxradio("refresh");
			 
			 //$("#tjts").prop("disabled",true).selectmenu("refresh",true);
			 $("#tjts").prop("disabled","disabled");
			// $("#tjts").selectmenu("refresh",true);
		
		});
		
		$("#radio-zdy1").click(function(){
			
			$("#tjdate").text("开始日期：");
		//	$("#radio-yuebao").prop("checked",false).checkboxradio("refresh");
		//	$("#radio-ribao").prop("checked",false).checkboxradio("refresh");
		//	$("#radio-zdy2").prop("checked",false).checkboxradio("refresh");
			 
			$("#radio-xiaoshi").prop("checked",false);
			$("#radio-xiaoshi").prop("disabled",true).checkboxradio("refresh");
			
			
			
			$("#radio-ban").removeAttr("checked");
			$("#radio-ban").prop("disabled",true).checkboxradio("refresh");
			
			$("#radio-ri").prop("disabled",false).checkboxradio("refresh") ;
			$("#radio-ri").prop("checked","checked").checkboxradio("refresh");
			console.log($("#radio-ri").prop("checked"));
			console.log($("#radio-ri").val());
			console.log($('input:radio[name=aunit]:checked').val());
			 
			 //$("#tjts").prop("disabled",true).selectmenu("refresh",true);
			 $("#tjts").prop("disabled",false);
			// $("#tjts").selectmenu("refresh",true);
			
			 $("#tjts").empty(); 
			 var i=1;
			 var option;
			 for (i;i<=31;i++){
				if (i == 1 ){
				  option = $("<option>").val(i).text("--天--");
				 }else{
				   option = $("<option>").val(i).text(i+"天");
				 }
				$("#tjts").append(option);
			}
			 $("#tjts").selectmenu("refresh",true);
		
		});
		
		$("#radio-zdy2").click(function(){
			
			$("#tjdate").text("开始日期：");
		//	$("#radio-yuebao").prop("checked",false).checkboxradio("refresh");
		//	$("#radio-zdy1").prop("checked",false).checkboxradio("refresh");
		//	$("#radio-ribao").prop("checked",false).checkboxradio("refresh");
			 
			$("#radio-xiaoshi").removeAttr("checked");
			$("#radio-xiaoshi").prop("disabled",true).checkboxradio("refresh");
			$("#radio-ri").removeAttr("checked");
			$("#radio-ri").prop("disabled",true).checkboxradio("refresh");
			$("#radio-ban").prop("disabled",false).checkboxradio("refresh");
			$("#radio-ban").prop("checked",true).checkboxradio("refresh");
			
			 
			 //$("#tjts").prop("disabled",true).selectmenu("refresh",true);
			 $("#tjts").prop("disabled",false);
			// $("#tjts").selectmenu("refresh",true);
			
			$("#tjts").empty(); 
			 var i=1;
			 var option;
			 for (i;i<=10;i++){
				if (i == 1 ){
				  option = $("<option>").val(i).text("--天--");
				 }else{
				   option = $("<option>").val(i).text(i+"天");
				 }
				$("#tjts").append(option);
			}
			 $("#tjts").selectmenu("refresh",true);
		
		});
	
	
	
	}

function setechart0(data){
	var option1= {
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
					"name":"自动运行时间",
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
					"name":"小时目标产量",
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
					"name":"每小时产量",
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
		var option2 = $.extend(true, {}, option1); 
		 
		 
		var hourval = data.Plan.PlanDay / 24;
		hourval = Math.round(hourval*100)/100;
		option2.series[0].data=[];
		option2.series[1].data=[];
		option2.series[2].data=[];
		for (var i=0;i<24;i++){
		   option2.series[1].data.push(hourval);
		   option2.series[2].data.push(0);
		   option2.series[0].data.push(0);
		}
		
		
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
	var adate = $("#tjdateinput").val();
	var datesel = new Date(adate);
	var datenow = new Date();
	
	if (data.Uphstations==null  ) {
		 
		drawechart("main1",0);
		drawechart("main2",0);
		$("#canneng").text("无数据");
		$("#pianchachan").text("无数据");
		$("#pianchajin").text("无数据");
		 
		 
		 
	}else{
			var zongsu = 0;
			var sumofhours = 0;
			$.each(data.Uphstations,function(idx,item){ 
				
					var  thehours = item.Hours.split(" ");
					var thehour = parseInt(thehours[1]);
					option2.series[2].data[thehour] = item.UPH;
					option1.series[0].data[thehour] = item.UPH;
					sumofhours++ ;
					zongsu = zongsu +  item.UPH;
					 
			}); 
			
			var beginhour = parseInt(data.Uphstations[0].Hours.split(" ")[1]);
			console.log(beginhour);
			var sumwhole = 0;
			for (var i=0;i<24;i++){
				sumwhole = sumwhole+option1.series[0].data[i];
				option1.series[2].data[i] = sumwhole;

			}
			
			
			

			var pingjunsum = zongsu/sumofhours;
			pingjunsum = Math.round(pingjunsum*100)/100;
			$("#canneng").text(pingjunsum);
			
			var lefthours = 0;
			if (datesel > datenow){
				alert("请正确选择时间，你把时间选择在未来了");
				return;
			}else{
			  if (datesel.getDate() == datenow.getDate() && datesel.getMonth() == datenow.getMonth() && datesel.getFullYear() == datenow.getFullYear() ){
					lefthours = 24 - datenow.getHours() + 1;
					var pianchachan = pingjunsum*lefthours + zongsu - data.Plan.PlanDay;
					pianchachan = Math.round(pianchachan*100)/100 ;
					if ( pianchachan >= 0){
						pianchachan = "超产" + pianchachan;
					}else{
						pianchachan = "减产" + (0-pianchachan);
					}
					$("#pianchachan").text(pianchachan);
				}else{
					lefthours = 24-beginhour-sumofhours;
					var pianchachan = pingjunsum*lefthours + zongsu  - data.Plan.PlanDay;
					pianchachan = Math.round(pianchachan*100)/100 ;
					if ( pianchachan >= 0){
						pianchachan = "超产" + pianchachan;
					}else{
						pianchachan = "减产" + (0-pianchachan);
					}
					$("#pianchachan").text(pianchachan);
					
				}
				
			}
			
			var pianchajin = data.Plan.PlanDay/pingjunsum-24;
			pianchajin = Math.round(pianchajin*100)/100 ;
			if (pianchajin >= 0 ){
				 pianchajin = "落后"+pianchajin+"小时";
			}else{
				 pianchajin = "超前"+(0-pianchajin)+"小时";
			}
			$("#pianchajin").text(pianchajin);
    }
	var ss=[0,0,0,0,0];
	var zidongxunxingsum = 0;
	var sumofzidongxunxing = 0;
	if (  data.Statusphs==null) {
		drawechart("main0",0);
		
		$("#jiadonglv").text("无数据");
		 
		 
	}else{

	
		 $.each(data.Statusphs,function(idx,item){ 
				var  thehours = item.Hours.split(" ");
				var thehour = parseInt(thehours[1]);
				option2.series[0].data[thehour] = item.S2/(item.S0+item.S1+item.S2+item.S3+item.S4)*60;
				ss[0]=ss[0]+item.S0;
				ss[1]=ss[1]+item.S1;
				ss[2]=ss[2]+item.S2;
				ss[3]=ss[3]+item.S3;
				ss[4]=ss[4]+item.S4;
				zidongxunxingsum = zidongxunxingsum + option2.series[0].data[thehour];
				sumofzidongxunxing++;
		 });
		  
		 
		var beginhourofstatusphs = parseInt(data.Statusphs[0].Hours.split(" ")[1]);
		var jiadonglv  = 0;
		var doinghours = 0;
	   if (datesel.getDate() == datenow.getDate() && datesel.getMonth() == datenow.getMonth() && datesel.getFullYear() == datenow.getFullYear() ){
			doinghours = datenow.getHours() - 1 - beginhourofstatusphs ;
			jiadonglv = zidongxunxingsum / (doinghours * 60);
		}else{
			doinghours = 24 - beginhourofstatusphs;
			jiadonglv = zidongxunxingsum / (doinghours * 60);
			
		}
		// var jiadonglv = ss[2]/(ss[0]+ss[1]+ss[2]+ss[3]+ss[4]);
		 $("#jiadonglv").text(~~(Math.abs(jiadonglv*100))+"%");
	 
    }
	 
	 
	if (data.Uphstations!=null  ){
		drawechart("main2",option2);
		drawechart("main1",option1);
	}



	var option0 = {
				title : {
					text: '运行状态统计分析',
					subtext: '',
					x:'center'
				},
				tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient : 'vertical',
					x : 'left',
					data:['停止','手动','自动运行中','待机','通信中断']
				},
				/*toolbox: {
					show : true,
					feature : {
						mark : {show: true},
						dataView : {show: true, readOnly: false},
						magicType : {
							show: true, 
							type: ['pie', 'funnel'],
							option: {
								funnel: {
									x: '25%',
									width: '50%',
									funnelAlign: 'left',
									max: 1548
								}
							}
						},
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},*/
				calculable : true,
				series : [
					{
						name:'运行状态',
						type:'pie',
						radius : '55%',
						center: ['50%', '60%'],
						data:[
							{value:ss[0], name:'停止'},
							{value:ss[1], name:'手动'},
							{value:ss[2], name:'自动运行中'},
							{value:ss[3], name:'待机'},
							{value:ss[4], name:'通信中断'}
						]
						
					}
				]
			};

	drawechart("main0",option0);

}
function setechart1(data){

    var option1= {
			tooltip: {
				show: true
			},
			legend: {
				data:['自动运行时间','日目标产量','每日产量']
			},
			grid : {
				x : 45 ,
				x2 : 45
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
					"name":"自动运行时间",
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
					"name":"每日产量",
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
		var option2 = $.extend(true, {}, option1); 
		 
		 
		var dayval = data.Plan.PlanDay  ;
		option2.series[0].data=[];
		option2.series[1].data=[];
		option2.series[2].data=[];
		for (var i=0;i<31;i++){
		   option2.series[1].data.push(dayval);
		   option2.series[2].data.push(0);
		   option2.series[0].data.push(0);
		}
		
		
		option1.legend.data[0]="每日产量";
		option1.legend.data[1]="月目标产量";
		option1.legend.data[2]="累计产量";
		option1.series[0].name=option1.legend.data[0];
		option1.series[1].name=option1.legend.data[1];
		option1.series[2].name=option1.legend.data[2];
		var sumval = data.Plan.PlanMonth  ;
		option1.series[0].data=[];
		option1.series[1].data=[];
		option1.series[2].data=[];
		for (var i=0;i<31;i++){
		   option1.series[1].data.push(sumval);
		   option1.series[2].data.push(0);
		   option1.series[0].data.push(0);
		}
		
	var adate = $("#tjdateinput").val();
	var datesel = new Date(adate);
	var datenow = new Date();
	
	if (data.Updstations==null  ) {
		 
		drawechart("main1",0);
		drawechart("main2",0);
		$("#canneng").text("无数据");
		$("#pianchachan").text("无数据");
		$("#pianchajin").text("无数据");
		 
		 
		
	}else{
		var zongsudays = 0;
		var sumofdays = 0;
		$.each(data.Updstations,function(idx,item){ 
			
				var  thedays = item.Days.split("-");
				var theday = parseInt(thedays[2]);
				option2.series[2].data[theday] = item.UPD;
				option1.series[0].data[theday] = item.UPD;
				zongsudays = zongsudays + item.UPD;
				sumofdays++;
				 
				 
		}); 
		var sumwhole = 0;
		for (var i=0;i<31;i++){
			sumwhole = sumwhole+option1.series[0].data[i];
			option1.series[2].data[i] = sumwhole;
		
		}
		var beginday = parseInt(data.Updstations[0].Days.split("-")[2]);
		var pingjunsum = zongsudays/sumofdays;
		pingjunsum = Math.round(pingjunsum*100)/100 ;
		$("#canneng").text(pingjunsum);
		
		
		
		var daysofthemonth = DaysOfMonth(datesel);
		var leftdays = 0;
		
		var pianchachan = 0;
		if (datesel.getMonth() == datenow.getMonth() && datesel.getFullYear() == datenow.getFullYear() ){
			leftdays = daysofthemonth - datesel.getDate() -1;
			pianchachan = zongsudays + pingjunsum*leftdays - data.Plan.PlanMonth;

		} else{
			pianchachan = zongsudays  - data.Plan.PlanMonth;


	    }  	
		pianchachan = Math.round(pianchachan*100)/100 ;
		if ( pianchachan >= 0){
			pianchachan = "超产" + pianchachan;
		}else{
			pianchachan = "减产" + (0-pianchachan);
		} 
		$("#pianchachan").text(pianchachan);
		var pianchajin = data.Plan.PlanMonth/pingjunsum-daysofthemonth;
		pianchajin = Math.round(pianchajin*100)/100 ;
		 if (pianchajin >= 0 ){
			 pianchajin = "落后"+pianchajin+"天";
		 }else{
			 pianchajin = "超前"+(0-pianchajin)+"天";
		 }
		$("#pianchajin").text(pianchajin);
	}
	
	var ss=[0,0,0,0,0];
	var yunxingdaysum = 0;
	var sumofdayyunxing = 0;
	 if ( data.Statuspds==null) {
		drawechart("main0",0);
		
		$("#jiadonglv").text("无数据");
		 
		
	}else{
		 $.each(data.Statuspds,function(idx,item){ 
				var  thedays = item.Days.split("-");
				var theday = parseInt(thedays[2]);
				option2.series[0].data[theday] = item.S2/(item.S0+item.S1+item.S2+item.S3+item.S4)*60*24;
				ss[0]=ss[0]+item.S0;
				ss[1]=ss[1]+item.S1;
				ss[2]=ss[2]+item.S2;
				ss[3]=ss[3]+item.S3;
				ss[4]=ss[4]+item.S4;
				yunxingdaysum = yunxingdaysum + option2.series[0].data[theday];
				sumofdayyunxing++ ;
		 });
		 
		 var begindaysofstatuspds = parseInt(data.Statuspds[0].Days.split("-")[2]);
		 console.log(begindaysofstatuspds);
		 var totledaysofstatuspds = 0;
		 if (datesel.getMonth() == datenow.getMonth() && datesel.getFullYear() == datenow.getFullYear() ){
			totledaysofstatuspds =  datenow.getDate() - 1 - begindaysofstatuspds ;
		 
		 }else{
			totledaysofstatuspds  = daysofthemonth - begindaysofstatuspds + 1;
		 
		 }
		// var jiadonglv = ss[2]/(ss[0]+ss[1]+ss[2]+ss[3]+ss[4]);
		var jiadonglv = yunxingdaysum / (totledaysofstatuspds *24*60 );
		 $("#jiadonglv").text(~~(Math.abs(jiadonglv*100))+"%");

	}
	 
	if (data.Updstations!=null  ) {
		drawechart("main2",option2);
		drawechart("main1",option1);
	}
	 
	var option0 = {
				title : {
					text: '运行状态统计分析',
					subtext: '',
					x:'center'
				},
				tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient : 'vertical',
					x : 'left',
					data:['停止','手动','自动运行中','待机','通信中断']
				},
				/*toolbox: {
					show : true,
					feature : {
						mark : {show: true},
						dataView : {show: true, readOnly: false},
						magicType : {
							show: true, 
							type: ['pie', 'funnel'],
							option: {
								funnel: {
									x: '25%',
									width: '50%',
									funnelAlign: 'left',
									max: 1548
								}
							}
						},
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},*/
				calculable : true,
				series : [
					{
						name:'运行状态',
						type:'pie',
						radius : '55%',
						center: ['50%', '60%'],
						data:[
							{value:ss[0], name:'停止'},
							{value:ss[1], name:'手动'},
							{value:ss[2], name:'自动运行中'},
							{value:ss[3], name:'待机'},
							{value:ss[4], name:'通信中断'}
						] 
						 
					}
				]
			};
	
	drawechart("main0",option0);


}
		
		
function setechart2(data){
	var option1= {
				tooltip: {
					show: true
				},
				legend: {
					data:['自动运行时间','日目标产量','每日产量']
				},
				grid : {
					x : 45 ,
					x2 : 45
				},
				xAxis : [
					{
						type : 'category',
						data : ["1","2"]
					}
				],
				yAxis : [
					{
						type : 'value'
					}
				],
				series : [
					{
						"name":"自动运行时间",
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
						"name":"每日产量",
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
			
			var adate = $("#tjdateinput").val();
			var datesel = new Date(adate);
			console.log(datesel);
			var datenow = new Date();
			var daysofthemonth = DaysOfMonth(datesel);
			console.log(daysofthemonth);
			console.log(datesel);
			option1.xAxis[0].data = [];
			var daycount = $("#tjts").val();
			var startday = parseInt($("#tjdateinput").val().split("-")[2]);
			var tmpday = 0;
			console.log(daysofthemonth);
			for (var i=0;i < daycount; i++){
			   tmpday = startday+i;
			   
			   if (tmpday > daysofthemonth){
					option1.xAxis[0].data.push(tmpday-daysofthemonth);
			   }else{
			        option1.xAxis[0].data.push(tmpday);
			   
			   }
			   
			}
			
			
			var option2 = $.extend(true, {}, option1); 
			 
			 
			var dayval = data.Plan.PlanDay  ;
			option2.series[0].data=[];
			option2.series[1].data=[];
			option2.series[2].data=[];
			for (var i=0;i < daycount ; i++){
			   option2.series[1].data.push(dayval);
			   option2.series[2].data.push(0);
			   option2.series[0].data.push(0);
			}
			
			
			option1.legend.data[0]="每日产量";
			option1.legend.data[1]="月目标产量";
			option1.legend.data[2]="累计产量";
			option1.series[0].name=option1.legend.data[0];
			option1.series[1].name=option1.legend.data[1];
			option1.series[2].name=option1.legend.data[2];
			var sumval = data.Plan.PlanMonth  ;
			option1.series[0].data=[];
			option1.series[1].data=[];
			option1.series[2].data=[];
			for (var i=0;i < daycount ; i++){
			   option1.series[1].data.push(sumval);
			   option1.series[2].data.push(0);
			   option1.series[0].data.push(0);
			}
	if (data.Updstations==null  ) {
			 
			drawechart("main1",0);
			drawechart("main2",0);
			$("#canneng").text("无数据");
			$("#pianchachan").text("无数据");
			$("#pianchajin").text("无数据");
			 
			 
			 
	}else{
		var zongsucustom1 = 0;
		var sumofcustom1 = 0;
		 $.each(data.Updstations,function(idx,item){ 
			
				var  thedays = item.Days.split("-");
				var theday = parseInt(thedays[2])-startday;
				if (theday < 0) {theday = theday + daysofthemonth };
				option2.series[2].data[theday] = item.UPD;
				option1.series[0].data[theday] = item.UPD;
				zongsucustom1 = zongsucustom1 + item.UPD;
				sumofcustom1++;
				 
				 
		}); 
		var sumwhole = 0;
		for (var i=0;i < daycount;i++){
			sumwhole = sumwhole+option1.series[0].data[i];
			option1.series[2].data[i] = sumwhole;
		
		}
		var pingjunsum = zongsucustom1/sumofcustom1;
		pingjunsum = Math.round(pingjunsum*100)/100;
		$("#canneng").text(pingjunsum);
		
		var diffdays = 0;
		var pianchachan = 0;
		if (compdate(datesel,daycount,datenow) == 1 || compdate(datesel,daycount,datenow) == 0){
			if ( datenow.getMonth() == datesel.getMonth()){
				diffdays = datesel.getDate()+ daycount - datenow.getDate();
			}else{
				diffdays = datesel.getDate()+ daycount - daysofthemonth - datenow.getDate();
			}
				
				
			pianchachan = zongsucustom1 + pingjunsum*diffdays - data.Plan.PlanDay*daycount; 
			
		}else{
			
			pianchachan = zongsucustom1   - data.Plan.PlanDay*daycount; 
		}
		pianchachan = Math.round(pianchachan*100)/100;
		if ( pianchachan >= 0){
			pianchachan = "超产" + pianchachan;
		}else{
			pianchachan = "减产" + (0-pianchachan);
		} 
		$("#pianchachan").text(pianchachan);
		var pianchajin = data.Plan.PlanDay*daycount/pingjunsum-daycount;
		pianchajin = Math.round(pianchajin *100)/100;
		if (pianchajin >= 0 ){
			pianchajin = "落后"+pianchajin+"天";
		}else{
			pianchajin = "超前"+(0-pianchajin)+"天";
		}
		$("#pianchajin").text(pianchajin);
	}
	
	var ss=[0,0,0,0,0];
	var sumyunxingcustom1 = 0;
	var sumofyunxingcustom1 = 0;
	if ( data.Statuspds==null) {
	   drawechart("main0",0);
	   
	   $("#jiadonglv").text("无数据");
	   
	 
	}else{
		 $.each(data.Statuspds,function(idx,item){ 
				var  thedays = item.Days.split("-");
				var theday = parseInt(thedays[2])-startday;
				if (theday < 0) {theday = theday + daysofthemonth };
				option2.series[0].data[theday] = item.S2/(item.S0+item.S1+item.S2+item.S3+item.S4)*60*24;
				console.log("my is "+theday);
				console.log(option2.series[0].data[theday] );
				ss[0]=ss[0]+item.S0;
				ss[1]=ss[1]+item.S1;
				ss[2]=ss[2]+item.S2;
				ss[3]=ss[3]+item.S3;
				ss[4]=ss[4]+item.S4;
				sumyunxingcustom1  = sumyunxingcustom1  + option2.series[0].data[theday];
				sumofyunxingcustom1++;
		 });
		 
		// var jiadonglv = ss[2]/(ss[0]+ss[1]+ss[2]+ss[3]+ss[4]);
		console.log(option2.series[0].data);
		var jiadonglv = 0;
		console.log(data.Statuspds[0].Days);
		var dateindb = new Date(data.Statuspds[0].Days	);
		
		 console.log(dateindb);
		if (compdate(datesel,daycount,datenow) == 1 || compdate(datesel,daycount,datenow) == 0){
			if ( datenow.getMonth() == datesel.getMonth()){
				diffdays = datesel.getDate()+ daycount - datenow.getDate();
			}else{
				diffdays = datesel.getDate()+ daycount - daysofthemonth - datenow.getDate();
			}
				
			 if (compdate(dateindb,0,datesel) == 1){
				  var diffdays1 = 0;
				  if (dateindb.getMonth() == datesel.getMonth()){
					  diffdays1 = dateindb.getDate() - datesel.getDate();
				  }else{
                      diffdays1 =  dateindb.getDate() + daysofthemonth - datesel.getDate();
				  }				  
			      jiadonglv  = sumyunxingcustom1 / ((daycount-diffdays1-diffdays) *24 * 60);
			 }else{
				  jiadonglv  = sumyunxingcustom1 / ((daycount-diffdays) *24 * 60);
			 }
		}else{
			 if (compdate(dateindb,0,datesel) == 1){
				  var diffdays1 = 0;
				  if (dateindb.getMonth() == datesel.getMonth()){
					  diffdays1 = dateindb.getDate() - datesel.getDate();
				  }else{
                      diffdays1 =  dateindb.getDate() + daysofthemonth - datesel.getDate();
				  }				  
			      jiadonglv  = sumyunxingcustom1 / ((daycount-diffdays1 ) *24 * 60);
			 }else{
				  jiadonglv  = sumyunxingcustom1 / ((daycount ) *24 * 60);
			 }
			
			      
		}
		
		 console.log("sumyunxin is " +sumyunxingcustom1);
		 console.log("daycount is "+ daycount);
		 console.log("diffdays1 is" + diffdays1);
		 console.log("diffdays is" + diffdays);
		 
		 $("#jiadonglv").text(~~(Math.abs(jiadonglv*100))+"%");
	}
	
    if (data.Updstations!=null  ) {	
		drawechart("main2",option2);
		drawechart("main1",option1);
	}
	
		var option0 = {
					title : {
						text: '运行状态统计分析',
						subtext: '',
						x:'center'
					},
					tooltip : {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient : 'vertical',
						x : 'left',
						data:['停止','手动','自动运行中','待机','通信中断']
					},
					/*toolbox: {
						show : true,
						feature : {
							mark : {show: true},
							dataView : {show: true, readOnly: false},
							magicType : {
								show: true, 
								type: ['pie', 'funnel'],
								option: {
									funnel: {
										x: '25%',
										width: '50%',
										funnelAlign: 'left',
										max: 1548
									}
								}
							},
							restore : {show: true},
							saveAsImage : {show: true}
						}
					},*/
					calculable : true,
					series : [
						{
							name:'运行状态',
							type:'pie',
							radius : '55%',
							center: ['50%', '60%'],
							data:[
								{value:ss[0], name:'停止'},
								{value:ss[1], name:'手动'},
								{value:ss[2], name:'自动运行中'},
								{value:ss[3], name:'待机'},
								{value:ss[4], name:'通信中断'}
							]
						}
					]
				};
		
		drawechart("main0",option0);



}
function setechart3(data){
	var option1= {
				tooltip: {
					show: true
				},
				legend: {
					data:['自动运行时间','班目标产量','每班产量']
				},
				grid : {
					x : 45 ,
					x2 : 45
				},
				xAxis : [
					{
						type : 'category',
						data : ["1","2"]
					}
				],
				yAxis : [
					{
						type : 'value'
					}
				],
				series : [
					{
						"name":"自动运行时间",
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
						"name":"班目标产量",
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
						"name":"每班产量",
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
			
			var adate = $("#tjdateinput").val();
			var datesel = new Date(adate);
			console.log(datesel);
			var datenow = new Date();
			var daysofthemonth = DaysOfMonth(datesel);
			
			option1.xAxis[0].data = [];
			var daycount = $("#tjts").val();
			var startday = parseInt($("#tjdateinput").val().split("-")[2]);
			for (var i=0;i < daycount; i++){
			   tmpday = startday+i;
			   if (tmpday > daysofthemonth){
					option1.xAxis[0].data.push(tmpday-daysofthemonth+"早");
					option1.xAxis[0].data.push(tmpday-daysofthemonth+"中");
					option1.xAxis[0].data.push(tmpday-daysofthemonth+"晚");
			   }else{
			        option1.xAxis[0].data.push(tmpday+"早");
					option1.xAxis[0].data.push(tmpday+"中");
					option1.xAxis[0].data.push(tmpday+"晚");
			   
			   }
			   /*
			   option1.xAxis[0].data.push(startday+i+"早");
			   option1.xAxis[0].data.push(startday+i+"中");
			   option1.xAxis[0].data.push(startday+i+"晚");
			   */
			}
			
			
			var option2 = $.extend(true, {}, option1); 
			 
			 
			var banval = data.Plan.PlanBan  ;
			option2.series[0].data=[];
			option2.series[1].data=[];
			option2.series[2].data=[];
			for (var i=0;i < daycount*3 ; i++){
			   option2.series[1].data.push(banval);
			   option2.series[2].data.push(0);
			   option2.series[0].data.push(0);
			}
			
			
			option1.legend.data[0]="每班产量";
			option1.legend.data[1]="月目标产量";
			option1.legend.data[2]="累计产量";
			option1.series[0].name=option1.legend.data[0];
			option1.series[1].name=option1.legend.data[1];
			option1.series[2].name=option1.legend.data[2];
			var sumval = data.Plan.PlanMonth  ;
			option1.series[0].data=[];
			option1.series[1].data=[];
			option1.series[2].data=[];
			for (var i=0;i < daycount*3 ; i++){
			   option1.series[1].data.push(sumval);
			   option1.series[2].data.push(0);
			   option1.series[0].data.push(0);
			}
	if (data.Upsstations==null  ) {
			 
			drawechart("main1",0);
			drawechart("main2",0);
			$("#canneng").text("无数据");
			$("#pianchachan").text("无数据");
			$("#pianchajin").text("无数据");
		 
			 
			 
	}else{
		 var sumshifts = 0;
		 var sumofshifts = 0;
		 $.each(data.Upsstations,function(idx,item){ 
			
				var  thedays = item.Days.split("-");
				var theday = parseInt(thedays[2])-startday;
				if (theday < 0) {theday = theday + daysofthemonth };
				theday = 3*theday;
				option2.series[2].data[theday] = item.Shift1;
				option2.series[2].data[theday+1] = item.Shift2;
				option2.series[2].data[theday+2] = item.Shift3;
				option1.series[0].data[theday] = item.Shift1;
				option1.series[0].data[theday+1] = item.Shift2;
				option1.series[0].data[theday+2] = item.Shift3;
				sumofshifts = sumofshifts + 3;
				sumshifts = sumshifts + item.Shift1 + item.Shift2 +item.Shift3 ;
				 
				 
		}); 
		var sumwhole = 0;
		for (var i=0;i < daycount*3;i++){
			sumwhole = sumwhole+option1.series[0].data[i];
			option1.series[2].data[i] = sumwhole;
		
		}
		
		var pingjunsum = 0;
		var pianchachan = 0;
		if (compdate(datesel,daycount,datenow) == 1 || compdate(datesel,daycount,datenow) == 0){
			if ( datenow.getMonth() == datesel.getMonth()){
				diffdays = datesel.getDate()+ daycount - datenow.getDate();
			}else{
				diffdays = datesel.getDate()+ daycount - daysofthemonth - datenow.getDate();
			}
			var minussum = 0;	
			if (datenow.getHours()	> 7 && datenow.getHours() < 15) minussum = 2;
			if (datenow.getHours() > 15)  minussum = 1 ;
			sumofshifts = sumofshifts - minussum ;
			pianchachan = sumshifts + pingjunsum*(diffdays*3+3-minussum) - data.Plan.PlanBan*daycount*3; 
			
		}else{
			
			pianchachan = sumshifts   - data.Plan.PlanBan*daycount*3; 
			
		}
		
		pingjunsum = sumshifts/sumofshifts;
		pingjunsum = Math.round(pingjunsum*100)/100;
		$("#canneng").text(pingjunsum);
		pianchachan = Math.round(pianchachan*100)/100;
		if ( pianchachan >= 0){
			pianchachan = "超产" + pianchachan;
		}else{
			pianchachan = "减产" + (0-pianchachan);
		} 
		$("#pianchachan").text(pianchachan);
		
		
		var pianchajin = data.Plan.PlanBan*daycount*3/pingjunsum-daycount*3;
		pianchajin = Math.round(pianchajin*100)/100;
		if (pianchajin >= 0 ){
			pianchajin = "落后"+pianchajin+"班";
		}else{
			pianchajin = "超前"+(0-pianchajin)+"班";
		}
		$("#pianchajin").text(pianchajin);
	}

	
		var ss=[0,0,0,0,0];
		var sumyunxingcustom2 = 0;
		var sumofyunxingcustom2 = 0;
	if (  data.Statuspss==null) {
			drawechart("main0",0);
			 
		    $("#jiadonglv").text("无数据");
			 
		  
	}else{
		 $.each(data.Statuspss,function(idx,item){ 
				var  thedays = item.Days.split("-");
				var theday = parseInt(thedays[2])-startday;
				if (theday < 0) {theday = theday + daysofthemonth };
				theday  = theday  *3;
				option2.series[0].data[theday] = item.S1_S2/(item.S1_S0+item.S1_S1+item.S1_S2+item.S1_S3+item.S1_S4)*60*8;
				option2.series[0].data[theday+1] = item.S2_S2/(item.S2_S0+item.S2_S1+item.S2_S2+item.S2_S3+item.S2_S4)*60*8;
				option2.series[0].data[theday+2] = item.S3_S2/(item.S3_S0+item.S3_S1+item.S3_S2+item.S3_S3+item.S3_S4)*60*8;
				ss[0]=ss[0]+item.S1_S0+item.S2_S0+item.S3_S0;
				ss[1]=ss[1]+item.S1_S1+item.S2_S1+item.S3_S1;
				ss[2]=ss[2]+item.S1_S2+item.S2_S2+item.S3_S2;
				ss[3]=ss[3]+item.S1_S3+item.S2_S3+item.S3_S3;
				ss[4]=ss[4]+item.S1_S4+item.S2_S4+item.S3_S4;
				sumyunxingcustom2  = sumyunxingcustom2  + option2.series[0].data[theday] + option2.series[0].data[theday+1] + option2.series[0].data[theday+2];
				sumofyunxingcustom2 = sumofyunxingcustom2 + 3;
		 });
		 
		 
		var dateindb = new Date(data.Statuspss[0].Days	);
		console.log(dateindb);
		var jiadonglv = 0;
		if (compdate(datesel,daycount,datenow) == 1 || compdate(datesel,daycount,datenow) == 0){
			if ( datenow.getMonth() == datesel.getMonth()){
				diffdays = datesel.getDate()+ daycount - datenow.getDate();
			}else{
				diffdays = datesel.getDate()+ daycount - daysofthemonth - datenow.getDate();
			}
			 var lefthours = 24 - datenow.getHours();
			 if (compdate(dateindb,0,datesel) == 1){
				  var diffdays1 = 0;
				  if (dateindb.getMonth() == datesel.getMonth()){
					  diffdays1 = dateindb.getDate() - datesel.getDate();
				  }else{
                      diffdays1 =  dateindb.getDate() + daysofthemonth - datesel.getDate();
				  }				  
			      jiadonglv  = sumyunxingcustom2 / ((daycount-diffdays1-diffdays) *24 * 60+lefthours*60);
			 }else{
				  jiadonglv  = sumyunxingcustom2 / ((daycount-diffdays) *24 * 60+lefthours*60);
			 }
		}else{
			 if (compdate(dateindb,0,datesel) == 1){
				  var diffdays1 = 0;
				  if (dateindb.getMonth() == datesel.getMonth()){
					  diffdays1 = dateindb.getDate() - datesel.getDate();
				  }else{
                      diffdays1 =  dateindb.getDate() + daysofthemonth - datesel.getDate();
				  }				  
			      jiadonglv  = sumyunxingcustom2 / ((daycount-diffdays1 ) *24 * 60);
			 }else{
				  jiadonglv  = sumyunxingcustom2 / ((daycount ) *24 * 60);
			 }
			
			      
		}
		// var jiadonglv = ss[2]/(ss[0]+ss[1]+ss[2]+ss[3]+ss[4]);
		 $("#jiadonglv").text(~~(Math.abs(jiadonglv*100))+"%");
	}
	if ( data.Upsstations!=null  ) {	 
		drawechart("main2",option2);
		drawechart("main1",option1);
	}
	
		var option0 = {
					title : {
						text: '运行状态统计分析',
						subtext: '',
						x:'center'
					},
					tooltip : {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient : 'vertical',
						x : 'left',
						data:['停止','手动','自动运行中','待机','通信中断']
					},
					/*toolbox: {
						show : true,
						feature : {
							mark : {show: true},
							dataView : {show: true, readOnly: false},
							magicType : {
								show: true, 
								type: ['pie', 'funnel'],
								option: {
									funnel: {
										x: '25%',
										width: '50%',
										funnelAlign: 'left',
										max: 1548
									}
								}
							},
							restore : {show: true},
							saveAsImage : {show: true}
						}
					},*/
					calculable : true,
					series : [
						{
							name:'运行状态',
							type:'pie',
							radius : '55%',
							center: ['50%', '60%'],
							data:[
								{value:ss[0], name:'停止'},
								{value:ss[1], name:'手动'},
								{value:ss[2], name:'自动运行中'},
								{value:ss[3], name:'待机'},
								{value:ss[4], name:'通信中断'}
							]
						}
					]
				};
		
		drawechart("main0",option0);




}

function getAllInfo(lineid,statusimgpath){
	//alert("getallinfo" + lineid+"  "+statusimgpath);
	funcflag = 0;
	$(".dqztxian img").attr("src",statusimgpath);
	
	
	 
	$.getJSON("/infoloaderbylineid?lineid="+lineid+"&&loader=1" ,null,function(data){ 
				
			$(".sbline1-1").html("<p >站台"+lineid+ "</p>");// +" " + data.Workshop + " " +data.LineType + "</p>");
			$("#tjtubiaoid").attr("onclick","tjtubiaoact("+lineid+")");
			 
			wstitle = data.Workshop;
			lttitle = data.LineType;
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
	
	
	
	
}
 
function sbztmainact(val, which){
	// alert("/statusby?val="+val+"&"+"which="+which);
			 
	        var linestrorig =  ' <a  href="#sbxqall"  onclick= "getAllInfo($num$ , '+'\'$collor$\');" ' + ' >  ' +'\
								 <div class="statusinfo" data-role="none">  \
								 <img src="$collor$" class="statusimg1" />  \
								 <p class="statuswords"  > <span style="color:rgb(17,102,116); ">站号:$num$  $workshop$ $worktype$</span> </p>  \
								 <img class="statusimg2" src="./img/jt2.png"   />  \
								  </div>  \
								  </a> ' ;
		    var liststrs="";
	        $.getJSON("/statusby?val="+val+"&"+"which="+which,null,function(data){ 
                console.log("/statusby?val="+val+"&"+"which="+which);
		        $.each(data,function(idx,item){ 
					/*if(idx==0){ 
						 return true;//同countinue，返回false同break 
					}  */
                    linestr = linestrorig ;
					//alert("name:"+item.StationID+",value:"+item.Workshop); 
					linestr = linestr.replace(/\$num\$/g,item.StationID);
					//alert(linestr)
					linestr = linestr.replace(/\$workshop\$/g,item.Workshop);
					linestr = linestr.replace(/\$worktype\$/g,item.StationType);
					 
					linestr = linestr.replace(/\$action\$/g,item.StationStatus);
					
					 
					if (item.StationStatus === "自动运行中") {
					   // console.log("act");
						linestr=linestr.replace(/\$collor\$/g,"./img/yunx-01.png")
					};
					//alert(linestr);
					if (item.StationStatus === "待机") 
					{
					 
					   linestr = linestr.replace(/\$collor\$/g,"./img/dj-01.png");
					} 
					 
					if (item.StationStatus === "手动") 
					{
					 
					   linestr = linestr.replace(/\$collor\$/g,"./img/sd-01.png");
					} 
					
					if (item.StationStatus === "通讯中断") 
					{
					 
					   linestr = linestr.replace(/\$collor\$/g,"./img/zd-01.png");
					} 
						if (item.StationStatus === "停止") 
					{
					 
					   linestr = linestr.replace(/\$collor\$/g,"./img/tz-01.png");
					} 
					 
					
					//console.log(linestr)
					liststrs = liststrs + linestr;
		        }); 
				 
				$("#statuslines").html(liststrs);
				 
				if (tout != 99) {
					ttout = setTimeout("sbztmainact(\""+val+"\","+ which+")", 30000 );
					
					 
					console.log(ttout);
					 
				}
		    }); 
	
	
	
	
}
function checkselectinput(){
	 var sel2value = $('#sel2 option:selected').val();
	 
	 if (sel2value == -1 || sel2value == 0){
		 $(".submitimg a").attr("href" , "#");
		 alert("请选择正确输入");
		 
		 
	 }
	
	
	
}
function GetJsonLT(){
		 
	$("#sel2").empty(); 
	
	var option = $("<option>").val(0).text("--请选择制程--");
	$("#sel2").append(option);
	$("#sel2").selectmenu("refresh",true);

	$.getJSON("/info_getlt",null,function(data){ 
	   
		$.each(data,function(idx,item){ 
			//if(idx==0){ 
			//	 return true;//同countinue，返回false同break 
			//} 
		   
			

		option = $("<option>").val(idx+1).text(item.Linetype);
		//alert(item.Linetype+idx);

		$("#sel2").append(option);
		   
		}); 
		 
			   
	}); 
	
 
 };
function GetJsonWS(){
	$("#sel2").empty();  
	var option = $("<option>").val(-1).text("--请选择车间--");
	$("#sel2").append(option);
	$("#sel2").val(-1).attr("selected", true); ;
	$("#sel2 :selected").text("--请选择车间--");
	 
	$("#sel2").selectmenu("refresh",true);
	$.getJSON("/info_getws",null,function(data){ 
	   
		$.each(data,function(idx,item){ 
			//if(idx==0){ 
			//	 return true;//同countinue，返回false同break 
			//} 
		   
			

		option = $("<option>").val(idx+1).text(item.WorkShop);
		//alert(item.WorkShop+idx);

		$("#sel2").append(option);
		   
		}); 
		 
		 
	}); 
	
	

}


function GetJsonAlarms(lineid,sortint){                                   
	
    
	var alarmlistlineorig = '<div data-role="collapsible" data-collapsed="true"   data-theme="f"   ><h4 style="color:red !important;">站号：{{stationid}}  异常信息描述：{{errortxt}} </h4>  \
<ul data-role="listview" data-inset="true">  <li> 站号:{{stationid}}</li>	<li>制程:{{linetype}}</li>	<li>设备号: {{machineid}} </li> \
		   <li>异常信息代码:{{exception}}</li><li>	异常信息描述:{{errortxt}}	</li> \
		   <li>发生时间:{{StartTime}}  </li>  \
		   </ul>  \
		   </div>' ;
	var alarmstrs="";
	$.getJSON("/alarm?stationid="+lineid+"&sort="+sortint,null,function(data){ 
    if (data != null){
		$.each(data,function(idx,item){ 
			 alarmlistline = alarmlistlineorig;
			 alarmlistline = alarmlistline.replace(/{{workshop}}/g,item.Workshop);
			 alarmlistline = alarmlistline.replace(/{{StartTime}}/g,item.StartTime);
			 alarmlistline = alarmlistline.replace(/{{stationid}}/g,item.StationID);
			 alarmlistline = alarmlistline.replace(/{{linetype}}/g,item.StationType);
			 alarmlistline = alarmlistline.replace(/{{machineid}}/g,item.MachineID);
			 alarmlistline = alarmlistline.replace(/{{exception}}/g,item.AlarmCode);
			 alarmlistline = alarmlistline.replace(/{{errortxt}}/g,item.AlarmDescription);
			 
			 alarmstrs = alarmstrs + alarmlistline;
		}); 
		 
	}
		 //console.log(alarmstrs);
	$("#alarmlists").html(alarmstrs);
		 
	$('#alarmlists').trigger("create");
		 
	}); 
			
			
 
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

function compdate(date1, intervalday,date2)
{
	var year1 = date1.getFullYear();
	var month1 = date1.getMonth()+1;
	var day1 = date1.getDate();
	
	var daysofmonth = DaysOfMonth(date1);
	
	if (day1+intervalday > DaysOfMonth){
		day1A = day1+intervalday-DaysOfMonth;
		if (month1+1 > 12){
		   month1A = 1;
		   year1A = year1 + 1;
		}else{
			month1A = month1 + 1;
			year1A = year1;
		}
	}else{
		day1A = day1 + intervalday;
		month1A = month1  ;
		year1A = year1;
		
		
	}
	
	if (year1A > date2.getFullYear() ) return 1;
	if (year1A < date2.getFullYear() ) return -1;
	if (year1A  = date2.getFullYear() ){
		if (month1A > date2.getMonth()) return 1;
		if (month1A < date2.getMonth()) return -1;
		if (month1A = date2.getMonth()){
			if (day1A > date2.getDate()) return 1;
			if (day1A < date2.getDate()) return -1;
			return 0 ;
			
			
		}
		
	}
	
	
	
}


