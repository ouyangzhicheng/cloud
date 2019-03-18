package com.cloud.sbjm.onput;

import javax.validation.constraints.NotNull;

import com.cloud.sbjm.common.Constant;


public class UserLoginRequest extends BaseRequest {


    private static final long serialVersionUID = 1L;

    @NotNull(message = Constant.USENAME_NOT_NULL_MSG)
    private String accountId; //用户账号

    @NotNull(message = Constant.PASSWORD_NOT_NULL_MSG)
    private String passWord; //密码

    private String verifyCode;//验证码

    private String random;//随机数（用作本次验证码在redis缓存的Key）

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getVerifyCode() {
        return verifyCode;
    }

    public void setVerifyCode(String verifyCode) {
        this.verifyCode = verifyCode;
    }

    public String getRandom() {
        return random;
    }

    public void setRandom(String random) {
        this.random = random;
    }


}
