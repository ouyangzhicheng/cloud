package com.cloud.sbjm.repository.Impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.cloud.sbjm.domain.UserRegister;
import com.cloud.sbjm.onput.vo.UserLoginVo;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.cloud.sbjm.domain.Role;
import com.cloud.sbjm.domain.UserInfo;
import com.cloud.sbjm.domain.UserRole;
import com.cloud.sbjm.onput.UserListRequest;
import com.cloud.sbjm.onput.vo.UserRoleVo;
import com.cloud.sbjm.onput.vo.UserVo;
import com.cloud.sbjm.repository.UserRepository;

@Repository
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private EntityManager em;

    @SuppressWarnings("unchecked")
    @Override
    public List<UserInfo> loadUserList(UserListRequest request) {
        StringBuffer hql = new StringBuffer("");
        hql.append("from UserInfo u where 1=1");
        if (request.getPhone() != null && !request.getPhone().trim().equals("")) {
            hql.append(" and u.phone=:phone");
        }
        if (request.getTureName() != null && !request.getTureName().trim().equals("")) {
            hql.append(" and u.tureName=:tureName");
        }
        Query query = em.createQuery(hql.toString(), UserInfo.class); //生成预查询对象
        if (request.getPhone() != null && !request.getPhone().trim().equals("")) {
            query.setParameter("phone", request.getPhone());
        }
        if (request.getTureName() != null && !request.getTureName().trim().equals("")) {
            query.setParameter("tureName", request.getTureName());
        }
        query.setFirstResult((request.getStartPage() - 1) * request.getLimit()); //分页：从第几行开始取数据由当前页数StartPage和一页显示多少条Limit来算得
        query.setMaxResults(request.getLimit()); //分页：区间段的最后一行
        List<UserInfo> userlist = query.getResultList();
        return userlist;
    }

    @Override
    public Integer loadUserTotal(UserListRequest request) {
        StringBuffer hql = new StringBuffer("");
        hql.append("select count(1) from UserInfo u where 1=1");
        if (request.getPhone() != null && !request.getPhone().trim().equals("")) {
            hql.append(" and u.phone=:phone");
        }
        if (request.getTureName() != null && !request.getTureName().trim().equals("")) {
            hql.append(" and u.tureName=:tureName");
        }

        Query query = em.createQuery(hql.toString());

        if (request.getPhone() != null && !request.getPhone().trim().equals("")) {
            query.setParameter("phone", request.getPhone());
        }
        if (request.getTureName() != null && !request.getTureName().trim().equals("")) {
            query.setParameter("tureName", request.getTureName());
        }
        Long count = (Long) query.getSingleResult();

        return count.intValue();
    }

    /**
     * 用户登录校验
     *
     * @param accountId 账号
     * @return 用户角色信息
     */
    @SuppressWarnings("unchecked")
    @Override
    public UserLoginVo getUserByAccountId(String accountId) {
        StringBuffer sql = new StringBuffer("select u.user_info_id as userInfoId,r.account_id as accountId,");
        sql.append("r.pass_word as passWord from tb_user_register r left join tb_user_info u on r.user_register_id=u.user_register_id");
        sql.append(" where 1=1");
        if (StringUtils.isNotBlank(accountId)) {
            sql.append(" and r.account_id=:accountId");
        }
        Query query = em.createNativeQuery(sql.toString());
        if (StringUtils.isNotBlank(accountId)) {
            query.setParameter("accountId", accountId);
        }
        query.unwrap(SQLQuery.class).setResultTransformer(Transformers.aliasToBean(UserLoginVo.class));
        List<UserLoginVo> userLoginVo = query.getResultList();
        if (userLoginVo != null && userLoginVo.size() > 0) {
            return userLoginVo.get(0);
        }
        return null;
    }

    /**
     * 用户登录校验
     *
     * @param userInfoId 账号
     * @return
     */
    @SuppressWarnings("unchecked")
    @Override
    public UserRoleVo getUserRoleVoByUserId(Integer userInfoId) {
        StringBuffer sql = new StringBuffer("select reg.account_id as accountId,u.icon_url as iconUrl,u.nick_name as userNick,");
        sql.append("u.brief_introduction as briefIntroduction,u.birthday as birthday,u.user_token as userToken,r.role_name as roleNmae,");
        sql.append("r.role_code as roleCode,r.description from tb_user_info u LEFT JOIN tb_user_role ur ON (u.user_info_id=ur.user_info_id)");
        sql.append(" LEFT JOIN tb_role r ON (r.role_id=ur.role_id) LEFT JOIN tb_user_register reg ON(u.user_register_id=reg.user_register_id) where 1=1");
        if (userInfoId != null) {
            sql.append(" and u.user_info_id=:userInfoId");
        }
        Query query = em.createNativeQuery(sql.toString());
        if (userInfoId != null) {
            query.setParameter("userInfoId", userInfoId);
        }
        query.unwrap(SQLQuery.class).setResultTransformer(Transformers.aliasToBean(UserRoleVo.class));
        List<UserRoleVo> userRoleVoList = query.getResultList();
        if (userRoleVoList != null && userRoleVoList.size() > 0) {
            UserRoleVo userRoleVo = new UserRoleVo();
            userRoleVo.setAccountId(userRoleVoList.get(0).getAccountId());
            userRoleVo.setIconUrl(userRoleVoList.get(0).getIconUrl());
            userRoleVo.setUserNick(userRoleVoList.get(0).getUserNick());
            userRoleVo.setBriefIntroduction(userRoleVoList.get(0).getBriefIntroduction());
            userRoleVo.setBirthday(userRoleVoList.get(0).getBirthday());
            userRoleVo.setUserToken(userRoleVoList.get(0).getUserToken());
            List<Role> roleList = new ArrayList<Role>();
            for (UserRoleVo vo : userRoleVoList) {
                Role role = new Role(vo.getRoleNmae(), vo.getRoleCode(), vo.getDescription());
                roleList.add(role);
            }
            userRoleVo.setRoleList(roleList);
            return userRoleVo;
        }
        return null;
    }

    /**
     * 修改用户信息
     *
     * @param user 账号
     * @return
     */

    @Override
    public void updateUser(UserInfo user) {
        em.merge(user);

    }

    /**
     * 保存用户信息
     *
     * @param user
     * @param user
     */
    @Override
    public void saveSystemUser(UserInfo user) {
        em.persist(user);

    }

    /**
     * 删除用户
     *
     * @param userInfoId
     * @return
     * @throws IOException
     */
    @Override
    public void deleteSystemUser(Integer userInfoId) {
        StringBuffer sql = new StringBuffer("delete from tb_user_info where user_info_id=:userInfoId");
        StringBuffer sql2 = new StringBuffer("delete from tb_user_role where user_info_id=:userInfoId");
        Query query = em.createNativeQuery(sql.toString());
        Query query2 = em.createNativeQuery(sql2.toString());
        query.setParameter("userInfoId", userInfoId);
        query2.setParameter("userInfoId", userInfoId);
        query.executeUpdate();
        query2.executeUpdate();
    }

    /**
     * 后台根据Id查询用户
     *
     * @param userInfoId
     * @return
     */
    @SuppressWarnings("unchecked")
    @Override
    public UserVo getUserVoById(Integer userInfoId) {
        StringBuffer sql = new StringBuffer("SELECT u.user_info_id as userInfoId,reg.account_id as accountId ,u.user_number as userNumber,u.user_name as userName,u.ture_name as tureName,u.nick_name as nickName,");
        sql.append("u.icon_url as iconUrl,u.age,u.sex,u.birthday,u.phone,u.brief_introduction as briefIntroduction,u.email,u.status,u.create_time as createTime");
        sql.append(" FROM tb_user_info u left join tb_user_register reg on u.user_register_id = reg.user_register_id where 1=1");

        StringBuffer sql2 = new StringBuffer("select r.role_id as roleId,r.role_name as roleName,r.role_code as roleCode, r.create_time as createTime,r.description");
        sql2.append(" from tb_user_role ur LEFT JOIN tb_role r ON (r.role_id=ur.role_id) where 1=1");
        if (userInfoId != null) {
            sql.append(" and u.user_info_id=:userInfoId");
            sql2.append(" and ur.user_info_id=:userInfoId");
        }
        Query query = em.createNativeQuery(sql.toString());
        Query query2 = em.createNativeQuery(sql2.toString());
        if (userInfoId != null) {
            query.setParameter("userInfoId", userInfoId);
            query2.setParameter("userInfoId", userInfoId);
        }
        query.unwrap(SQLQuery.class).setResultTransformer(Transformers.aliasToBean(UserVo.class));
        query2.unwrap(SQLQuery.class).setResultTransformer(Transformers.aliasToBean(Role.class));
        List<UserVo> userVoList = query.getResultList();
        List<Role> roleList = query2.getResultList();
        if (userVoList != null && userVoList.size() > 0) {
            userVoList.get(0).setRoles(roleList);
            return userVoList.get(0);
        }
        return null;
    }

    /**
     * 修改用户
     *
     * @param u
     * @return
     * @throws IOException
     */
    @Override
    public void updateSystemUser(UserInfo u) {
        em.merge(u);
    }

    /**
     * 后台根据Id查询用户
     *
     * @param userInfoId
     * @return User
     */
    @SuppressWarnings("unchecked")
    @Override
    public UserInfo getUserInfoByUserInfoId(Integer userInfoId) {
        StringBuffer hql = new StringBuffer("from UserInfo u where u.userInfoId=:userInfoId");
        Query query = em.createQuery(hql.toString());
        query.setParameter("userInfoId", userInfoId);
        List<UserInfo> userList = query.getResultList();
        return userList != null && userList.size() > 0 ? userList.get(0) : null;
    }

    /**
     * 获取所有的用户角色
     *
     * @param
     * @return
     */
    @SuppressWarnings("unchecked")
    @Override
    public List<Role> getAllRole() {
        StringBuffer hql = new StringBuffer("from Role");
        Query query = em.createQuery(hql.toString());
        List<Role> roleList = query.getResultList();
        return roleList;
    }

    /**
     * 关联用户角色
     *
     * @param userRole
     * @return
     */
    @Override
    public void addUserRole(UserRole userRole) {
        em.persist(userRole);

    }

    /**
     * 解绑用户角色
     *
     * @param userInfoId
     * @return
     */
    @Override
    public void delUserRole(Integer userInfoId, Integer roleId) {
        StringBuffer sql = new StringBuffer("delete from tb_user_role where user_info_id=:userInfoId and role_id=:roleId");
        Query query = em.createNativeQuery(sql.toString());
        query.setParameter("userInfoId", userInfoId);
        query.setParameter("roleId", roleId);
        query.executeUpdate();

    }
    /**
     * 添加注册用户
     * @param register
     * @return
     */
    public void saveSystemRegister(UserRegister register){
        em.persist(register);
    }
    /**
     * 根据accountId获取userInfo
     * @param accountId
     * @return
     */
	@Override
	public UserInfo getUserInfoByAccountId(String accountId) {
		StringBuffer hql=new StringBuffer("from UserInfo u left join UserRegister ur on u.userRegisterId=ur.userRegisterId where 1=1");
		if(StringUtils.isNotBlank(accountId)){
			hql.append(" and ur.accountId=:accountId");
		}
		Query query=em.createQuery(hql.toString());
		if(StringUtils.isNotBlank(accountId)){
			query.setParameter("accountId", accountId);
		}
		List<UserInfo> userInfoList=query.getResultList();
		if(userInfoList!=null&&userInfoList.size()>0){
			return userInfoList.get(0);
		}
		return null;
	}

}