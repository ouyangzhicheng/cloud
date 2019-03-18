/**根据左边目录树控制右边面板的显示页面**/
	 function toContent(pageurl){
		 var ifream = $("<iframe width='100%' height='100%' scrolling='auto' id='content_iframe' name='content_iframe'  frameborder='no' marginheight='0' marginwidth='0' allowTransparency='true' ></iframe>");
			$(".content").empty();
			$(".content").append(ifream);
			if(pageurl!=null){
				$("#content_iframe").attr("src", pageurl);
			}
			else{
				$("#content_iframe").attr("src", pageurl);
			}
	 } 
 	 
	$(function(){
		
		/**设置默认显示的iframe界面**/
		toContent("module/report/reportcharts.html");
		
		/**加载权限控制**/
		authorityController()
		
		//设置首页用户名称
		$("#userNick").html(localStorage.getItem("userNick"));
		$(".hidden-xs").html(localStorage.getItem("userNick"));
		$("#briefIntroduction").html(localStorage.getItem("briefIntroduction"));
		$("#birthday").html(localStorage.getItem("birthday"));
		var userIcon=localStorage.getItem("iconUrl");
		$("#userIcon1").attr("src",imagesUrl+userIcon);
		$("#userIcon2").attr("src",imagesUrl+userIcon);
	})
	
 /**退出**/
function logout(){
	layer.confirm('您确定要退出登录吗？', {
	  btn: ['退出','取消'] //按钮
	}, function(){	
		
	  delCookie("userToken");
      delCookie("userName");
      delCookie("roleCodes");
      delCookie("roleNames");
      localStorage.removeItem("userNick");
      localStorage.removeItem("iconUrl");
      localStorage.removeItem("briefIntroduction");
      localStorage.removeItem("birthday");
     
      window.top.location.href='/login.html';
	}, function(){
	 
	});
}