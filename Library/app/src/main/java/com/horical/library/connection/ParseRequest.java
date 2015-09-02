package com.horical.library.connection;

import com.horical.library.MainApplication;
import com.horical.library.connection.callback.ChangPasswordCallback;
import com.horical.library.connection.callback.LoginCallback;
import com.horical.library.connection.callback.LogoutCallback;
import com.horical.library.connection.callback.SignupCallback;
import com.horical.library.dto.Student;
import com.parse.LogInCallback;
import com.parse.LogOutCallback;
import com.parse.ParseException;
import com.parse.ParseUser;
import com.parse.SaveCallback;
import com.parse.SignUpCallback;

public class ParseRequest {

    public static void signup(String email, String password, final SignupCallback callback) {
        ParseUser user = new ParseUser();
        user.setUsername(email);
        user.setPassword(password);
        user.setEmail(email);
        user.signUpInBackground(new SignUpCallback() {
            public void done(ParseException e) {
                if (e == null) {
                    callback.onSignupSuccess();
                } else {
                    callback.onSignupError(e.getMessage());
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

    public static void addStudent(String name, String userId) {
        Student student = new Student();
        student.setName(name);
        student.setUserId(userId);
        student.saveInBackground();
    }

}
