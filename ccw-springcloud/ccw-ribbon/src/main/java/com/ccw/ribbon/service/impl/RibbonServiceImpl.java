package com.ccw.ribbon.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.ccw.ribbon.domain.BaseRequest;
import com.ccw.ribbon.domain.BaseResponse;
import com.ccw.ribbon.domain.UserResponse;
import com.ccw.ribbon.service.RibbonService;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RibbonServiceImpl implements RibbonService{

    @Autowired
    public RestTemplate restTemplate;

    @Override
    @HystrixCommand(fallbackMethod = "helloError")
    public String hello(String name) {
        String name_res=restTemplate.getForObject("http://CCW-SERVICE-PROVIDERS/hello?name="+name,String.class);
        System.out.print("Come on ribbon");
        return name_res;
    }

    @Override
    public BaseResponse queryTest(BaseRequest request) {
        BaseResponse response=restTemplate.postForObject("http://CCW-SERVICE-PROVIDERS/queryTest",request,BaseResponse.class);
        System.out.println("Come on ribbon");
        System.out.println(response.getName());
        return response;
    }

    @Override
    public UserResponse queryUser(BaseRequest request) {
        //注意，json转换问题：若response里有javaBean需要转换，那么javaBean必须有对应的无参空的构造方法！！！！
        UserResponse response=restTemplate.postForObject("http://CCW-SERVICE-PROVIDERS/queryUser",request,UserResponse.class);
        System.out.println("响应参数："+response.getUserVo().getUserName());
        //System.out.println("响应参数："+responseJson);
        //UserResponse response= JSON.parseObject(responseJson,new TypeReference<UserResponse>() {});
        return response;
    }

    public String helloError(String name){
        return "Sorry Error!"+name;
    }
}
