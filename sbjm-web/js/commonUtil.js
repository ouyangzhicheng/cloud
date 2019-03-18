
var postUrl="http://192.168.1.107:9091/cloud-sbjm/";
var imagesUrl="http://new.ccwfun.cn/usericon/";
var wxUrl="ws://192.168.1.107:9091/";

//var postUrl="http://192.168.76.129:8080/cloud-sbjm/";
//var imagesUrl="http://192.168.76.129:8080/sbjmImage/";
//var wxUrl="ws://192.168.76.129:8080/";
/**定义一个异步请求JS类(AppSends),并定义构造方法**/
var AppSends=function(ServerURL,timeOut){
	this.ServiceUrl=ServerURL;
	this.timeOut=timeOut || 0;;
	this.userToken="";
	this.accountId="";
}
/**给该异步请求类添加一个封装Ajax的方法**/
AppSends.prototype.postCloud=function(postUrl,requestData,requestHeader,callBackFunc){
	var this_AppSends=this;
	/*添加默认header信息*/
	requestHeader.accept = requestHeader.accept || "application/json";
	requestHeader["content-type"] = requestHeader["content-type"] || "application/json";
	requestHeader.userToken =  this_AppSends.userToken ;
	requestHeader.accountId =  this_AppSends.accountId ;
	requestHeader.userSeq = requestHeader.userSeq || new Date().getTime();
	
	/*添加默认参数*/
	requestData.seq = requestData.seq || new Date().getTime();
	requestData.clientType = requestData.clientType || "formWeb";
	requestData.versionNo = requestData.versionNo || "1.0";
	$.ajax({
		url:this_AppSends.ServiceUrl+postUrl,
		timeout : this_AppSends.timeOut,
		headers:requestHeader,
		type:"post",
		dataType:"json",
		data:JSON.stringify(requestData),
		contentType:'application/json',
		success:function(data){
		    //公共错误
            if(data.code==4){
                alert("token失效");
                window.top.location.href='/login.html';
                return;
            }
			callBackFunc(data);
		},
		error:function(xhr, errorInfo, ex){
			
		}
	});
}

/**实例化一个异步请求引用，方便给其他页面直接进行调用,调用方式:appSend.postCloud(url,data) **/
var appSend=new AppSends(postUrl,10000);

//获取登录之后的Token值
var userToken=getCookie("userToken");

//判断该用户的token值是否有存在
if(userToken!=""){
	
	//赋值给异步请求封装的类（每次请求必带的参数）
	appSend.userToken=userToken;
	appSend.accountId=getCookie("accountId");
}else{
	//判断不是登录页面发起的
	if(window.document.location.href.indexOf("login.html")==-1){
		
		window.top.location.href='/login.html';
	}
	
}



/**
 * @param 获取指定的cookie值 c_name
 */
function getCookie(c_name) {
	if(document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=")
		if(c_start != -1) {
			c_start = c_start + c_name.length + 1
			c_end = document.cookie.indexOf(";", c_start)
			if(c_end == -1) c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return ""
}
/**插入指定的cookie值
 * @param {Object} c_name
 * @param {Object} value
 * @param {Object} expiredays
 */
function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) +
		((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

/**删除指定的cookie
 * @param {Object} name
 */
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}