package com.horical.library.connection.callback;

import com.horical.library.dto.Student;

import java.util.List;

/**
 * Created by trandu on 02/09/2015.
 */
public interface GetAllStudentCallback {
    void onGetStudentSuccess(List<Student> studentList);

    void onGetStudentError(String message);
}
