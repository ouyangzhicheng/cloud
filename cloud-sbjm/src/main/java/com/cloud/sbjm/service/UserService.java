package com.cloud.sbjm.service;

import java.io.IOException;
import java.util.List;

import com.cloud.sbjm.domain.Role;
import com.cloud.sbjm.domain.UserInfo;
import com.cloud.sbjm.onput.UserIdRequest;
import com.cloud.sbjm.onput.UserLoginRequest;
import com.cloud.sbjm.onput.UserLoginResponse;
import com.cloud.sbjm.onput.UserListRequest;
import com.cloud.sbjm.onput.UserRequest;
import com.cloud.sbjm.onput.vo.UserVo;

/**
 * file:UserService.java
 *
 * @author Administrator
 */
public interface UserService {

    /**
     * 查询用户列表
     *
     * @return List<User>
     */
    public List<UserInfo> queryUserList(UserListRequest request);

    /**
     * 查询用户列表总数
     */
    public Integer queryUsertotal(UserListRequest request);

    /**
     * 用户登录校验
     *
     * @param request
     * @param response
     */
    public UserLoginResponse login(UserLoginRequest request, UserLoginResponse response);

    /**
     * 保存用户信息
     *
     * @param request
     * @param response
     */
    public void saveSystemUser(UserRequest request);

    /**
     * 删除用户
     *
     * @param request
     * @return
     * @throws IOException
     */
    public void deleteSystemUser(UserIdRequest request);

    /**
     * 后台根据Id查询用户
     *
     * @param request
     * @return
     */
    public UserVo queryUserVoById(UserIdRequest request);

    /**
     * 修改用户
     *
     * @param request
     * @return
     * @throws IOException
     */
    public void updateSystemUser(UserRequest request);

    /**
     * 后台根据Id查询用户
     *
     * @param request
     * @return
     */
    public UserInfo queryUserById(UserIdRequest request);

    /**
     * 获取所有的用户角色
     *
     * @param request
     * @return
     * @throws IOException
     */
    public List<Role> getAllRole();

}
