
	var stompClient = null;
	
	//加载完浏览器后  调用connect（），打开双通道
	$(function(){	
		//打开双通道
		connect()
	})
	
	//强制关闭浏览器  调用websocket.close（）,进行正常关闭
    window.onunload = function() {
    	disconnect()
    }

	//打开双通道
    function connect(){
        var socket = new SockJS(postUrl+'/endpointOyzc'); //连接SockJS的endpoint名称为"endpointAric"
        stompClient = Stomp.over(socket);//使用STMOP子协议的WebSocket客户端
        stompClient.connect({},function(frame){//连接WebSocket服务端
         
            console.log('Connected:' + frame);
           
            //广播接收信息
            stompTopic();
            
            //队列接收信息
            stompQueue()
        });
    }

    //关闭双通道
    function disconnect(){
        if(stompClient != null) {
            stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    //广播（一对多）
    function stompTopic(){
        //通过stompClient.subscribe订阅/topic/getResponse 目标(destination)发送的消息（广播接收信息）
        stompClient.subscribe('/topic/getResponse',function(response){  
        	var message=JSON.parse(response.body);  
        	
        	//展示广播的接收的内容接收
        	 var response = $("#responseTopic");
             response.append("<p>广播发送的信息"+message.userName+"</p>");              	
        });
    } 
    
    //列队（一对一）
    function stompQueue(){
    	var id=1;
        //通过stompClient.subscribe订阅/topic/getResponse 目标(destination)发送的消息（队列接收信息）
    	stompClient.subscribe('/user/' + id + '/queue/getResponse',function(response){
        	var message=JSON.parse(response.body); 
        	
        	//展示广播的接收的内容接收
        	var response = $("#responseQueue");
            response.append("<p>只有userID为"+message.id+"的人才能收到</p>");           	
        });
    } 
   