package com.cloud.sbjm.configure;
import org.apache.activemq.ActiveMQConnectionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.cloud.sbjm.security.LoginStatusInterceptor;

/**
 * file:CustomWebMvcConfigurerAdapter.java
 * @author ouyang
 * 增加MVC的拦截器
 */

@Configuration //注解为此class为一个配置类
@EnableJms
public class CustomWebMvcConfigurerAdapter extends WebMvcConfigurerAdapter{

	public static RedisTemplate<String, Object> redisTemplate;

	@Override
	public void addInterceptors (InterceptorRegistry registry){

		//增加访问拦截器.excludePathPatterns("aa"):除了aa这个访问地址，其他都拦截！
		registry.addInterceptor(new LoginStatusInterceptor(redisTemplate))

					.excludePathPatterns("/user/getVerifyCode/*")
					.excludePathPatterns("/user/login");
					//.excludePathPatterns("/user/*");

	}

	/**
	  * 缓存对象
	  * @param factory
	  * @return
	  */
	 @Bean
	 public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
		 redisTemplate = new RedisTemplate<String, Object>();
		 redisTemplate.setKeySerializer(new StringRedisSerializer());
	     redisTemplate.setHashKeySerializer(new StringRedisSerializer());
	     redisTemplate.setHashValueSerializer(new JdkSerializationRedisSerializer());
	     redisTemplate.setValueSerializer(new JdkSerializationRedisSerializer());
	     redisTemplate.setConnectionFactory(factory);
	     redisTemplate.afterPropertiesSet();
		 return redisTemplate;
	 }
	/**
	 * 浏览器跨域请求处理，允许所有域名下发起的请求
	 * @return
	 */
	 @Bean
	 public CorsFilter corsFilter() {
		 final UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		 final CorsConfiguration corsConfiguration = new CorsConfiguration();
		 corsConfiguration.setAllowCredentials(true);
		 corsConfiguration.addAllowedOrigin("*");
		 corsConfiguration.addAllowedHeader("*");
		 corsConfiguration.addAllowedMethod("*");
		 urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		 return new CorsFilter(urlBasedCorsConfigurationSource);
	 }

	 	@Bean
	    public JmsTemplate jmsTemplate(ActiveMQConnectionFactory activeMQConnectionFactory){
	        JmsTemplate jmsTemplate=new JmsTemplate();
	        jmsTemplate.setDeliveryMode(2);//进行持久化配置 1表示非持久化，2表示持久化
	        jmsTemplate.setConnectionFactory(activeMQConnectionFactory);
	        //jmsTemplate.setDefaultDestination(queue); //自动注入，启动时，没有初始化queue的话，就不设置此处，可不设置默认，在发送消息时也可设置队列
	        jmsTemplate.setSessionAcknowledgeMode(1);//客户端签收模式
	        return jmsTemplate;
	 	}

	 
	/* 
	//初始化时生成一个ActiveMQQueue 队列
	@Bean
	public Queue queue(){
		
		return new ActiveMQQueue("springQueue");
	}
	//初始化时生成一个ActiveMQTopic 话题
	@Bean
	public Topic topic(){
		
		return new ActiveMQTopic("springTopic");
	}
	*/
}
