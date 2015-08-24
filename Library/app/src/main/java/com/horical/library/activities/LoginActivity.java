package com.horical.library.activities;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import com.horical.library.R;

/**
 * Created by trandu on 24/08/2015.
 */
public class LoginActivity extends Activity {

    public LoginActivity() {

    }

    @Override
    public void onCreate(Bundle bundle) {
        super.onCreate(bundle);
        setContentView(R.layout.activity_login);
        gotoMainActivity();
    }

    public void gotoMainActivity() {
        Intent intent = new Intent(LoginActivity.this, MainActivity.class);
        startActivity(intent);
        this.finish();
    }

}
