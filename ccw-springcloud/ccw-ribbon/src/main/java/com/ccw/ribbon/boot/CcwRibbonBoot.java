package com.ccw.ribbon.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableEurekaClient
@EnableDiscoveryClient
@ComponentScan("com.ccw.ribbon")
@EnableHystrix
public class CcwRibbonBoot {

	public static void main(String[] args) {
		SpringApplication.run(CcwRibbonBoot.class, args);
		System.out.println("-------------------------------->Ccw Ribbon Success!!");
	}

	@Bean
	@LoadBalanced
	public RestTemplate loadRestTemplate(){
		return new RestTemplate();
	}
}
