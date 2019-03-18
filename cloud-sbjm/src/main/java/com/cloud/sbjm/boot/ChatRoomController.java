package com.cloud.sbjm.boot;

import javax.jms.Destination;

import org.apache.activemq.command.ActiveMQQueue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cloud.sbjm.onput.BaseResponse;
import com.cloud.sbjm.onput.ChatRoomRequest;
import com.cloud.sbjm.onput.ChatRoomResponse;
import com.cloud.sbjm.service.JmsConsumerService;
import com.cloud.sbjm.service.JmsProducerService;


@Controller
@RequestMapping(value = "/chatRoom")
public class ChatRoomController {

    @Autowired
    private JmsProducerService jmsProducerService; //消息生产者

    @Autowired
    private JmsConsumerService jmsConsumerService; //消息消费者

    @RequestMapping(value = "/sendChatValue", method = RequestMethod.POST)
    public @ResponseBody
    BaseResponse sendChatValue(@RequestBody ChatRoomRequest request) {
        System.out.println("*******************123879798");
        BaseResponse response = new BaseResponse();
        //定义一个目的地（队列类型）
        Destination queue = new ActiveMQQueue(request.getName() + ".queue");
        //jmsProducerService.queueOrTopicSend(queue, request.getChatValue());
        response.setCode("0");
        response.setMsg("success");
        return response;
    }

    @RequestMapping(value = "/getChatValue", method = RequestMethod.POST)
    public @ResponseBody
    ChatRoomResponse getChatValue(@RequestBody ChatRoomRequest request) {
        ChatRoomResponse response = new ChatRoomResponse();
        //获取消费信息
        //String chatValue=jmsConsumerService.queueOrTopicReceive(request.getName()+".queue");
        //System.out.println(chatValue);
        //System.out.println("*******************");
        //response.setChatValue(chatValue);
        return response;
    }

    //@Scheduled(fixedRate = 5000)
    public void test() {
        //jmsProducerService.queueSend("定时器发送");
    }
}