package com.horical.library.connection.callback;

import com.parse.ParseObject;

/**
 * Created by trandu on 02/09/2015.
 */
public interface ParseCallback {
    void onParseSuccess(ParseObject parseObject);

    void onParseError(String message);
}
