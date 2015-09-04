package com.horical.library.connection.callback;

import com.horical.library.dto.NewBook;

import java.util.List;

/**
 * Created by trandu on 03/09/2015.
 */
public interface GetAllBookCallback {
    void onGetAllBookSuccess(List<NewBook> bookList);

    void onGetAllBookError(String message);
}
