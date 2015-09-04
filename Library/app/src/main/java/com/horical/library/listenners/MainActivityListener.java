package com.horical.library.listenners;

/**
 * Created by Diem Huong on 8/25/2015.
 */
public interface MainActivityListener {
    void createCameraForScan();

    void attachAddBookFragment();

    void attachBookDetailFragment();

    void attachAddStudentFragment();

    void backToBooksFragment();

    void showFooterLayout();

    void hideFooterLayout();
}
