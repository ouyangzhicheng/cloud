package com.ccw.zuul.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@SpringBootApplication
@EnableZuulProxy
@EnableEurekaClient
@EnableDiscoveryClient
public class CcwZuulBoot {

	public static void main(String[] args) {
		SpringApplication.run(CcwZuulBoot.class, args);
		System.out.println("------------------------->Ccw Zuul Success!");
	}
}
