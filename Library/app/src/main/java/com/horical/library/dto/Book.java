package com.horical.library.dto;

/**
 * Created by Van An on 8/28/2015.
 */
public class Book implements Comparable<Book> {
    private String name;
    private String author;
    private String description;
    private String isbn;
    private String available;
    private String total;

    public Book(String s, String s1, String s2, String s3, String s4) {
    }

    public Book(String name, String author, String available) {
        this.name = name;
        this.author = author;
        this.available = available;
    }

    public Book(String name, String author, String description, String isbn, String available, String total) {
        super();
        this.name = name;
        this.author = author;
        this.description = description;
        this.isbn = isbn;
        this.available = available;
        this.total = total;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getAvailable() {
        return available;
    }

    public void setAvailable(String available) {
        this.available = available;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    @Override
    public int compareTo(Book book) {
        return this.getName().compareTo(book.getName());
    }
}

