package com.cloud.sbjm.service.Imp;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import com.cloud.sbjm.domain.UserRegister;
import com.cloud.sbjm.onput.vo.UserLoginVo;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.cloud.sbjm.common.Constant;
import com.cloud.sbjm.common.ImageUtil;
import com.cloud.sbjm.domain.Role;
import com.cloud.sbjm.domain.UserInfo;
import com.cloud.sbjm.domain.UserRole;
import com.cloud.sbjm.onput.UserIdRequest;
import com.cloud.sbjm.onput.UserListRequest;
import com.cloud.sbjm.onput.UserLoginRequest;
import com.cloud.sbjm.onput.UserLoginResponse;
import com.cloud.sbjm.onput.UserRequest;
import com.cloud.sbjm.onput.vo.UserRoleVo;
import com.cloud.sbjm.onput.vo.UserVo;
import com.cloud.sbjm.repository.UserRepository;
import com.cloud.sbjm.security.UserLoginToken;
import com.cloud.sbjm.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * file:UserServiceImp.java
 *
 * @author Administrator
 */
@Service
public class UserServiceImp implements UserService {

    private Logger logger = LoggerFactory.getLogger(UserServiceImp.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    /**
     * @param request 查询用户列表
     */
    @Override
    public List<UserInfo> queryUserList(UserListRequest request) {

        return userRepository.loadUserList(request);
    }

    /**
     * @return totel
     * 查询用户总数
     */
    @Override
    public Integer queryUsertotal(UserListRequest request) {

        return userRepository.loadUserTotal(request);
    }

    /**
     * 用户登录校验
     *
     * @param request 账号
     * @return 用户角色信息
     */
    @Transactional(propagation = Propagation.REQUIRED)
    @Override
    public UserLoginResponse login(UserLoginRequest request, UserLoginResponse response) {
        System.out.print(request.getAccountId());
        //1.校验用户是否存在
        UserLoginVo userLoginVO = userRepository.getUserByAccountId(request.getAccountId());

        if (userLoginVO == null) {
            response.setCode(Constant.USER_IS_NOT_EXIST_CODE);
            response.setMsg(Constant.USER_IS_NOT_EXIST_MSG);
            return response;
        }
        //2.校验密码是否正确
        String passWordSHA = DigestUtils.sha256Hex(request.getPassWord());
        if (!userLoginVO.getPassWord().equals(passWordSHA)) {
            response.setCode(Constant.PASSWORD_ERROR_CODE);
            response.setMsg(Constant.PASSWORD_ERROR_MSG);
            return response;
        }
        //3.验证通过后，设置token值（用户名+密码+时间戳   2次MD5加密）
        String userToken = DigestUtils.sha256Hex(DigestUtils.sha256Hex(request.getAccountId() + request.getPassWord() + request.getSeq()));
        UserInfo userInfo = userRepository.getUserInfoByUserInfoId(userLoginVO.getUserInfoId());
        //4.将token值存到数据库用户表里
        userInfo.setUserToken(userToken);
        userRepository.updateUser(userInfo);

        //5.获取返回给前端的用户信息和角色
        UserRoleVo userRoleVo = userRepository.getUserRoleVoByUserId(userInfo.getUserInfoId());
        //5.1可增加判断是否有权限登录（现暂时都可以登录）
        System.out.println("该用户具备的角色为：");
        System.out.println(userRoleVo);
        //6.将token和userName封装的实体存到缓存里
        //6.1将生成的token和userName封装成一个实体,用以放在缓存里
        UserLoginToken userLoginToken = new UserLoginToken(userLoginVO.getAccountId(), userToken);
        //6.2将实体存到缓存里
        try {
            redisTemplate.opsForValue().set(userLoginVO.getAccountId() + "Token", new ObjectMapper().writeValueAsString(userLoginToken), 24, TimeUnit.HOURS);
        } catch (JsonProcessingException e) {
            logger.error("写缓存错误！");
            e.printStackTrace();
        }

        //6.验证成功后，返回该用户信息给页面
        response.setUserRoleVo(userRoleVo);
        response.setCode(Constant.SUCCESS_CODE);
        response.setMsg(Constant.SUCCESS_MSG);

        System.out.println("welcome");
        return response;
    }

    /**
     * 保存用户信息
     *
     * @param request
     * @param
     */
    @Override
    @Transactional
    public void saveSystemUser(UserRequest request) {


        //插入注册表
        UserRegister register=new UserRegister();
        register.setAccountId(request.getAccountId());
        //默认密码为888888
        register.setPassWord(DigestUtils.sha256Hex("888888"));
        register.setRegisterTime(new Date());
        userRepository.saveSystemRegister(register);

        //插入用户信息表
        UserInfo userInfo = new UserInfo();
        BeanUtils.copyProperties(request, userInfo);
        userInfo.setUserRegisterId(register.getUserRegisterId());
        userInfo.setCreateTime(new Date());
        userInfo.setUserNumber(new Date().getTime() + "");
        //上传照片
        try{
            if (StringUtils.isNotBlank(request.getIconBase64())) {
                String imageUrl = uploadIcon(request.getIconBase64(), "ccwfunIcon");
                userInfo.setIconUrl(imageUrl);
            }
        }catch (Exception e){
        System.out.println("上传头像地址出错");
        }

        userRepository.saveSystemUser(userInfo);
        //绑定用户角色
        if (request.getAddRoleIds() != null && request.getAddRoleIds().length > 0) {
            //先排重
            List<Integer> addRoleIdList = new ArrayList<Integer>();
            for (Integer roleId : request.getAddRoleIds()) {
                if (!addRoleIdList.contains(roleId)) {
                    addRoleIdList.add(roleId);
                }
            }
            //绑定角色
            for (Integer roleId : addRoleIdList) {
                UserRole userRole = new UserRole();
                userRole.setRoleId(roleId);
                userRole.setUserInfoId(userInfo.getUserInfoId());
                userRepository.addUserRole(userRole);
            }

        }

    }

    /**
     * 删除用户
     *
     * @param request
     * @return
     * @throws IOException
     */
    @Override
    @Transactional
    public void deleteSystemUser(UserIdRequest request) {

        userRepository.deleteSystemUser(request.getUserInfoId());

    }

    /**
     * 后台根据Id查询用户
     *
     * @param request
     * @return UserVo
     */
    @Override
    public UserVo queryUserVoById(UserIdRequest request) {

        return userRepository.getUserVoById(request.getUserInfoId());
    }

    /**
     * 后台根据Id查询用户
     *
     * @param request
     * @return User
     */
    @Override
    public UserInfo queryUserById(UserIdRequest request) {

        return userRepository.getUserInfoByUserInfoId(request.getUserInfoId());
    }

    /**
     * 修改用户
     *
     * @param request
     * @return
     * @throws IOException
     */
    @Override
    @Transactional
    public void updateSystemUser(UserRequest request) {

        UserInfo u = userRepository.getUserInfoByUserInfoId(request.getUserInfoId());
        BeanUtils.copyProperties(request, u);
        //上传照片
        try {
            if (StringUtils.isNotBlank(request.getIconBase64())) {
                String imageUrl = uploadIcon(request.getIconBase64(), "ccwfunIcon");
                u.setIconUrl(imageUrl);
            }
        }catch (Exception e){
            System.out.println("上传头像出错");
        }

        userRepository.updateSystemUser(u);

        //绑定用户角色
        if (request.getAddRoleIds() != null && request.getAddRoleIds().length > 0) {
            //先排重
            List<Integer> addRoleIdList = new ArrayList<Integer>();
            for (Integer roleId : request.getAddRoleIds()) {
                if (!addRoleIdList.contains(roleId)) {
                    addRoleIdList.add(roleId);
                }
            }
            //绑定角色
            for (Integer roleId : addRoleIdList) {
                UserRole userRole = new UserRole();
                userRole.setRoleId(roleId);
                userRole.setUserInfoId(u.getUserInfoId());
                userRepository.addUserRole(userRole);
            }

        }

        //解绑用户角色(解绑可以不用排重)
        if (request.getDelRoleIds() != null && request.getDelRoleIds().length > 0) {

            //解绑角色
            for (Integer roleId : request.getDelRoleIds()) {

                userRepository.delUserRole(u.getUserInfoId(), roleId);
            }

        }
    }

    /**
     * 后台上传图片
     *
     * @param iconBase64 照片的Base64编码字符串
     * @return 照片的路径
     */
    private String uploadIcon(String iconBase64, String folderName) {
        String imageUrl = null;
        if (StringUtils.isNotBlank(iconBase64)) {
            byte[] imgBytes = Base64.decodeBase64(iconBase64);
            for (int i = 0; i < imgBytes.length; ++i) {
                if (imgBytes[i] < 0) {
                    imgBytes[i] += 256;
                }
            }
            imageUrl = ImageUtil.saveFile(imgBytes, "jpg", Constant.FILE_PATH + folderName);
            ImageUtil.thumbnailImage(imageUrl, 100, 100);
            if (imageUrl != null) {
                imageUrl = imageUrl.substring(Constant.FILE_PATH.length());
            }
            logger.info("上传成员照片:>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:" + imageUrl);

        }
        return imageUrl;
    }

    /**
     * 获取所有的用户角色
     *
     * @param
     * @return
     */
    @Override
    public List<Role> getAllRole() {

        return userRepository.getAllRole();
    }


}
