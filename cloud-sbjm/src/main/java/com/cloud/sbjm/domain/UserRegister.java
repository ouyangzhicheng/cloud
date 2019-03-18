package com.cloud.sbjm.domain;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="tb_user_register")
public class UserRegister {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="user_register_id")
    private Integer userRegisterId;

    @Column(name="account_id")
    private String accountId;

    @Column(name="pass_word")
    private String passWord;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss", timezone = "GMT+8") //实体转化成json格式时候，将时间转成（yyyy-MM-dd）格式
    @Column(name="register_time")
    private Date registerTime;



    public Integer getUserRegisterId() {
		return userRegisterId;
	}

	public void setUserRegisterId(Integer userRegisterId) {
		this.userRegisterId = userRegisterId;
	}

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

    public Date getRegisterTime() {
        return registerTime;
    }

    public void setRegisterTime(Date registerTime) {
        this.registerTime = registerTime;
    }
}
