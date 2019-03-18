package com.cloud.sbjm.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;


@EntityScan("com.cloud.sbjm.domain")
@EnableScheduling
@ComponentScan(basePackages = "com.cloud")
@EnableJpaRepositories("com.cloud.sbjm.repository")
@SpringBootApplication
public class SbjmBoot extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(SbjmBoot.class, args);
        System.out.println("---------->sbjm server have started success ^_^ ");
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {

        return super.configure(builder);
    }

}
