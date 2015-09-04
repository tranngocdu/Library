package com.horical.library.dto;

import com.parse.ParseClassName;
import com.parse.ParseObject;

import java.util.List;

@ParseClassName("NewBook")
public class NewBook extends ParseObject {

    public NewBook() {

    }

    public String getISBN() {
        return getString("ISBN");
    }

    public void setISBN(String ISBN) {
        put("ISBN", ISBN);
    }

    public String getUser() {
        return getString("User");
    }

    public void setUser(String User) {
        put("User", User);
    }

    public String getAuthor() {
        return getString("author");
    }

    public void setAuthor(String author) {
        put("author", author);
    }

    public String getCoverImage() {
        return getString("cover_image");
    }

    public void setCoverImage(String coverImage) {
        put("cover_image", coverImage);
    }

    public int getQuantityAvailable() {
        return getInt("quantity_available");
    }

    public void setQuantityAvailable(int quantityAvailable) {
        put("quantity_available", quantityAvailable);
    }

    public int getQuantityOut() {
        return getInt("quantity_out");
    }

    public void setQuantityOut(String quantityOut) {
        put("quantity_out", quantityOut);
    }

    public int getQuantityTotal() {
        return getInt("quantity_total");
    }

    public void setQuantityTotal(int quantityTotal) {
        put("quantity_total", quantityTotal);
    }

    public List<Student> studentList() {
        return getList("studentList");
    }

    public void setStudentList(List<Student> studentList) {
        put("studentList", studentList);
    }

    public String getTitle() {
        return getString("title");
    }

    public void setTitle(String title) {
        put("title", title);
    }

}
