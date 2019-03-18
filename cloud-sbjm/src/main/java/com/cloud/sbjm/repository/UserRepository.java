package com.cloud.sbjm.repository;

import java.io.IOException;
import java.util.List;

import com.cloud.sbjm.domain.UserRegister;
import com.cloud.sbjm.domain.Role;
import com.cloud.sbjm.domain.UserInfo;
import com.cloud.sbjm.domain.UserRole;
import com.cloud.sbjm.onput.UserListRequest;
import com.cloud.sbjm.onput.vo.UserLoginVo;
import com.cloud.sbjm.onput.vo.UserRoleVo;
import com.cloud.sbjm.onput.vo.UserVo;

public interface UserRepository {

    public List<UserInfo> loadUserList(UserListRequest request);

    public Integer loadUserTotal(UserListRequest request);

    /**
     * 用户登录校验
     *
     * @param accountId 账号
     * @return
     */
    public UserLoginVo getUserByAccountId(String accountId);

    /**
     * 用户登录校验
     *
     * @param userInfoId 账号
     * @return
     */
    public UserRoleVo getUserRoleVoByUserId(Integer userInfoId);

    /**
     * 修改用户信息
     *
     * @param userName 账号
     * @return
     */
    public void updateUser(UserInfo user);

    /**
     * 保存用户信息
     *
     * @param request
     * @param response
     */
    public void saveSystemUser(UserInfo user);

    /**
     * 删除用户
     *
     * @param request
     * @return
     * @throws IOException
     */
    public void deleteSystemUser(Integer userInfoId);

    /**
     * 后台根据Id查询用户
     *
     * @param request
     * @return
     */
    public UserVo getUserVoById(Integer userInfoId);

    /**
     * 修改用户
     *
     * @param request
     * @return
     * @throws IOException
     */
    public void updateSystemUser(UserInfo u);

    /**
     * 后台根据Id查询用户
     *
     * @param request
     * @return User
     */
    public UserInfo getUserInfoByUserInfoId(Integer userInfoId);

    /**
     * 获取所有的用户角色
     *
     * @param request
     * @return
     */
    public List<Role> getAllRole();

    /**
     * 关联用户角色
     *
     * @param request
     * @return
     */
    public void addUserRole(UserRole userRole);

    /**
     * 解绑用户角色
     * @param userId
     * @return
     */
    public void delUserRole(Integer userId, Integer RoleId);

    /**
     * 添加注册用户
     * @param userId
     * @return
     */
    public void saveSystemRegister(UserRegister register);

    /**
     * 根据accountId获取userInfo
     * @param accountId
     * @return
     */
	public UserInfo getUserInfoByAccountId(String accountId);
}
