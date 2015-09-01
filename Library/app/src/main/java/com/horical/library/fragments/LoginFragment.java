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
import com.horical.library.bases.BaseFragment;
import com.horical.library.connection.ParseRequest;
import com.horical.library.connection.callback.LoginCallback;
import com.parse.ParseUser;

/**
 * Created by Diem Huong on 8/29/2015.
 */
public class LoginFragment extends BaseFragment implements View.OnClickListener, LoginCallback {

    private EditText mEdtEmail, mEdtPassword;
    private Button mBtnSignIn, mBtnCreateAccount;
    private TextView mTvForgotPassword;

    public static LoginFragment newInstances() {
        return new LoginFragment();
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_login, container, false);
        return view;
    }

    @Override
    protected void initView(View view) {
        mEdtEmail = (EditText) view.findViewById(R.id.edtEmail);
        mEdtPassword = (EditText) view.findViewById(R.id.edtPassword);
        mBtnSignIn = (Button) view.findViewById(R.id.btnSignIn);
        mBtnCreateAccount = (Button) view.findViewById(R.id.btnCreateAccount);
        mTvForgotPassword = (TextView) view.findViewById(R.id.tvForgotPassword);
    }

    @Override
    protected void initListener(View view) {
        mBtnSignIn.setOnClickListener(this);
        mBtnCreateAccount.setOnClickListener(this);
        mTvForgotPassword.setOnClickListener(this);
    }

    @Override
    protected void initData() {

    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
    }

    @Override
    protected boolean hasFooterLayout() {
        return false;
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnSignIn:
                String email = mEdtEmail.getText().toString().trim();
                String password = mEdtPassword.getText().toString().trim();
                if (!email.equalsIgnoreCase("") && !password.equalsIgnoreCase("")) {
                    ParseRequest.login(email, password, this);
                } else {
                    Toast.makeText(mContext, "Email or Password is empty.", Toast.LENGTH_SHORT).show();
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

    @Override
    public void onLoginSuccess(ParseUser user) {
        mLoginActivityListener.startMainActivityByLogin(user.getEmail(), user.getSessionToken());
    }

    @Override
    public void onLoginError(String message) {
        Toast.makeText(mContext, message, Toast.LENGTH_SHORT).show();
    }
}
