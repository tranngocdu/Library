package com.horical.library.fragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.horical.library.R;
import com.horical.library.base.BaseFragment;

/**
 * Created by Diem Huong on 8/29/2015.
 */
public class LoginFragment extends BaseFragment implements View.OnClickListener
{
    private EditText mEdtEmail, mEdtPassword;
    private Button mBtnSignIn, mBtnCreateAccount;
    private TextView mTvForgotPassword;

    public static LoginFragment newInstances()
    {
        return new LoginFragment();
    }

    private boolean veryfyAccount(String email, String password)
    {
        return true;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
    {
        View view = inflater.inflate(R.layout.fragment_login, container, false);
        return view;
    }

    @Override
    protected void initView(View view)
    {
        mEdtEmail = (EditText) view.findViewById(R.id.edtEmail);
        mEdtPassword = (EditText) view.findViewById(R.id.edtPassword);
        mBtnSignIn = (Button) view.findViewById(R.id.btnSignIn);
        mBtnCreateAccount = (Button) view.findViewById(R.id.btnCreateAccount);
        mTvForgotPassword = (TextView) view.findViewById(R.id.tvForgotPassword);
    }

    @Override
    protected void initListener(View view)
    {
        mBtnSignIn.setOnClickListener(this);
        mBtnCreateAccount.setOnClickListener(this);
        mTvForgotPassword.setOnClickListener(this);
    }

    @Override
    protected void initData()
    {

    }

    @Override
    protected boolean hasFooterLayout()
    {
        return false;
    }

    @Override
    public void onClick(View v)
    {
        switch (v.getId())
        {
            case R.id.btnSignIn:
                Toast.makeText(getActivity(), "Sign In", Toast.LENGTH_SHORT).show();
                if (veryfyAccount(mEdtEmail.getText().toString(), mEdtPassword.getText().toString()))
                {
                    mLoginActivityListener.startMainActivityByLogin();
                }
                break;
            case R.id.btnCreateAccount:
                Toast.makeText(getActivity(), "Create Account", Toast.LENGTH_SHORT).show();
                mLoginActivityListener.attachSignUpFragment();
                break;
            case R.id.tvForgotPassword:
                Toast.makeText(getActivity(), "Forgot Pass", Toast.LENGTH_SHORT).show();
                break;
        }
    }
}
