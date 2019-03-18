function sendmail(){
		alert("进入")
		if($("#mailForm").valid()){
			var objList=$("#mailForm").serializeArray();
			var postData = {};
			for(var i in objList){
				var name = objList[i].name;
				postData[name] = objList[i].value.trim();
			}
			postData.seq="123454";
				appSend.postCloud("/mail/sendMail",postData,function(data){
					if(data.code==0){
						alert("恭喜你，邮件发送成功！")
					}else{
					alert("邮件发送失败！")
					}	
				});
			}
		}
