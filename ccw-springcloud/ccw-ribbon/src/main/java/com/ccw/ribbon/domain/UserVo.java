package com.ccw.ribbon.domain;

public class UserVo {

    private String userName;

    private String passWord;

    private Integer age;

    //json转换需要无参构造参数！
    public UserVo(){

    }

    public UserVo(String userName,String passWord,Integer age){
        this.userName=userName;
        this.passWord=passWord;
        this.age=age;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
