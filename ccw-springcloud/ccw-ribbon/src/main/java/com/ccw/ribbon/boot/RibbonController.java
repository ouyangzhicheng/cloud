package com.ccw.ribbon.boot;

import com.ccw.ribbon.domain.BaseRequest;
import com.ccw.ribbon.domain.BaseResponse;
import com.ccw.ribbon.domain.UserResponse;
import com.ccw.ribbon.service.RibbonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class RibbonController {

    @Autowired
    public RibbonService ribbonService;

    @RequestMapping(value="/hello",method= RequestMethod.GET)
    public String hello(@RequestParam String name){
        return ribbonService.hello(name);
    }

    @RequestMapping(value="/queryTest",method = RequestMethod.POST)
    public BaseResponse queryTest(@RequestBody BaseRequest request){
        System.out.println("request");
        return ribbonService.queryTest(request);
    }

    @RequestMapping(value="queryUser",method=RequestMethod.POST)
    public UserResponse queryUser(@RequestBody BaseRequest request){
        return ribbonService.queryUser(request);
    }
}
