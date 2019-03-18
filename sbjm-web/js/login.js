
//定义产生随机数字符的集合
var randomChar=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

$(function(){
	
	//页面加载时，生成验证码
	produceVerifyCode();
	
	//给验证码图片注册点击事件，点击换另一张验证码图片
	$("#verifyCode_img").click(function(){
		produceVerifyCode();
	});
});

//生成验证码
function produceVerifyCode(){
	
	//从字符的集合中随机获取6个字符
	var random=produceRandom(6,randomChar);

	//将随机数的值保存在隐藏标签页面中
	$("#random").val(random);

	//生成验证码图片
	$("#verifyCode_img").attr("src",postUrl+"user/getVerifyCode/"+random);	    	
		  
}
//字符的集合中随机获取字符
function produceRandom(n,chars){
	var randomVal="";
	for(var i=0;i<n;i++){	
	  var index=Math.ceil(Math.random()*35);
	  randomVal+=chars[index];
	}
	return randomVal
}

function login(){
    var accountId=$('#accountId').val();
    var passWord=$('#password').val();
    var verifyCode=$('#verifyCode').val();
    var random=$("#random").val();
    if( accountId==""){
    	alert("accountId null")
    	return;
    }
    if( passWord==""){
    	alert("passWord null")   	
    	return;
    }
    if( verifyCode==""){
    	alert("verifyCode null")
    	return;
    }
    var postDate={};
	postDate.accountId=accountId;
	postDate.passWord=passWord;
	postDate.verifyCode=verifyCode;
	postDate.random=random;
	appSend.postCloud("user/login",postDate,{},function(data){
		
		if(data.code==0){
		 	var loginSuccessUser=data.userRoleVo;
		 	var roleList=loginSuccessUser.roleList;
		 	var roleCodes=[];
		 	var roleNames=[];

	 		for(var i in roleList){
	 			roleCodes.push(roleList[i].roleCode);	
	 			roleNames.push(roleList[i].roleName);
		 	}
		 	 	
		 	console.info(roleCodes.join(","));
		 	console.info(roleNames.join(","));
		 	//登录成功后，将User的相关信息放到cookie和本地数据库里（localStorage）
		 		
		 	setCookie("userToken",loginSuccessUser.userToken);
		 	setCookie("accountId",loginSuccessUser.accountId);
		 	setCookie("roleCodes",roleCodes.join(","));
	        setCookie("roleNames",roleNames.join(","));		 
            localStorage.setItem("iconUrl",loginSuccessUser.iconUrl);
            localStorage.setItem("userNick",loginSuccessUser.userNick);
            localStorage.setItem("briefIntroduction",loginSuccessUser.briefIntroduction);
            localStorage.setItem("birthday",loginSuccessUser.birthday);
            
            //console.info(getCookie("userToken"));
            //console.info(getCookie("userName"));
            //console.info(localStorage.getItem("iconUrl"));
            //console.info(localStorage.getItem("tureName"));
			window.location.href='index.html?v='+new Date().getTime();
		}else{
			
			//10000:验证码出错
			if(data.code==10000){
				produceVerifyCode();
				layer.alert(data.msg);			
			}
			//10001：用户名不存在
			if(data.code==10001){
				layer.alert(data.msg);
			}
			//10002：密码不存在
			if(data.code==10002){
				layer.alert(data.msg);
			}
			
		}
	
		});
}