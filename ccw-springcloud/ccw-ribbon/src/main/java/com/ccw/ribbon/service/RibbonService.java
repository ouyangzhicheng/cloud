package com.ccw.ribbon.service;

import com.ccw.ribbon.domain.BaseRequest;
import com.ccw.ribbon.domain.BaseResponse;
import com.ccw.ribbon.domain.UserResponse;

public interface RibbonService {
    public String hello(String name);

    public BaseResponse queryTest(BaseRequest request);

    public UserResponse queryUser(BaseRequest request);
}
