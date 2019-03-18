Date.prototype.format = function(format){ 
	var o = { 
	"M+" : this.getMonth()+1, //month 
	"d+" : this.getDate(), //day 
	"h+" : this.getHours(), //hour 
	"m+" : this.getMinutes(), //minute 
	"s+" : this.getSeconds(), //second 
	"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
	"S" : this.getMilliseconds() //millisecond 
	}

	if(/(y+)/i.test(format)) { 
	format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}

	for(var k in o) { 
	if(new RegExp("("+ k +")").test(format)) { 
	format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
	} 
	} 
	return format; 
}
Date.prototype.MaxDayOfDate = function()  
{   
    var myDate = this;  
    var ary = myDate.toArray();  
    var date1 = (new Date(ary[0],ary[1],1));  
    var date2 = date1.DateAdd('m',1);  
    var result =  (date2-date1)/(24*3600*1000);
    return result;
} 
Date.prototype.thisweek = function(format,interval){//interval为正数时，取后几周
	var date = new Date(Date.parse(format.replace(/-/g,"/")));
	var weekday = date.getDay();
	var firstday = date.getIntervalDate(format,0-(weekday-interval*7));
	var lastday = date.getIntervalDate(format,6-(weekday-interval*7));
	return firstday+"~"+lastday;
}

Date.prototype.thisweeklist = function(format,interval){//interval为正数时，取后几周
	//起止日期数组    
	var startStop = new Array();
	var date = new Date(Date.parse(format.replace(/-/g,"/")));
	var weekday = date.getDay();
	var monday = date.getIntervalDate(format,1-(weekday-interval*7));
	var tuesday = date.getIntervalDate(format,2-(weekday-interval*7));
	var wednesday = date.getIntervalDate(format,3-(weekday-interval*7));
	var thursday = date.getIntervalDate(format,4-(weekday-interval*7));
	var friday = date.getIntervalDate(format,5-(weekday-interval*7));
	var saturday = date.getIntervalDate(format,6-(weekday-interval*7));
	var sunday = date.getIntervalDate(format,7-(weekday-interval*7));
	startStop.push(monday);
	startStop.push(tuesday);
	startStop.push(wednesday);
	startStop.push(thursday);
	startStop.push(friday);
	startStop.push(saturday);
	startStop.push(sunday);
	return startStop;
}

Date.prototype.thismonth = function(format){
	var date = new Date(Date.parse(format.replace(/-/g,"/")));
	var MaxDayOfDate = date.MaxDayOfDate();
	var ary = date.toArray();
	var firstday = (new Date(ary[0],ary[1],1)).format("yyyy-MM-dd");  
	var lastday = (new Date(ary[0],ary[1],MaxDayOfDate)).format("yyyy-MM-dd");  
	return firstday+"~"+lastday;
}
Date.prototype.getmonth = function(format,interval){//interval为正数时，取后几月
	var date = new Date(Date.parse(format.replace(/-/g,"/")));
	date.setMonth(date.getMonth()+interval);
	var MaxDayOfDate = date.MaxDayOfDate();
	var ary = date.toArray();
	var firstday = (new Date(ary[0],ary[1],1)).format("yyyy-MM-dd");  
	var lastday = (new Date(ary[0],ary[1],MaxDayOfDate)).format("yyyy-MM-dd");  
	return firstday+"~"+lastday;
}
Date.prototype.getIntervalDate=function(date,interval){
    //获取系统时间
    var baseDate=new Date(Date.parse(date.replace(/-/g,"/")));
    var baseYear=baseDate.getFullYear();
    var baseMonth=baseDate.getMonth();
    var baseDate=baseDate.getDate();
    //处理
    var newDate = new Date(baseYear,baseMonth,baseDate);
    newDate.setDate(newDate.getDate()+interval);//取得系统时间的相差日期,interval 为负数时是前几天,正数时是后几天
    var temMonth=newDate.getMonth();
    temMonth++;
    var lastMonth=temMonth >= 10?temMonth:("0"+temMonth)
    var temDate=newDate.getDate();
    var lastDate=temDate >= 10?temDate:("0"+temDate)
    //得到最终结果
    newDate = newDate.getFullYear() + "-" + lastMonth + "-" + lastDate;
    return newDate;
}
Date.prototype.DateAdd = function(strInterval, Number) {   
    var dtTmp = this;  
    switch (strInterval) {   
        case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));  
        case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));  
        case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));  
        case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));  
        case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));  
        case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
        case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
        case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
    }  
}
Date.prototype.toArray = function()  
{   
    var myDate = this;  
    var myArray = Array();  
    myArray[0] = myDate.getFullYear();  
    myArray[1] = myDate.getMonth();  
    myArray[2] = myDate.getDate();  
    myArray[3] = myDate.getHours();  
    myArray[4] = myDate.getMinutes();  
    myArray[5] = myDate.getSeconds();  
    return myArray;  
}
var dateRangeUtil = (function () {  
    /***  
    * 获得当前时间  
    */  
    this.getCurrentDate = function () {  
        return new Date(); 
    };  
  
    /***  
    * 获得本周起止时间  
    */  
    this.getCurrentWeek = function (currentDate) {  
        //起止日期数组    
        var startStop = new Array();  
        //获取当前时间    
        //返回date是一周中的某一天    
        var week = currentDate.getDay();  
        //返回date是一个月中的某一天    
        var month = currentDate.getDate();  
  
        //一天的毫秒数    
        var millisecond = 1000 * 60 * 60 * 24;  
        //减去的天数    
        var minusDay = week != 0 ? week - 1 : 6;  
        //alert(minusDay);    
        //本周 周一    
        var monday = new Date(currentDate.getTime() - (minusDay * millisecond));  
        //本周 周日    
        var sunday = new Date(monday.getTime() + (6 * millisecond));  
        //添加本周时间    
        startStop.push(monday); //本周起始时间    
        //添加本周最后一天时间    
        startStop.push(sunday); //本周终止时间    
        //返回    
        return startStop;  
    };  
  
    /***  
    * 获得本月的起止时间  
    */  
    this.getCurrentMonth = function () {  
        //起止日期数组    
        var startStop = new Array();  
        //获取当前时间    
        var currentDate = this.getCurrentDate();  
        //获得当前月份0-11    
        var currentMonth = currentDate.getMonth();  
        //获得当前年份4位年    
        var currentYear = currentDate.getFullYear();  
        //求出本月第一天    
        var firstDay = new Date(currentYear, currentMonth, 1);  
  
  
        //当为12月的时候年份需要加1    
        //月份需要更新为0 也就是下一年的第一个月    
        if (currentMonth == 11) {  
            currentYear++;  
            currentMonth = 0; //就为    
        } else {  
            //否则只是月份增加,以便求的下一月的第一天    
            currentMonth++;  
        }  
  
  
        //一天的毫秒数    
        var millisecond = 1000 * 60 * 60 * 24;  
        //下月的第一天    
        var nextMonthDayOne = new Date(currentYear, currentMonth, 1);  
        //求出上月的最后一天    
        var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);  
  
        //添加至数组中返回    
        startStop.push(firstDay);  
        startStop.push(lastDay);  
        //返回    
        return startStop;  
    };  
  
    /**  
    * 得到本季度开始的月份  
    * @param month 需要计算的月份  
    ***/  
    this.getQuarterSeasonStartMonth = function (month) {  
        var quarterMonthStart = 0;  
        var spring = 0; //春    
        var summer = 3; //夏    
        var fall = 6;   //秋    
        var winter = 9; //冬    
        //月份从0-11    
        if (month < 3) {  
            return spring;  
        }  
  
        if (month < 6) {  
            return summer;  
        }  
  
        if (month < 9) {  
            return fall;  
        }  
  
        return winter;  
    };  
  
    /**  
    * 获得该月的天数  
    * @param year年份  
    * @param month月份  
    * */  
    this.getMonthDays = function (year, month) {  
        //本月第一天 1-31    
        var relativeDate = new Date(year, month, 1);  
        //获得当前月份0-11    
        var relativeMonth = relativeDate.getMonth();  
        //获得当前年份4位年    
        var relativeYear = relativeDate.getFullYear();  
  
        //当为12月的时候年份需要加1    
        //月份需要更新为0 也就是下一年的第一个月    
        if (relativeMonth == 11) {  
            relativeYear++;  
            relativeMonth = 0;  
        } else {  
            //否则只是月份增加,以便求的下一月的第一天    
            relativeMonth++;  
        }  
        //一天的毫秒数    
        var millisecond = 1000 * 60 * 60 * 24;  
        //下月的第一天    
        var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);  
        //返回得到上月的最后一天,也就是本月总天数    
        return new Date(nextMonthDayOne.getTime() - millisecond).getDate();  
    };  
  
    /**  
    * 获得本季度的起止日期  
    */  
    this.getCurrentSeason = function () {  
        //起止日期数组    
        var startStop = new Array();  
        //获取当前时间    
        var currentDate = this.getCurrentDate();  
        //获得当前月份0-11    
        var currentMonth = currentDate.getMonth();  
        //获得当前年份4位年    
        var currentYear = currentDate.getFullYear();  
        //获得本季度开始月份    
        var quarterSeasonStartMonth = this.getQuarterSeasonStartMonth(currentMonth);  
        //获得本季度结束月份    
        var quarterSeasonEndMonth = quarterSeasonStartMonth + 2;  
  
        //获得本季度开始的日期    
        var quarterSeasonStartDate = new Date(currentYear, quarterSeasonStartMonth, 1);  
        //获得本季度结束的日期    
        var quarterSeasonEndDate = new Date(currentYear, quarterSeasonEndMonth, this.getMonthDays(currentYear, quarterSeasonEndMonth));  
        //加入数组返回    
        startStop.push(quarterSeasonStartDate);  
        startStop.push(quarterSeasonEndDate);  
        //返回    
        return startStop;  
    };  
  
    /***  
    * 得到本年的起止日期  
    *   
    */  
    this.getCurrentYear = function () {  
        //起止日期数组    
        var startStop = new Array();  
        //获取当前时间    
        var currentDate = this.getCurrentDate();  
        //获得当前年份4位年    
        var currentYear = currentDate.getFullYear();  
  
        //本年第一天    
        var currentYearFirstDate = new Date(currentYear, 0, 1);  
        //本年最后一天    
        var currentYearLastDate = new Date(currentYear, 11, 31);  
        //添加至数组    
        startStop.push(currentYearFirstDate);  
        startStop.push(currentYearLastDate);  
        //返回    
        return startStop;  
    };  
  
    /**  
    * 返回上一个月的第一天Date类型  
    * @param year 年  
    * @param month 月  
    **/  
    this.getPriorMonthFirstDay = function (year, month) {  
        //年份为0代表,是本年的第一月,所以不能减    
        if (month == 0) {  
            month = 11; //月份为上年的最后月份    
            year--; //年份减1    
            return new Date(year, month, 1);  
        }  
        //否则,只减去月份    
        month--;  
        return new Date(year, month, 1); ;  
    };  
  
    /**  
    * 获得上一月的起止日期  
    * ***/  
    this.getPreviousMonth = function () {  
        //起止日期数组    
        var startStop = new Array();  
        //获取当前时间    
        var currentDate = this.getCurrentDate();  
        //获得当前月份0-11    
        var currentMonth = currentDate.getMonth();  
        //获得当前年份4位年    
        var currentYear = currentDate.getFullYear();  
        //获得上一个月的第一天    
        var priorMonthFirstDay = this.getPriorMonthFirstDay(currentYear, currentMonth);  
        //获得上一月的最后一天    
        var priorMonthLastDay = new Date(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth(), this.getMonthDays(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth()));  
        //添加至数组    
        startStop.push(priorMonthFirstDay);  
        startStop.push(priorMonthLastDay);  
        //返回    
        return startStop;  
    };  
  
  
    /**  
    * 获得上一周的起止日期  
    * **/  
    this.getPreviousWeek = function () {  
        //起止日期数组    
        var startStop = new Array();  
        //获取当前时间    
        var currentDate = this.getCurrentDate();  
        //返回date是一周中的某一天    
        var week = currentDate.getDay();  
        //返回date是一个月中的某一天    
        var month = currentDate.getDate();  
        //一天的毫秒数    
        var millisecond = 1000 * 60 * 60 * 24;  
        //减去的天数    
        var minusDay = week != 0 ? week - 1 : 6;  
        //获得当前周的第一天    
        var currentWeekDayOne = new Date(currentDate.getTime() - (millisecond * minusDay));  
        //上周最后一天即本周开始的前一天    
        var priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond);  
        //上周的第一天    
        var priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - (millisecond * 6));  
  
        //添加至数组    
        startStop.push(priorWeekFirstDay);  
        startStop.push(priorWeekLastDay);  
  
        return startStop;  
    };  
  
    /**  
    * 得到上季度的起始日期  
    * year 这个年应该是运算后得到的当前本季度的年份  
    * month 这个应该是运算后得到的当前季度的开始月份  
    * */  
    this.getPriorSeasonFirstDay = function (year, month,index) {  
    	var currentMonth = this.getQuarterSeasonStartMonth(month);
        var quarterMonthStart = 0;  
        var spring = 0; //春    
        var summer = 3; //夏    
        var fall = 6;   //秋    
        var winter = 9; //冬    
        //月份从0-11
        if(index==-1){
        	switch (currentMonth) {//季度的起始月份    
	            case spring:  
	                //如果是第一季度则应该到去年的冬季    
	                year--;  
	                currentMonth = winter;  
	                break;  
	            case summer:  
	                currentMonth = spring;  
	                break;  
	            case fall:  
	                currentMonth = summer;  
	                break;  
	            case winter:  
	                currentMonth = fall;  
	                break;  
            };
        }else if(index==1){
        	switch (currentMonth) {//季度的起始月份    
	            case spring:  
	                currentMonth = summer;  
	                break;  
	            case summer:  
	                currentMonth = fall;  
	                break;  
	            case fall:  
	                currentMonth = winter;  
	                break;  
	            case winter:  
	                year++;  
	                currentMonth = spring;  
	                break;  
            };
        }
          
  
        return new Date(year, currentMonth, 1);  
    };  
  
    /**  
    * 得到上季度的起止日期  
    * **/  
    this.getPreviousSeason = function (date,index) {  
        //起止日期数组    
        var startStop = new Array();  
        //获取当前时间    
        var currentDate = new Date(Date.parse(date.replace(/-/g,"/")));
        //获得当前月份0-11    
        var currentMonth = currentDate.getMonth();  
        //获得当前年份4位年    
        var currentYear = currentDate.getFullYear();  
        //上季度的第一天    
        var priorSeasonFirstDay = this.getPriorSeasonFirstDay(currentYear, currentMonth,index);  
        //上季度的最后一天    
        var priorSeasonLastDay = new Date(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2, this.getMonthDays(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2));  
        //添加至数组    
        startStop.push(priorSeasonFirstDay);  
        startStop.push(priorSeasonLastDay);  
        return startStop;  
    }; 
    
    this.getSeasonName = function(date){
    	 var currentDate = new Date(Date.parse(date.replace(/-/g,"/")));
    	 var currentMonth = currentDate.getMonth();  
    	 if(currentMonth<3){
    	 	return laguage.firstQuarter;
    	 }
    	 if(currentMonth<6){
    	 	return laguage.secondQuarter;
    	 }
    	 if(currentMonth<9){
    	 	return laguage.thirdQuarter;
    	 }
    	 return laguage.forthQuarter;
    }
    
    this.getSeasonWeek = function(dateArr){
    	var firstWeek = this.theWeek(dateArr[0]);
    	var lastWeek = this.theWeek(dateArr[1]);
    	var week = [];
    	var week1 = [];
    	var returnweek=[week,week1];
    	for(var i=firstWeek;i<=lastWeek;i++){
    		week.push(i);
    		week1.push(0);
    	}
    	return returnweek;
    }
    this.theWeek =function(now) {
	    var totalDays = 0;
	    years = now.getYear()
	    if (years < 1000)
	        years += 1900
	    var days = new Array(12);
	    days[0] = 31;
	    days[2] = 31;
	    days[3] = 30;
	    days[4] = 31;
	    days[5] = 30;
	    days[6] = 31;
	    days[7] = 31;
	    days[8] = 30;
	    days[9] = 31;
	    days[10] = 30;
	    days[11] = 31;
	     
	    //判断是否为闰年，针对2月的天数进行计算
	    if (Math.round(now.getYear() / 4) == now.getYear() / 4) {
	        days[1] = 29
	    } else {
	        days[1] = 28
	    }
	 
	    if (now.getMonth() == 0) {
	        totalDays = totalDays + now.getDate();
	    } else {
	        var curMonth = now.getMonth();
	        for (var count = 1; count <= curMonth; count++) {
	            totalDays = totalDays + days[count - 1];
	        }
	        totalDays = totalDays + now.getDate();
	    }
	    //得到第几周
	    var week = Math.round(totalDays / 7);
	    return week;
	}
    /**  
    * 得到去年的起止日期  
    * **/  
    this.getPreviousYear = function () {  
        //起止日期数组    
        var startStop = new Array();  
        //获取当前时间    
        var currentDate = this.getCurrentDate();  
        //获得当前年份4位年    
        var currentYear = currentDate.getFullYear();  
        currentYear--;  
        var priorYearFirstDay = new Date(currentYear, 0, 1);  
        var priorYearLastDay = new Date(currentYear, 11, 1);  
        //添加至数组    
        startStop.push(priorYearFirstDay);  
        startStop.push(priorYearLastDay);  
        return startStop;  
    };  
    return this;  
      
})();