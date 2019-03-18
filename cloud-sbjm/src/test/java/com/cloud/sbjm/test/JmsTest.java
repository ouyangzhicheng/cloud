package com.cloud.sbjm.test;

import javax.jms.Destination;

import org.apache.activemq.command.ActiveMQQueue;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.cloud.sbjm.service.JmsProducerService;


@RunWith(SpringRunner.class)
@SpringBootTest
public class JmsTest {

 	@Autowired  
    private JmsProducerService jmsProducerService;  
      
 	//测试发送队列
 	@Test
 	public void queueSend() throws InterruptedException{
 	
 	//jmsProducerService.queueSend("Ouyzc的springQueue测试");
 	}
 	//测试发送话题
 	@Test
 	public void topicSend() throws InterruptedException{
 	//jmsProducerService.topicSend("Ouyzc的springTopic测试");
 	}
 	
    @Test  
    public void queueOrTopicSend() throws InterruptedException {  
    	
    	//定义一个目的地（队列类型）
        Destination queue = new ActiveMQQueue("mytest.queue");  
        
      //定义一个目的地（话题类型）
       // Destination topic = new ActiveMQTopic("mytest.topic"); 
            
        for(int i=0; i<10; i++){  
        	//jmsProducerService.queueOrTopicSend(queue, "myname is Oyzc"+i);
           
        }  
        
    }
    
}