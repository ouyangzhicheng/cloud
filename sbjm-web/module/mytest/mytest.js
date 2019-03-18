var aa=function(){
    var jj=new Object();
    jj.builualert=function(){
    	alert('111');
    	}
    	return jj;
    }
    
var a2=new aa();
    
function show(){
	alert('222')
    a2.builualert();
    }

function appCloud(){
	var postDate={};

	postDate.userInfoId=1;
	appSend.postCloud("user/findUserById",postDate,{},function(data){

		
		/**forEach**/
        alert(data.msg);
		alert(data.uservo.accountId);
		/*
		for(var i=0;i<result.pageList.length;i++){
			$("#spanVal").append(result.pageList[i].tureName);
		}
		*/
		});
	}
function aas(){
	layer.msg('hello'); 
	
}
function appajax(){
    $.ajax({
        url:"http://127.0.0.1:8081/cloud-sbjm/user/testt",
        type:"post",
        dataType:"json",
        data:{
            name:'dsdsd',
            password:'sdsdds'
        },
        contentType:'application/x-www-form-urlencoded; charset=UTF-8',
        success:function(data){
            alert(data.msg)

        }
    });
}