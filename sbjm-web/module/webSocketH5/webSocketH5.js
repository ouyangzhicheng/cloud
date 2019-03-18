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
	postDate.startPage=1;
	postDate.limit=5;
	appSend.postCloud("user/findUserList",postDate,{},function(data){
		var result=data
		
		/**forEach**/
		result.data.forEach(function(user,index,data){
			$("#spanVal").append(user.tureName);
		});
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