package com.ccw.serviceproviders.service;

import com.ccw.serviceproviders.domain.BaseRequest;
import com.ccw.serviceproviders.domain.BaseResponse;
import com.ccw.serviceproviders.domain.UserResponse;
import org.springframework.stereotype.Service;

public interface ServiceProvidersServicer {

    public String hello(String name);

    public String hi(String name);

    public BaseResponse queryTest(BaseRequest request);

    public UserResponse queryUser(BaseRequest request);
}
