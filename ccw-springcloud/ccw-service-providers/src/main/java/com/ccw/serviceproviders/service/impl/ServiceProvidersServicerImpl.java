package com.ccw.serviceproviders.service.impl;

import com.ccw.serviceproviders.domain.BaseRequest;
import com.ccw.serviceproviders.domain.BaseResponse;
import com.ccw.serviceproviders.domain.UserResponse;
import com.ccw.serviceproviders.domain.UserVo;
import com.ccw.serviceproviders.service.ServiceProvidersServicer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ServiceProvidersServicerImpl implements ServiceProvidersServicer{

    @Value("${server.port}")
    public String servicePort;

    @Override
    public String hello(String name) {
        System.out.print("hello,"+name);
        return "hello,"+name+","+servicePort;
    }

    @Override
    public String hi(String name) {
        System.out.print("hi,"+name);
        return "hi,"+name+","+servicePort;
    }

    @Override
    public BaseResponse queryTest(BaseRequest request) {
        BaseResponse response=new BaseResponse();
        response.setName("丁嘉雯");
        response.setAge(12);
        System.out.println(request.getSeq());
        System.out.println(request.getAccountId());
        System.out.println(servicePort);
        return response;
    }

    @Override
    public UserResponse queryUser(BaseRequest request) {
        UserResponse response=new UserResponse();
        UserVo userVo=new UserVo("ouyangzhicheng","321123",25);
        response.setSeq("123");
        response.setUserVo(userVo);
        System.out.println(servicePort);
        return response;
    }
}
