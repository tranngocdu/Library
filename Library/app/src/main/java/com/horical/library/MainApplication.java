package com.horical.library;

import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;

import com.horical.library.dto.NewBook;
import com.horical.library.dto.Student;
import com.parse.Parse;
import com.parse.ParseException;
import com.parse.ParseObject;
import com.parse.ParsePush;
import com.parse.SaveCallback;

public class MainApplication extends Application
{

    public static final String TAG = MainApplication.class.getSimpleName();
    public static final String LIB_PREFERENCE = "UserToken";
    public static final String TOKEN = "token";
    public static final String EMAIL = "email";
    private static SharedPreferences mSharedPreferences;
    public static int count = 0;
    private static Context mContext;

    @Override
    public void onCreate()
    {
        super.onCreate();
        mContext = getApplicationContext();

        // Register your parse models
        ParseObject.registerSubclass(Student.class);
        ParseObject.registerSubclass(NewBook.class);
        Parse.enableLocalDatastore(this);
        Parse.initialize(this, getApplicationContext().getResources().getString(R.string.parse_app_id), getApplicationContext().getResources().getString(R.string.parse_client_key));
        ParsePush.subscribeInBackground("", new SaveCallback()
        {
            @Override
            public void done(ParseException e)
            {

            }
        });
        mSharedPreferences = getSharedPreferences(LIB_PREFERENCE, MODE_PRIVATE);
    }

    public static Context getContext()
    {
        return mContext;
    }

    public static void saveUserSession(String email, String token)
    {
        SharedPreferences.Editor editor = mSharedPreferences.edit();
        editor.putString(TOKEN, token);
        editor.putString(EMAIL, email);
        editor.commit();
    }

    public static String getToken()
    {
        return mSharedPreferences.getString(TOKEN, "null");
    }

    public static String getEmail()
    {
        return mSharedPreferences.getString(EMAIL, "null");
    }

    public static void deleteToken()
    {
        SharedPreferences.Editor editor = mSharedPreferences.edit();
        editor.clear();
        editor.commit();
    }

}