$(function() {
	totalMemberQuery();
	var dateTime = new Date().format("yyyy-MM-dd");
	var timestamp = new Date().format("yyyy-MM-dd hh:mm:ss");
	$(".box-body1 h3").text("数据校准时间:"+timestamp);
	$(".box-body2 h3").text("数据校准时间:"+timestamp);
	$("#d11").val(dateTime);
	$("#d22").val(new Date().format("yyyy-MM"));
	totalCardMoneyQuery(4,$("#d22").val());
	totalCustomerFlowQuery(2,$("#d22").val());
	totalIncreasedMemberQuery(2, $("#d22").val());
	totalCardMoneyQuery(3,dateTime);
	totalCustomerFlowQuery(1,dateTime);
	totalIncreasedMemberQuery(1, dateTime);
	totalCostQuery(5,dateTime);
	totalCostQuery(6,$("#d22").val());
})
function changeDay(){
	var dateTime="";
	var timestamp = new Date().format("yyyy-MM-dd hh:mm:ss");
	$(".box-body1 h3").text("数据校准时间:"+timestamp);
	setTimeout(function(){
		dateTime = $("#d11").val();
		console.log(dateTime)
			if(dateTime!=""){
			totalCardMoneyQuery(3,dateTime);
			totalCustomerFlowQuery(1,dateTime);
			totalIncreasedMemberQuery(1, dateTime);
			totalCostQuery(5,dateTime);
		}
	},0);
	
}
function changeMonth(){
	var dateTime="";
	var timestamp = new Date().format("yyyy-MM-dd hh:mm:ss");
	$(".box-body2 h3").text("数据校准时间:"+timestamp);
	setTimeout(function(){
		dateTime = $("#d22").val();
		console.log(dateTime)
			if(dateTime!=""){
			totalCardMoneyQuery(4,dateTime);
			totalCustomerFlowQuery(2,dateTime);
			totalIncreasedMemberQuery(2, dateTime);
			totalCostQuery(6,$("#d22").val());
		}
	},0);
	
}
$(window).resize(function() {
	if(totalCardMoneyQuery3Chart!=null){
		totalCardMoneyQuery3Chart.resize();
	}
	if(totalCustomerFlowQuery1Chart!=null){
		totalCustomerFlowQuery1Chart.resize();
	}
	if(totalIncreasedMemberQuery1Chart!=null){
		totalIncreasedMemberQuery1Chart.resize();
	}
	if(totalCardMoneyQuery4Chart!=null){
		totalCardMoneyQuery4Chart.resize();
	}
	if(totalCustomerFlowQuery2Chart!=null){
		totalCustomerFlowQuery2Chart.resize();
	}
	if(totalIncreasedMemberQuery2Chart!=null){
		totalIncreasedMemberQuery2Chart.resize();
	}
});
var totalCardMoneyQuery3Chart=null;//每日报表销售额
var totalCardMoneyQuery4Chart=null;//每月报表销售额
var totalCustomerFlowQuery1Chart=null;//每日报表客流
var totalCustomerFlowQuery2Chart=null;//每月报表客流
var totalIncreasedMemberQuery1Chart = null;//每日报表新增会员
var totalIncreasedMemberQuery2Chart = null;//每月报表新增会员
var totalCostQuery1Chart = null;//每日报表消费记录
var totalCostQuery2Chart = null;//每月报表消费记录
function totalMemberQuery() {
	var postData = {
		"clubId": clubId
	}
	var index_loading = layer.load(2, {
		time: 10 * 1000
	});
	/*
	appsCloud.postCloud("/gym/report/totalMemberQuery", postData, {}, function(result) {
		layer.close(index_loading);
		if(result.code == 0) {
			var reportvo = result.reportvo;
			$(".number:eq(0)").text(reportvo.totalMember);
			$(".number:eq(1)").text(reportvo.totalNotExpiredMember);
			$(".number:eq(2)").text(reportvo.totalExpiresInTwoMonth);
			$(".number:eq(3)").text(reportvo.totalNoSignInMonth);
			$(".number:eq(4)").text(reportvo.totalBirthdayInMonth);
		} else {
			layer.alert(result.msg);
		}
	});
	*/
}
//消费记录查询
function totalCostQuery(queryType, dateTime) {
	var postData = {
		"clubId": clubId,
		"startTime": dateTime+" 00:00:00",
		"endTime": dateTime+" 23:59:59",
		"queryType": queryType
	}
	if(queryType==6){
		dateTime = new Date().thismonth(dateTime+"-01");
		postData = {
			"clubId": clubId,
			"startTime": dateTime.split("~")[0]+" 00:00:00",
			"endTime": dateTime.split("~")[1]+" 23:59:59",
			"queryType": queryType
		}
	}
	var index_loading = layer.load(2, {
		time: 10 * 1000
	});
	/*
	appsCloud.postCloud("/gym/report/totalCostQuery", postData, {}, function(result) {
		layer.close(index_loading);
		if(result.code == 0) {
			var details = result.details;
			if(details.length > 0) {
				if(queryType==5){
					var data = {"1":0,"2":0};
					for(var k=0;k<details.length;k++){
						data[details[k].unitFormat+""] = details[k].count;
					}
					$(".box-body1 .name-title:eq(1)").text(data["1"]+data["2"]);
					drawTotalCostQuery1(data["1"],data["2"]);
				}else{
					var maxday = new Date(Date.parse(dateTime.split("~")[0].replace(/-/g,"/"))).MaxDayOfDate();
					var xAxis_data=[];
					var series_data=[];
					for(var j=0;j<maxday;j++){
						xAxis_data.push(j+1);
						series_data.push(0);
					}
					var totalcount = 0;
					for(var i=0;i<details.length;i++){
						totalcount = totalcount+details[i].count;
						series_data[details[i].unitFormat-1] = details[i].count;
					}
					$(".box-body2 .name-title:eq(1)").text(totalcount);
					drawTotalCostQuery2(xAxis_data,series_data);
				}
			}else{
				if(queryType==5){
					var data = {"1":0,"2":0};
					$(".box-body1 .name-title:eq(1)").text(data["1"]+data["2"]);
					drawTotalCostQuery1(data["1"],data["2"]);
				}else if(queryType==6){
					var maxday = new Date(Date.parse(dateTime.split("~")[0].replace(/-/g,"/"))).MaxDayOfDate();
					var xAxis_data=[];
					var series_data=[];
					for(var j=0;j<maxday;j++){
						xAxis_data.push(j+1);
						series_data.push(0);
					}
					var totalcount = 0;
					$(".box-body2 .name-title:eq(1)").text(totalcount);
					drawTotalCostQuery2(xAxis_data,series_data);
				}
			}
		} else {
			layer.alert(result.msg);
		}
	});
	
	*/
}
function totalCardMoneyQuery(queryType, dateTime) {
	var postData = {
		"clubId": clubId,
		"startTime": dateTime+" 00:00:00",
		"endTime": dateTime+" 23:59:59",
		"queryType": queryType
	}
	if(queryType==4){
		dateTime = new Date().thismonth(dateTime+"-01");
		postData = {
			"clubId": clubId,
			"startTime": dateTime.split("~")[0]+" 00:00:00",
			"endTime": dateTime.split("~")[1]+" 23:59:59",
			"queryType": queryType
		}
	}
	var index_loading = layer.load(2, {
		time: 10 * 1000
	});
	/*
	appsCloud.postCloud("/gym/report/totalCardMoneyQuery", postData, {}, function(result) {
		layer.close(index_loading);
		if(result.code == 0) {
			var details = result.details;
			if(details.length > 0) {
				if(queryType==3){
					$(".box-body1 .name-title:eq(0)").text(details[0].totalCardMoney);
					drawTotalCardMoneyQuery3(details[0].timeCardMoney,details[0].coachCardMoney,details[0].countCardMoney,details[0].rechargeCardMoney);
				}else{
					var maxday = new Date(Date.parse(dateTime.split("~")[0].replace(/-/g,"/"))).MaxDayOfDate();
					var xAxis_data=[];
					var series_data=[];
					for(var j=0;j<maxday;j++){
						xAxis_data.push(j+1);
						series_data.push(0);
					}
					var totalCardMoney = 0;
					for(var i=0;i<details.length;i++){
						totalCardMoney = totalCardMoney+details[i].totalCardMoney;
						series_data[details[i].unitFormat-1] = details[i].totalCardMoney;
					}
					$(".box-body2 .name-title:eq(0)").text(totalCardMoney);
					drawTotalCardMoneyQuery4(xAxis_data,series_data);
				}
			}else{
				if(queryType==4){
					var maxday = new Date(Date.parse(dateTime.split("~")[0].replace(/-/g,"/"))).MaxDayOfDate();
					var xAxis_data=[];
					var series_data=[];
					for(var j=0;j<maxday;j++){
						xAxis_data.push(j+1);
						series_data.push(0);
					}
					var totalCardMoney = 0;
					$(".box-body2 .name-title:eq(0)").text(totalCardMoney);
					drawTotalCardMoneyQuery4(xAxis_data,series_data);
				}
			}
		} else {
			layer.alert(result.msg);
		}
	});
	*/
}
function totalCustomerFlowQuery(queryType, dateTime) {
	var postData = {
		"clubId": clubId,
		"startTime": dateTime+" 00:00:00",
		"endTime": dateTime+" 23:59:59",
		"queryType": queryType
	}
	if(queryType==2){
		dateTime = new Date().thismonth(dateTime+"-01");
		postData = {
			"clubId": clubId,
			"startTime": dateTime.split("~")[0]+" 00:00:00",
			"endTime": dateTime.split("~")[1]+" 23:59:59",
			"queryType": queryType
		}
	}
	var index_loading = layer.load(2, {
		time: 10 * 1000
	});
	
	/*
	appsCloud.postCloud("/gym/report/totalCustomerFlowQuery", postData, {}, function(result) {
		layer.close(index_loading);
		if(result.code == 0) {
			var details = result.details;
			if(queryType==1){
				var xAxis_data=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
				var series_data=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
				var totalFlow = 0;
				for(var i=0;i<details.length;i++){
					totalFlow = totalFlow+details[i].count;
					series_data[details[i].unitFormat] = details[i].count;
				}
				$(".box-body1 .name-title:eq(2)").text(totalFlow);
				drawTotalCustomerFlowQuery1(xAxis_data,series_data);
			}else{
				var maxday = new Date(Date.parse(dateTime.split("~")[0].replace(/-/g,"/"))).MaxDayOfDate();
				var xAxis_data=[];
				var series_data=[];
				var totalFlow = 0;
				for(var j=0;j<maxday;j++){
						xAxis_data.push(j+1);
						series_data.push(0);
				}
				for(var i=0;i<details.length;i++){
						totalFlow = totalFlow+details[i].count;
						series_data[details[i].unitFormat-1] = details[i].count;
				}
				$(".box-body2 .name-title:eq(2)").text(totalFlow);
				drawTotalCustomerFlowQuery2(xAxis_data,series_data);
			}
				
		} else {
			layer.alert(result.msg);
		}
	});
	*/
}
function totalIncreasedMemberQuery(queryType, dateTime) {
	var postData = {
		"clubId": clubId,
		"startTime": dateTime+" 00:00:00",
		"endTime": dateTime+" 23:59:59"
	}
	if(queryType==2){
		dateTime = new Date().thismonth(dateTime+"-01");
		postData = {
			"clubId": clubId,
			"startTime": dateTime.split("~")[0]+" 00:00:00",
			"endTime": dateTime.split("~")[1]+" 23:59:59"
		}
	}
	var index_loading = layer.load(2, {
		time: 10 * 1000
	});
	/*
	appsCloud.postCloud("/gym/report/totalIncreasedMemberQuery", postData, {}, function(result) {
		layer.close(index_loading);
		if(result.code == 0) {
			var details = result.details;
			if(queryType==1){
				var series_data = [0];
				$(".box-body1 .name-title:eq(3)").text(0);
				if(details.length>0){
					series_data = [details[0].count];
					$(".box-body1 .name-title:eq(3)").text(details[0].count);
				}
				drawTotalIncreasedMemberQuery1(series_data);
			}else{
				var maxday = new Date(Date.parse(dateTime.split("~")[0].replace(/-/g,"/"))).MaxDayOfDate();
				var xAxis_data=[];
				var series_data=[];
				var totalIncreased = 0;
				for(var j=0;j<maxday;j++){
						xAxis_data.push(j+1);
						series_data.push(0);
				}
				for(var i=0;i<details.length;i++){
						totalIncreased = totalIncreased+details[i].count;
						series_data[details[i].unitFormat-1] = details[i].count;
				}
				$(".box-body2 .name-title:eq(3)").text(totalIncreased);
				drawTotalIncreasedMemberQuery2(xAxis_data,series_data);
			}
		} else {
			layer.alert(result.msg);
		}
	});
	*/
}
function drawTotalCardMoneyQuery3(num1,num2,num3,num4) {
	if(totalCardMoneyQuery3Chart==null){
		totalCardMoneyQuery3Chart = echarts.init(document.getElementById('totalCardMoneyQuery3'));
	}
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: "{b}: {c} ({d}%)",
			textStyle:{
				fontSize:12
			}
		},
		legend: {
			orient: 'vertical',
			x: 'right',
			top:80,
			data: ['时间卡', '私教卡','次卡', '储值卡']
		},
		color: ["#81DD71", "#FBC740", "#79CDFF","#A896FF"],
		series: [{
			name: '每日储值卡',
			type: 'pie',
			center:['40%','50%'],
			radius: ['50%', '70%'],
			avoidLabelOverlap: true,
			stillShowZeroSum:true,
			label: {
				normal: {
					show: false,
					position: 'center'
				},
				emphasis: {
					show: false,
					textStyle: {
					}
				}
			},
			labelLine: {
				normal: {
					show: false
				}
			},
			data: [{
					value: num1,
					name: '时间卡'
				},
				{
					value: num2,
					name: '私教卡'
				},
				{
					value: num3,
					name: '次卡'
				},
				{
					value: num4,
					name: '储值卡'
				}
			]
		}]
	};
	totalCardMoneyQuery3Chart.setOption(option);
}
function drawTotalCustomerFlowQuery1(xAxis_data,series_data) {
	if(totalCustomerFlowQuery1Chart==null){
		totalCustomerFlowQuery1Chart = echarts.init(document.getElementById('totalCustomerFlowQuery1'));
	}
	var option = {
		color: ['#76C967'],
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			top: '3%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			data: xAxis_data,
			axisTick: {
				alignWithLabel: true
			}
		}],
		yAxis: [{
			type: 'value',
			show:false
		}],
		series: [{
			name: "客流量",
			type: 'bar',
			barWidth: '60%',
			data: series_data
		}]
	};
	totalCustomerFlowQuery1Chart.setOption(option);
}
function drawTotalIncreasedMemberQuery1(series_data) {
	if(totalIncreasedMemberQuery1Chart==null){
		totalIncreasedMemberQuery1Chart = echarts.init(document.getElementById('totalIncreasedMemberQuery1'));
	}
	var option = {
		color: ['#84DDF7'],
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '25%',
			top: '25%',
			containLabel: true
		},
		yAxis: [{
			show: false,
			type: 'category',
			data: ['']
		}],
		xAxis: [{
			show: false,
			boundaryGap: [0, 0.5],
			type: 'value'
		}],
		series: [{
			name: "新增会员",
			type: 'bar',
			barWidth: '30%',
			data: series_data
		}]
	};
	totalIncreasedMemberQuery1Chart.setOption(option);
}
function drawTotalCardMoneyQuery4(xAxis_data,series_data) {
	if(totalCardMoneyQuery4Chart==null){
		totalCardMoneyQuery4Chart = echarts.init(document.getElementById('totalCardMoneyQuery4'));
	}
	var option = {
		color: ['#B8A5FF'],
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid: {
			left: -30,
			right: '4%',
			bottom: '3%',
			top: '3%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			data: xAxis_data,
			axisTick: {
				alignWithLabel: true
			}
		}],
		yAxis: [{
			type: 'value',
			show:false
		}],
		series: [{
			name: "金额",
			type: 'bar',
			barWidth: '60%',
			data: series_data
		}]
	};
	totalCardMoneyQuery4Chart.setOption(option);
}
function drawTotalCustomerFlowQuery2(xAxis_data,series_data) {
	if(totalCustomerFlowQuery2Chart==null){
		totalCustomerFlowQuery2Chart = echarts.init(document.getElementById('totalCustomerFlowQuery2'));
	}
	var option = {
		color: ['#76C967'],
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			top: '3%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			data: xAxis_data,
			axisTick: {
				alignWithLabel: true
			}
		}],
		yAxis: [{
			type: 'value',
			show:false
		}],
		series: [{
			name: "客流量",
			type: 'bar',
			barWidth: '60%',
			data: series_data
		}]
	};
	totalCustomerFlowQuery2Chart.setOption(option);
}
function drawTotalIncreasedMemberQuery2(xAxis_data,series_data) {
	if(totalIncreasedMemberQuery2Chart==null){
		totalIncreasedMemberQuery2Chart = echarts.init(document.getElementById('totalIncreasedMemberQuery2'));
	}
	var option = {
		color: ['#84DDF7'],
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			top: '3%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			data: xAxis_data,
			axisTick: {
				alignWithLabel: true
			}
		}],
		yAxis: [{
			type: 'value',
			show:true
		}],
		series: [{
			name: "新增会员",
			type: 'bar',
			barWidth: '60%',
			data: series_data
		}]
	};
	totalIncreasedMemberQuery2Chart.setOption(option);
}
//消费记录
function drawTotalCostQuery1(num1,num2) {
	if(totalCostQuery1Chart==null){
		totalCostQuery1Chart = echarts.init(document.getElementById('totalCostQuery1'));
	}
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: "{b}: {c} ({d}%)",
			textStyle:{
				fontSize:12
			}
		},
		legend: {
			orient: 'vertical',
			x: 'right',
			top:80,
			data: [ '私教卡','次卡']
		},
		color: ["#FBC740", "#FBA62D"],
		series: [{
			name: '消费',
			type: 'pie',
			center:['40%','50%'],
			radius: ['50%', '70%'],
			avoidLabelOverlap: true,
			stillShowZeroSum:true,
			label: {
				normal: {
					show: false,
					position: 'center'
				},
				emphasis: {
					show: false,
					textStyle: {
					}
				}
			},
			labelLine: {
				normal: {
					show: false
				}
			},
			data: [{
					value: num1,
					name: '私教卡'
				},
				{
					value: num2,
					name: '次卡'
				}
			]
		}]
	};
	totalCostQuery1Chart.setOption(option);
}
function drawTotalCostQuery2(xAxis_data,series_data) {
	if(totalCostQuery2Chart==null){
		totalCostQuery2Chart = echarts.init(document.getElementById('totalCostQuery2'));
	}
	var option = {
		color: ['#B8A5FF'],
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			top: '3%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			data: xAxis_data,
			axisTick: {
				alignWithLabel: true
			}
		}],
		yAxis: [{
			type: 'value',
			show:false
		}],
		series: [{
			name: "次卡+私教卡",
			type: 'bar',
			barWidth: '60%',
			data: series_data
		}]
	};
	totalCostQuery2Chart.setOption(option);
}