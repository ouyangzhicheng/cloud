package com.cloud.sbjm.onput;

public class ChatRoomResponse extends BaseResponse {

    /**
     *
     */
    private static final long serialVersionUID = -8971717605598085000L;

    private String name;

    private String chatValue;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getChatValue() {
        return chatValue;
    }

    public void setChatValue(String chatValue) {
        this.chatValue = chatValue;
    }


}