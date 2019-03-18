package com.cloud.sbjm.onput;

import java.util.List;

import com.cloud.sbjm.domain.Role;

public class AllRoleResponse extends BaseResponse {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    private List<Role> roleList;

    public List<Role> getRoleList() {
        return roleList;
    }

    public void setRoleList(List<Role> roleList) {
        this.roleList = roleList;
    }


}
