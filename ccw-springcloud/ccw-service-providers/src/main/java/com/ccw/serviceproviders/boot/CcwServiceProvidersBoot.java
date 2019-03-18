package com.ccw.serviceproviders.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableEurekaClient
@ComponentScan("com.ccw.serviceproviders")
public class CcwServiceProvidersBoot {

	public static void main(String[] args) {
		SpringApplication.run(CcwServiceProvidersBoot.class, args);
		System.out.print("-------------------------------> Service Providers Success!");
	}
}
