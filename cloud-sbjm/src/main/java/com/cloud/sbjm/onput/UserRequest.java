package com.cloud.sbjm.onput;import java.util.Date;import java.util.List;import com.fasterxml.jackson.annotation.JsonFormat;public class UserRequest extends BaseRequest {    /**     *     */    private static final long serialVersionUID = 1L;    private Integer userInfoId;    private String accountId;    private String userNumber;    private String userName;    private String tureName;    private String nickName;    private String iconUrl;    private Integer sex;    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")    private Date birthday;    private String phone;    private String email;    private String briefIntroduction;   //个人简介    private Integer status;    private String createTime;    private String iconBase64; //图片BASE64码    private Integer[] addRoleIds;    private Integer[] delRoleIds;    public Integer getUserInfoId() {        return userInfoId;    }    public void setUserInfoId(Integer userInfoId) {        this.userInfoId = userInfoId;    }    public String getUserNumber() {        return userNumber;    }    public void setUserNumber(String userNumber) {        this.userNumber = userNumber;    }    public String getUserName() {        return userName;    }    public void setUserName(String userName) {        this.userName = userName;    }    public String getTureName() {        return tureName;    }    public void setTureName(String tureName) {        this.tureName = tureName;    }    public String getNickName() {        return nickName;    }    public void setNickName(String nickName) {        this.nickName = nickName;    }    public String getIconUrl() {        return iconUrl;    }    public void setIconUrl(String iconUrl) {        this.iconUrl = iconUrl;    }    public Integer getSex() {        return sex;    }    public void setSex(Integer sex) {        this.sex = sex;    }    public Date getBirthday() {        return birthday;    }    public void setBirthday(Date birthday) {        this.birthday = birthday;    }    public String getPhone() {        return phone;    }    public void setPhone(String phone) {        this.phone = phone;    }    public String getEmail() {        return email;    }    public void setEmail(String email) {        this.email = email;    }    public String getBriefIntroduction() {        return briefIntroduction;    }    public void setBriefIntroduction(String briefIntroduction) {        this.briefIntroduction = briefIntroduction;    }    public Integer getStatus() {        return status;    }    public void setStatus(Integer status) {        this.status = status;    }    public String getCreateTime() {        return createTime;    }    public void setCreateTime(String createTime) {        this.createTime = createTime;    }    public String getIconBase64() {        return iconBase64;    }    public void setIconBase64(String iconBase64) {        this.iconBase64 = iconBase64;    }    public Integer[] getAddRoleIds() {        return addRoleIds;    }    public void setAddRoleIds(Integer[] addRoleIds) {        this.addRoleIds = addRoleIds;    }    public Integer[] getDelRoleIds() {        return delRoleIds;    }    public void setDelRoleIds(Integer[] delRoleIds) {        this.delRoleIds = delRoleIds;    }    public String getAccountId() {        return accountId;    }    public void setAccountId(String accountId) {        this.accountId = accountId;    }}