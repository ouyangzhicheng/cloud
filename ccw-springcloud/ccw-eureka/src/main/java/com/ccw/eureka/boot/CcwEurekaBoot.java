package com.ccw.eureka.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class CcwEurekaBoot {

	public static void main(String[] args) {
		SpringApplication.run(CcwEurekaBoot.class, args);
		System.out.println("----------------------------> ccw Eureka Succss!");
	}
}
