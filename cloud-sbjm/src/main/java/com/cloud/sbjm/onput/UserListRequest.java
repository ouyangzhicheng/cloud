package com.cloud.sbjm.onput;

public class UserListRequest extends PageBaseRequest {


    private static final long serialVersionUID = 1L;

    private String tureName;

    private String phone;

    public String getTureName() {
        return tureName;
    }

    public void setTureName(String tureName) {
        this.tureName = tureName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


}
