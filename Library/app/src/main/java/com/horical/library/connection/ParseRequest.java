package com.horical.library.connection;

import android.os.AsyncTask;

import com.horical.library.AppConstants;
import com.horical.library.MainApplication;
import com.horical.library.connection.callback.AddBookCallback;
import com.horical.library.connection.callback.AddStudentCallback;
import com.horical.library.connection.callback.ChangPasswordCallback;
import com.horical.library.connection.callback.DeleteBookCallback;
import com.horical.library.connection.callback.ForgotPasswordCallback;
import com.horical.library.connection.callback.GetAllBookCallback;
import com.horical.library.connection.callback.GetAllStudentCallback;
import com.horical.library.connection.callback.GetBookISBNCallback;
import com.horical.library.connection.callback.GetListBookWithTypeCallback;
import com.horical.library.connection.callback.LoginCallback;
import com.horical.library.connection.callback.LogoutCallback;
import com.horical.library.connection.callback.SignUpCallback;
import com.horical.library.dto.NewBook;
import com.horical.library.dto.Student;
import com.horical.library.utils.CommonUtils;
import com.horical.library.utils.ConnectionUtils;
import com.horical.library.utils.NetworkUtils;
import com.parse.DeleteCallback;
import com.parse.FindCallback;
import com.parse.LogInCallback;
import com.parse.LogOutCallback;
import com.parse.ParseException;
import com.parse.ParseQuery;
import com.parse.ParseUser;
import com.parse.RequestPasswordResetCallback;
import com.parse.SaveCallback;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class ParseRequest {
    /*USER*/
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

    public static void changePassword(String email, String oldPassword, final String password, final ChangPasswordCallback callback) {

        ParseRequest.login(email, oldPassword, new LoginCallback() {
            @Override
            public void onLoginSuccess(final ParseUser user) {
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
            }

            @Override
            public void onLoginError(String message) {
                callback.onChangePasswordError(message);
            }
        });

    }

    public static void forgotPassword(String email, final ForgotPasswordCallback callback) {
        ParseUser.requestPasswordResetInBackground(email, new RequestPasswordResetCallback() {
            @Override
            public void done(ParseException e) {
                if (e == null) {
                    callback.onSuccess();
                } else {
                    callback.onError(e.getMessage());
                }
            }
        });
    }

    /* STUDENT */
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

    /* BOOKS */


    public static void getBookListWithType(AppConstants.BOOK_TYPE bookType, final GetListBookWithTypeCallback callback) {
        ParseQuery<NewBook> query = ParseQuery.getQuery(NewBook.class);
        query.whereEqualTo("User", ParseUser.getCurrentUser().getObjectId());
        if (bookType == AppConstants.BOOK_TYPE.AVAILABLE) {
            query.whereGreaterThan("quantity_available", 0);
        } else if (bookType == AppConstants.BOOK_TYPE.CHECKED_OUT) {
            query.whereGreaterThan("quantity_out", 0);
        }
        query.orderByAscending("createdAt");
        query.findInBackground(new FindCallback<NewBook>() {
            @Override
            public void done(List<NewBook> listBook, ParseException e) {
                if (e == null) {
                    callback.onSuccess(listBook);
                } else {
                    callback.onError(e.getMessage());
                }
            }
        });
    }

    public static void deleteBook(final NewBook book, final DeleteBookCallback callback) {
        if (book.studentList() != null && book.studentList().size() > 0) {
            callback.onError("Someone did not return book.");
        } else {
            book.deleteInBackground(new DeleteCallback() {
                @Override
                public void done(ParseException e) {
                    if (e == null) {
                        callback.onSuccess();
                    } else {
                        callback.onError(e.getMessage());
                    }
                }
            });
        }
    }

    public static void getBookISBN(final String isbn, final GetBookISBNCallback callback) {
        if (!NetworkUtils.isNetworkConnected(MainApplication.getContext())) {
            callback.onError("No internet network.");
            return;
        }
        final String url = "http://openlibrary.org/api/books?bibkeys=" + isbn + "&jscmd=data&format=json";
        new AsyncTask<Void, Void, NewBook>() {
            @Override
            protected NewBook doInBackground(Void... params) {
                try {
                    String response = ConnectionUtils.sendGet(url);
                    JSONObject jsonObject = new JSONObject(response);
                    if (jsonObject.has(isbn)) {
                        NewBook book = new NewBook();
                        jsonObject = new JSONObject(jsonObject.getString(isbn));
                        book.setISBN(isbn);
                        if (jsonObject.has("title")) {
                            book.setTitle(jsonObject.getString("title"));
                        }
                        if (jsonObject.has("authors")) {
                            JSONArray arrayAuthor = new JSONArray(jsonObject.getString("authors"));
                            if (arrayAuthor.length() > 0) {
                                List<String> names = new ArrayList<String>();
                                for (int i = 0; i < arrayAuthor.length(); i++) {
                                    JSONObject author = arrayAuthor.getJSONObject(i);
                                    names.add(author.getString("name"));
                                }
                                book.setAuthor(CommonUtils.implode(" - ", names));
                                book.setCoverImage("http://covers.openlibrary.org/b/isbn/" + isbn + "-M.jpg");
                            }
                        }
                        return book;
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return null;
            }

            @Override
            protected void onPostExecute(NewBook book) {
                if (book != null) {
                    callback.onSuccess(book);
                } else {
                    callback.onError("Can not found book.");
                }
            }
        }.execute();
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
