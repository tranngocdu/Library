package com.horical.library.connection.callback;

import com.parse.ParseUser;

/**
 * Created by trandu on 02/09/2015.
 */
public interface ChangPasswordCallback {

    void onChangePasswordSuccess(ParseUser user);

    void onChangePasswordError(String message);

}
