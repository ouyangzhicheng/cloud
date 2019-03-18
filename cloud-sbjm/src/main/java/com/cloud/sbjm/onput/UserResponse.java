package com.cloud.sbjm.onput;

import com.cloud.sbjm.onput.vo.UserVo;

public class UserResponse extends BaseResponse {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    private UserVo uservo;

    public UserVo getUservo() {
        return uservo;
    }

    public void setUservo(UserVo uservo) {
        this.uservo = uservo;
    }


}
