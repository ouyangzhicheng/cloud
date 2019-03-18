package com.cloud.sbjm.service;

/**
 * 消费者
 */
public interface JmsConsumerService {


    /**
     * 消费者接收信息1(接收队列为springQueue的信息)
     */
    public String receiveQueue1(String text);

    /**
     * 消费者接收信息2(先订阅springQueue话题,后接收话题为springQueue的信息)
     */
    public void receiveTopic2(String text);

    /**
     * 消费者接收信息3(先订阅springQueue话题,后接收话题为springQueue的信息)
     */
    public void receiveTopic3(String text);


}