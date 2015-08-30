package com.horical.library;

import android.app.Fragment;
import android.content.Intent;
import android.os.Bundle;

import com.horical.library.base.BaseFragmentActivity;
import com.horical.library.fragments.LoginFragment;
import com.horical.library.fragments.SignUpFragment;
import com.horical.library.listenner.LoginActivityListener;

/**
 * Created by Diem Huong on 8/29/2015.
 */
public class LoginActivity extends BaseFragmentActivity implements LoginActivityListener
{
    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
    }

    @Override
    protected Fragment onCreateMainFragment(Bundle savedInstancesState)
    {
        return LoginFragment.newInstances();
    }

    @Override
    protected int getFragmentContainerId()
    {
        return R.id.layoutContent;
    }

    private void SelectorFragmentByID(int id)
    {
        switch (id)
        {
            case 0:
                LoginFragment loginFragment = new LoginFragment();
                showFragmentWithClearStack(loginFragment);
                break;
            case 1:
                SignUpFragment signUpFragment = new SignUpFragment();
                showFragment(signUpFragment);
                break;
        }
    }

    @Override
    public void startMainActivityByLogin()
    {
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        this.finish();
    }

    @Override
    public void attachSignUpFragment()
    {
        SelectorFragmentByID(1);
    }

    @Override
    public void attachLoginFragment()
    {
        SelectorFragmentByID(0);
    }
}
