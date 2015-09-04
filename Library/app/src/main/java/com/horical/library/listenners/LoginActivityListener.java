package com.horical.library.listenners;

/**
 * Created by Diem Huong on 8/29/2015.
 */
public interface LoginActivityListener {
    void startMainActivityByLogin(String email, String token);

    void attachSignUpFragment();

    void attachLoginFragment();

    void attachForgotPasswordFragment();
}
