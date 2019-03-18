package com.ccw.serviceproviders.boot;

import com.ccw.serviceproviders.domain.BaseRequest;
import com.ccw.serviceproviders.domain.BaseResponse;
import com.ccw.serviceproviders.domain.UserResponse;
import com.ccw.serviceproviders.service.ServiceProvidersServicer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ServiceProvidersController {

    @Autowired
    public ServiceProvidersServicer serviceProvidersServicer;

    @RequestMapping(value="/hello",method= RequestMethod.GET)
    public String hello (@RequestParam String name){
        return serviceProvidersServicer.hello(name);
    }

    @RequestMapping(value="/hi",method=RequestMethod.GET)
    public String hi(@RequestParam String name){
        return serviceProvidersServicer.hi(name);
    }

    @RequestMapping(value="/queryTest",method = RequestMethod.POST)
    public BaseResponse queryTest(@RequestBody BaseRequest request){
        return serviceProvidersServicer.queryTest(request);
    }
    @RequestMapping(value="queryUser",method=RequestMethod.POST)
    public UserResponse queryUser(@RequestBody BaseRequest request){
        return serviceProvidersServicer.queryUser(request);
    }
}
