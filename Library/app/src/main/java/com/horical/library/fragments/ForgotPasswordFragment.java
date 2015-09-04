package com.horical.library.fragments;

import android.app.Activity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.horical.library.R;
import com.horical.library.bases.BaseFragment;
import com.horical.library.connection.ParseRequest;
import com.horical.library.connection.callback.ForgotPasswordCallback;

/**
 * Created by trandu on 04/09/2015.
 */
public class ForgotPasswordFragment extends BaseFragment implements View.OnClickListener, ForgotPasswordCallback {

    private static ForgotPasswordFragment INSTANCE;
    private EditText mEdtEmail;
    private Button mBtnRequestPassword;

    public static ForgotPasswordFragment newInstances() {
        if (INSTANCE == null) {
            INSTANCE = new ForgotPasswordFragment();
        }
        return INSTANCE;
    }

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_forgot_password, container, false);
        return view;
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
    }

    @Override
    protected void initView(View view) {
        mEdtEmail = (EditText) view.findViewById(R.id.edtEmail);
        mBtnRequestPassword = (Button) view.findViewById(R.id.btnRequestPassword);
    }

    @Override
    protected void initListener(View view) {
        mBtnRequestPassword.setOnClickListener(this);
    }

    @Override
    protected void initData() {

    }

    @Override
    protected void clearCached() {
        mEdtEmail.setText("");
    }

    @Override
    protected boolean hasFooterLayout() {
        return false;
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnRequestPassword:
                String email = mEdtEmail.getText().toString();
                if (email.equals("")) {
                    Toast.makeText(mContext, "Email cant empty", Toast.LENGTH_SHORT).show();
                } else {
                    ParseRequest.forgotPassword(email, this);
                }
                break;
        }
    }

    @Override
    public void onSuccess() {
        Toast.makeText(mContext, "Request password success, check your email please.", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onError(String message) {
        Toast.makeText(mContext, message, Toast.LENGTH_SHORT).show();
    }
}
