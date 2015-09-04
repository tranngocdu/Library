package com.horical.library.connection.callback;

import com.horical.library.dto.NewBook;

/**
 * Created by Diem Huong on 9/4/2015.
 */
public interface GetBookISBNCallback
{
    void onError(String message);

    void onSuccess(NewBook book);
}
