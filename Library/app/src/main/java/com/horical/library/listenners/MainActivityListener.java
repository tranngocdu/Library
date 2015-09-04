package com.horical.library.listenners;

import com.horical.library.dto.NewBook;

/**
 * Created by Diem Huong on 8/25/2015.
 */
public interface MainActivityListener
{
    void createCameraForScan();

    void attachAddBookFragment(NewBook book);

    void attachBookDetailFragment(NewBook book);

    void attachAddStudentFragment();

    void attachBooksFragment();

    void showFooterLayout();

    void hideFooterLayout();
}
