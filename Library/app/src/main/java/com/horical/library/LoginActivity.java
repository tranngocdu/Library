package com.horical.library;

import android.app.Fragment;
import android.app.FragmentManager;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.view.KeyEvent;
import android.widget.Toast;

import com.horical.library.bases.BaseFragmentActivity;
import com.horical.library.fragments.LoginFragment;
import com.horical.library.fragments.SignUpFragment;
import com.horical.library.listenners.BackPressListener;
import com.horical.library.listenners.LoginActivityListener;

/**
 * Created by Diem Huong on 8/29/2015.
 */
public class LoginActivity extends BaseFragmentActivity implements LoginActivityListener {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
    }

    @Override
    protected Fragment onCreateMainFragment(Bundle savedInstancesState) {
        return LoginFragment.newInstances();
    }

    @Override
    protected int getFragmentContainerId() {
        return R.id.layoutContent;
    }

    private void SelectorFragmentByID(int id) {
        switch (id) {
            case 0:
                showFragmentWithClearStack(LoginFragment.newInstances());
                break;
            case 1:
                showFragment(SignUpFragment.newInstances());
                break;
        }
    }

    private static final long EXIT_INTERVAL = 2000L;
    private long exitTimer = Long.MIN_VALUE;

    @Override
    public boolean dispatchKeyEvent(@NonNull KeyEvent event) {
        if (event.getAction() == KeyEvent.ACTION_DOWN && event.getKeyCode() == KeyEvent.KEYCODE_BACK
                && event.getRepeatCount() == 0) {
            FragmentManager fm = getFragmentManager();
            if (mFragmentTagStack.size() > 0) {
                Fragment f = fm.findFragmentByTag(mFragmentTagStack.peek());
                if (f instanceof BackPressListener) {
                    if (((BackPressListener) f).onBackPress()) {
                        return true;
                    }
                }
            }

            boolean tryFinish = false;
            if (mFragmentTagStack.size() == 1) {
                tryFinish = true;
            }

            if (tryFinish) {
                if ((exitTimer + EXIT_INTERVAL) < System.currentTimeMillis()) {
                    Toast.makeText(this, getString(R.string.confirm_exit), Toast.LENGTH_SHORT).show();
                    exitTimer = System.currentTimeMillis();
                } else {
                    finish();
                }
                return true;
            } else {
                return super.dispatchKeyEvent(event);
            }
        }
        return super.dispatchKeyEvent(event);
    }

    @Override
    public void startMainActivityByLogin() {
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        this.finish();
    }

    @Override
    public void attachSignUpFragment() {
        SelectorFragmentByID(1);
    }

    @Override
    public void attachLoginFragment() {
        SelectorFragmentByID(0);
    }
}
