package com.ccw.feign.service;

import com.ccw.feign.service.impl.FeignServiceError;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "CCW-SERVICE-PROVIDERS",fallback = FeignServiceError.class)
public interface FeignService {

    @RequestMapping(value = "/hi",method = RequestMethod.GET)
   public String sayHiFromClientOne(@RequestParam(value = "name") String name);
}
