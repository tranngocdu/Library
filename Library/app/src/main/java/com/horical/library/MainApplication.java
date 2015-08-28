package com.horical.library;

import android.app.Application;
import android.content.Context;

public class MainApplication extends Application {
    public static final String TAG = MainApplication.class.getSimpleName();

    private static Context mContext;

    @Override
    public void onCreate() {
        super.onCreate();
        mContext = getApplicationContext();
    }

    public static Context getContext() {
        return mContext;
    }

}