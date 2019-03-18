package com.cloud.sbjm.service.Imp;

import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.cloud.sbjm.onput.AricMessage;
import com.cloud.sbjm.onput.AricResponse;
import com.cloud.sbjm.service.WebSocketService;

@Service
public class WebSocketServiceImpl implements WebSocketService {
    int a = 0;

    /**
     * 后台主动推送广播消息
     */
//@Scheduled(fixedRate = 5000)
    @Override
    public void pushMessage() {
        AricMessage message = new AricMessage();
        System.out.println("5s后台推送");
        message.setName("欧阳志成");
//sayhello(message);
    }

    //@Scheduled(fixedRate = 5000)
    @SendTo("/topic/getResponse")//当服务器有消息时,会对订阅了@SendTo中的路径的浏览器发送消息
    public AricResponse sayhello() {
        AricMessage message = new AricMessage();
        System.out.println("5s后台推送");
        message.setName("欧阳志成");
        a++;
        return new AricResponse("welcome," + message.getName() + "!" + a);
    }

}