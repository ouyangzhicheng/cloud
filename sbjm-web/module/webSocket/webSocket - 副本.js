var stompClient = null;

        function setConnected(connected){
            document.getElementById('connect').disabled = connected;
            document.getElementById('disconnect').disabled = !connected;
            document.getElementById('conversationDiv').style.visibility = connected ? 'visible' : 'hidden';
            $("#response").html();
        }

        function connect(){
            var socket = new SockJS('http://127.0.0.1:9091/sbjm-cheng/endpointAric'); //连接SockJS的endpoint名称为"endpointAric"
            stompClient = Stomp.over(socket);//使用STMOP子协议的WebSocket客户端
            stompClient.connect({},function(frame){//连接WebSocket服务端
                setConnected(true);
                console.log('Connected:' + frame);
                //通过stompClient.subscribe订阅/topic/getResponse 目标(destination)发送的消息,这个是在控制器的@SentTo中定义的
                stompClient.subscribe('/topic/getResponse',function(response){
                    showResponse(JSON.parse(response.body));
                });
            });
        }

        function disconnect(){
            if(stompClient != null) {
                stompClient.disconnect();
            }
            setConnected(false);
            console.log("Disconnected");
        }

        function sendName(){
            var name = $("#name").val();
            //通过stompClient.send向/welcome 目标(destination)发送消息,这个是在控制器的@MessageMapping中定义的
            stompClient.send("/welcome",{},JSON.stringify({'name':name}));
        }

        function showResponse(message){
            var response = $("#response");
            response.append("<p>"+message.userName+"</p>");
        }