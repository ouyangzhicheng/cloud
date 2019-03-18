package com.ccw.feign.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableEurekaClient
@EnableDiscoveryClient
@EnableFeignClients("com.ccw.feign.service")
@ComponentScan("com.ccw.feign")
public class CcwFeignBoot {

	public static void main(String[] args) {
		SpringApplication.run(CcwFeignBoot.class, args);
		System.out.println("------------------------>Ccw Feign Success!!");
	}
}
