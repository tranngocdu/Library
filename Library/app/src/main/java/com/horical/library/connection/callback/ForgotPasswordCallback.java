package com.horical.library.connection.callback;

/**
 * Created by Diem Huong on 9/4/2015.
 */
public interface ForgotPasswordCallback
{
    void onSuccess();

    void onError(String message);
}
