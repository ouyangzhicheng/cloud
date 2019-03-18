package com.ccw.feign.service.impl;

import com.ccw.feign.service.FeignService;
import org.springframework.stereotype.Component;

@Component
public class FeignServiceError implements FeignService{
    @Override
    public String sayHiFromClientOne(String name) {
        return "Sorry Error,"+name;
    }
}
