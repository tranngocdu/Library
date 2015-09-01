package com.horical.library.connection.callback;

public interface LogoutCallback {

    void onLogoutSuccess();

    void onLogoutError(String message);

}
