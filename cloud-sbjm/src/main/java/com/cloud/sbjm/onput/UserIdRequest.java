package com.cloud.sbjm.onput;

public class UserIdRequest extends BaseRequest {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    private Integer userInfoId;

    public Integer getUserInfoId() {
        return userInfoId;
    }

    public void setUserInfoId(Integer userInfoId) {
        this.userInfoId = userInfoId;
    }
}
