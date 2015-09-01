package com.horical.library.fragments;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.horical.library.R;
import com.horical.library.bases.BaseFragment;

/**
 * Created by Diem Huong on 8/29/2015.
 */
public class SignUpFragment extends BaseFragment implements View.OnClickListener {
    private TextView mTvBackToLogin;
    private EditText mEdtEmail, mEdtPassword, mEdtConfirmPassword;
    private Button mBtnCreateAccount, mBtnHadAccount;

    public static BaseFragment newInstances() {
        return new SignUpFragment();
    }

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_sign_up, container, false);
        return view;
    }

    @Override
    protected void initView(View view) {
        mTvBackToLogin = (TextView) view.findViewById(R.id.tvBackToLogin);

        mEdtEmail = (EditText) view.findViewById(R.id.edtEmail);
        mEdtPassword = (EditText) view.findViewById(R.id.edtPassword);
        mEdtConfirmPassword = (EditText) view.findViewById(R.id.edtConfirmPassword);

        mBtnCreateAccount = (Button) view.findViewById(R.id.btnCreateAccount);
        mBtnHadAccount = (Button) view.findViewById(R.id.btnHadAccount);
    }

    @Override
    protected void initListener(View view) {
        mTvBackToLogin.setOnClickListener(this);

        mEdtEmail.setOnClickListener(this);
        mEdtPassword.setOnClickListener(this);
        mEdtConfirmPassword.setOnClickListener(this);

        mBtnCreateAccount.setOnClickListener(this);
        mBtnHadAccount.setOnClickListener(this);
    }

    @Override
    protected void initData() {

    }

    @Override
    protected boolean hasFooterLayout() {
        return false;
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.tvBackToLogin:
                mLoginActivityListener.attachLoginFragment();
                break;
            case R.id.btnCreateAccount:
                break;
            case R.id.btnHadAccount:
                mLoginActivityListener.attachLoginFragment();
                break;
        }
    }
}
