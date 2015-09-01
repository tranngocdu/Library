package com.horical.library.dto;

import com.parse.ParseClassName;
import com.parse.ParseObject;

import java.util.List;

@ParseClassName("Student")
public class Student extends ParseObject {

    public Student() {

    }

    public String getName() {
        return getString("Name");
    }

    public void setName(String name) {
        put("Name", name);
    }

    public String getUserId() {
        return getString("UserId");
    }

    public void setUserId(String userId) {
        put("UserId", userId);
    }

    public List<NewBook> currentBooks() {
        return getList("currentBooks");
    }

    public void setCurrentBooks(List<NewBook> currentBooks) {
        put("currentBooks", currentBooks);
    }

    public List<NewBook> pastBooks() {
        return getList("pastBooks");
    }

    public void setPastBooks(List<NewBook> pastBooks) {
        put("pastBooks", pastBooks);
    }

}
