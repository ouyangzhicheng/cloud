package com.ccw.ribbon.domain;

public class UserResponse {

    private String seq;

    private UserVo userVo;

    public String getSeq() {
        return seq;
    }

    public void setSeq(String seq) {
        this.seq = seq;
    }

    public UserVo getUserVo() {
        return userVo;
    }

    public void setUserVo(UserVo userVo) {
        this.userVo = userVo;
    }
}
