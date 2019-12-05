package com.oleola.server.model;

public class IntObject {

    private String message;

    private Integer code;

    public IntObject(String message, Integer code) {
        this.message = message;
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    @Override
    public String toString() {
        return "IntObject{" +
                "message='" + message + '\'' +
                ", code=" + code +
                '}';
    }

}
