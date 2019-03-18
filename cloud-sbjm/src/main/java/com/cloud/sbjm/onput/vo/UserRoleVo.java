package com.cloud.sbjm.onput.vo;

import java.util.Date;
import java.util.List;

import com.cloud.sbjm.domain.Role;
import com.fasterxml.jackson.annotation.JsonFormat;

public class UserRoleVo {

	private String accountId; //用户名
	
	private String iconUrl;//头像
	
	private String userNick;//昵称
	
	private String briefIntroduction;//简介
	
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8") //实体转化成json格式时候，将时间转成（yyyy-MM-dd）格式
	private Date birthday;//出生日期
	
	private String userToken;//用户凭证
	
	
	private List<Role> roleList;//用户角色
	
	private String roleNmae;
	
	private String roleCode;
	
	private String description;

	public String getAccountId() {
		return accountId;
	}

	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}

	public String getIconUrl() {
		return iconUrl;
	}

	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}

	public String getUserNick() {
		return userNick;
	}

	public void setUserNick(String userNick) {
		this.userNick = userNick;
	}

	public String getBriefIntroduction() {
		return briefIntroduction;
	}

	public void setBriefIntroduction(String briefIntroduction) {
		this.briefIntroduction = briefIntroduction;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getUserToken() {
		return userToken;
	}

	public void setUserToken(String userToken) {
		this.userToken = userToken;
	}

	public List<Role> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<Role> roleList) {
		this.roleList = roleList;
	}

	public String getRoleNmae() {
		return roleNmae;
	}

	public void setRoleNmae(String roleNmae) {
		this.roleNmae = roleNmae;
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
