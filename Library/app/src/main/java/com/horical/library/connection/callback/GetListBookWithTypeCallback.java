package com.horical.library.connection.callback;

import com.horical.library.dto.NewBook;

import java.util.List;

/**
 * Created by Diem Huong on 9/4/2015.
 */
public interface GetListBookWithTypeCallback
{
    void onSuccess(List<NewBook> newBooks);

    void onError(String message);
}
