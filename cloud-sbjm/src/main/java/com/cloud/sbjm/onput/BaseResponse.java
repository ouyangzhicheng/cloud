package com.cloud.sbjm.onput;import java.io.Serializable;import java.util.HashMap;import java.util.Map;public class BaseResponse implements Serializable {    private static final long serialVersionUID = -4816212453922051851L;    private String seq;    private String code; //响应编码    private String msg; //响应信息    private Map<String, Object> resMap = new HashMap<String, Object>();//返回数据集合    public BaseResponse() {    }    public BaseResponse(String seq) {        this.seq = seq;        this.code = "0";        this.msg = "sucessfull";    }    public String getSeq() {        return seq;    }    public void setSeq(String seq) {        this.seq = seq;    }    public String getCode() {        return code;    }    public void setCode(String code) {        this.code = code;    }    public String getMsg() {        return msg;    }    public void setMsg(String msg) {        this.msg = msg;    }    public Map<String, Object> getResMap() {        return resMap;    }    public void setResMap(Map<String, Object> resMap) {        this.resMap = resMap;    }}