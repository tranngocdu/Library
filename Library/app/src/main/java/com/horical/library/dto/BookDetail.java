package com.horical.library.dto;

import java.util.Vector;

/**
 * Created by Van An on 8/28/2015.
 */
public class BookDetail {
    public static Vector<Book> getBookList() {
        Vector<Book> bookList = new Vector<Book>();
        Book book = new Book("Abc", "adnndndnd", "adaddasd", "1", "3");
        bookList.add(book);
        book = new Book("Tristram Shandy ", "Laurence Sterne ", "1760", " England ", "English");
        bookList.add(book);
        book = new Book("Confessions of Zeno ", "Italo Svevo ", "1923", " Italy ", "Italian");
        bookList.add(book);
        book = new Book("Gulliver's Travels ", "Jonathan Swift ", "1726", "   Ireland ", "English");
        bookList.add(book);
        book = new Book("War and Peace ", "Leo Tolstoy ", "1865–1869 ", "Russia ", "Russian");
        bookList.add(book);
        return bookList;
    }
}
