package com.cloud.sbjm.onput;import com.cloud.sbjm.onput.vo.UserRoleVo;public class UserLoginResponse extends BaseResponse {    /**     *     */    private static final long serialVersionUID = 8596220057705675969L;    private UserRoleVo userRoleVo;    public UserRoleVo getUserRoleVo() {        return userRoleVo;    }    public void setUserRoleVo(UserRoleVo userRoleVo) {        this.userRoleVo = userRoleVo;    }}