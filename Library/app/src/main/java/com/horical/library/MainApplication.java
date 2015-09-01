package com.horical.library;

import android.app.Application;
import android.content.Context;

import com.horical.library.dto.NewBook;
import com.horical.library.dto.Student;
import com.parse.Parse;
import com.parse.ParseException;
import com.parse.ParseObject;
import com.parse.ParsePush;
import com.parse.SaveCallback;

public class MainApplication extends Application {
    public static final String TAG = MainApplication.class.getSimpleName();

    private static Context mContext;

    @Override
    public void onCreate() {
        super.onCreate();
        mContext = getApplicationContext();

        // Register your parse models
        ParseObject.registerSubclass(Student.class);
        ParseObject.registerSubclass(NewBook.class);
        Parse.enableLocalDatastore(this);
        Parse.initialize(this, getApplicationContext().getResources().getString(R.string.parse_app_id), getApplicationContext().getResources().getString(R.string.parse_client_key));
        ParsePush.subscribeInBackground("", new SaveCallback() {
            @Override
            public void done(ParseException e) {

            }
        });
    }

    public static Context getContext() {
        return mContext;
    }

}