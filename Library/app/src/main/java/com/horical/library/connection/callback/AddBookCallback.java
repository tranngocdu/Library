package com.horical.library.connection.callback;

/**
 * Created by trandu on 03/09/2015.
 */
public interface AddBookCallback {
    void onAddBookSuccess();

    void onAddBookError(String message);
}
