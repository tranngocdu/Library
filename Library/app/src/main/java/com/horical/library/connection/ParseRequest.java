package com.horical.library.connection;

import com.horical.library.MainApplication;
import com.horical.library.connection.callback.AddBookCallback;
import com.horical.library.connection.callback.AddStudentCallback;
import com.horical.library.connection.callback.ChangPasswordCallback;
import com.horical.library.connection.callback.GetAllBookCallback;
import com.horical.library.connection.callback.GetAllStudentCallback;
import com.horical.library.connection.callback.LoginCallback;
import com.horical.library.connection.callback.LogoutCallback;
import com.horical.library.connection.callback.SignUpCallback;
import com.horical.library.dto.NewBook;
import com.horical.library.dto.Student;
import com.parse.FindCallback;
import com.parse.LogInCallback;
import com.parse.LogOutCallback;
import com.parse.ParseException;
import com.parse.ParseQuery;
import com.parse.ParseUser;
import com.parse.SaveCallback;

import java.util.List;

public class ParseRequest {

    public static void signUp(String email, String password, final SignUpCallback callback) {
        ParseUser user = new ParseUser();
        user.setUsername(email);
        user.setPassword(password);
        user.setEmail(email);
        user.signUpInBackground(new com.parse.SignUpCallback() {
            public void done(ParseException e) {
                if (e == null) {
                    callback.onSignUpSuccess();
                } else {
                    callback.onSignUpError(e.getMessage());
                }
            }
        });
    }

    public static void login(String email, String password, final LoginCallback callback) {
        ParseUser.logInInBackground(email, password, new LogInCallback() {
            @Override
            public void done(ParseUser user, ParseException e) {
                if (user != null) {
                    callback.onLoginSuccess(user);
                } else {
                    callback.onLoginError(e.getMessage());
                }
            }
        });
    }

    public static void logout(final LogoutCallback callback) {
        ParseUser.logOutInBackground(new LogOutCallback() {
            @Override
            public void done(ParseException e) {
                if (e == null) {
                    callback.onLogoutSuccess();
                } else {
                    callback.onLogoutError(e.getMessage());
                }
            }
        });
    }

    public static void changePassword(String password, final ChangPasswordCallback callback) {
        try {
            final ParseUser user = ParseUser.become(MainApplication.getToken());
            user.setPassword(password);
            user.saveInBackground(new SaveCallback() {
                @Override
                public void done(ParseException e) {
                    if (e == null) {
                        callback.onChangePasswordSuccess(user);
                    } else {
                        callback.onChangePasswordError(e.toString());
                    }
                }
            });
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    public static void addStudent(String name, String userId, final AddStudentCallback callback) {
        Student student = new Student();
        student.setName(name);
        student.setUserId(userId);
        student.saveInBackground(new SaveCallback() {
            @Override
            public void done(ParseException e) {
                if (e == null) {
                    callback.onAddStudentSuccess();
                } else {
                    callback.onAddStudentError(e.toString());
                }
            }
        });
    }

    public static void getAllStudent(String userId, final GetAllStudentCallback callback) {
        ParseQuery<Student> query = ParseQuery.getQuery(Student.class);
        query.whereEqualTo("UserId", userId);
        query.findInBackground(new FindCallback<Student>() {
            @Override
            public void done(List<Student> list, ParseException e) {
                if (e == null) {
                    callback.onGetStudentSuccess(list);
                } else {
                    callback.onGetStudentError(e.toString());
                }
            }
        });
    }

    public static void addBook(NewBook book, final AddBookCallback callback) {
        book.saveInBackground(new SaveCallback() {
            @Override
            public void done(ParseException e) {
                if (e == null) {
                    callback.onAddBookSuccess();
                } else {
                    callback.onAddBookError(e.toString());
                }
            }
        });
    }

    public static void getAllBook(String userId, final GetAllBookCallback callback) {
        ParseQuery<NewBook> query = ParseQuery.getQuery(NewBook.class);
        query.whereEqualTo("User", userId);
        query.findInBackground(new FindCallback<NewBook>() {
            @Override
            public void done(List<NewBook> list, ParseException e) {
                if (e == null) {
                    callback.onGetAllBookSuccess(list);
                } else {
                    callback.onGetAllBookError(e.toString());
                }
            }
        });
    }

}
