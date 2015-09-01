package com.horical.library.connection.callback;

import com.parse.ParseUser;

public interface LoginCallback {

    void onLoginSuccess(ParseUser user);

    void onLoginError(String message);

}
