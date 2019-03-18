package com.cloud.sbjm.service;

import javax.jms.Destination;

/**
 * 生产者
 */
public interface JmsProducerService {

    /**
     * 生产者发送消息1(发送信息到队列)
     */
    public void queueSend();

    /**
     * 生产者发送消息2(发送信息到话题)
     */
    public void topicSend();

    /**
     * 生产者发送出去之后的信息接收到消费者的反馈
     *
     * @param text
     */
    public void consumerMessage(String text);

}