package com.horical.library.fragments;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.horical.library.LoginActivity;
import com.horical.library.MainActivity;
import com.horical.library.MainApplication;
import com.horical.library.R;
import com.horical.library.bases.BaseFragment;
import com.horical.library.connection.ParseRequest;
import com.horical.library.connection.callback.ChangPasswordCallback;
import com.horical.library.connection.callback.LogoutCallback;
import com.parse.ParseException;
import com.parse.ParseUser;

/**
 * Created by trandu on 24/08/2015.
 */
public class SettingsFragment extends BaseFragment implements View.OnClickListener, ChangPasswordCallback, LogoutCallback {
    private EditText mEdtEmail, mEdtCurrentPassword, mEdtNewPassword, mEdtConfirmNewPassword;
    private Button mBtnUpdate, mBtnHelpMe, mBtnLogout;

    public static SettingsFragment newInstances() {
        return new SettingsFragment();
    }

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
    }

    @Override
    public void onCreate(Bundle bundle) {
        super.onCreate(bundle);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle bundle) {
        View v = inflater.inflate(R.layout.fragment_settings, container, false);
        return v;
    }

    @Override
    public void onViewCreated(View view, Bundle bundle) {
        super.onViewCreated(view, bundle);
    }


    @Override
    protected void initView(View view) {
        mEdtCurrentPassword = (EditText) view.findViewById(R.id.edtCurrentPassword);
        mEdtConfirmNewPassword = (EditText) view.findViewById(R.id.edtConfirmNewPassword);
        mEdtEmail = (EditText) view.findViewById(R.id.edtEmail);
        mEdtNewPassword = (EditText) view.findViewById(R.id.edtNewPassword);

        mBtnHelpMe = (Button) view.findViewById(R.id.btnHelpMe);
        mBtnLogout = (Button) view.findViewById(R.id.btnLogout);
        mBtnUpdate = (Button) view.findViewById(R.id.btnUpdate);
    }

    @Override
    public void initListener(View view) {
        mBtnHelpMe.setOnClickListener(this);
        mBtnLogout.setOnClickListener(this);
        mBtnUpdate.setOnClickListener(this);
    }

    @Override
    protected void initData() {
        mEdtEmail.setText(MainApplication.getEmail());
    }

    @Override
    protected boolean hasFooterLayout() {
        return true;
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnHelpMe:
                Toast.makeText(getActivity(), "btnHelpMe", Toast.LENGTH_SHORT).show();
                break;
            case R.id.btnLogout:
                MainApplication.deleteToken();
                ParseRequest.logout(this);
                Intent intent = new Intent(mContext, LoginActivity.class);
                startActivity(intent);
                ((MainActivity) mContext).finish();
                break;
            case R.id.btnUpdate:
                update();
                break;
            default:
        }
    }

    public void update() {
        String currentPassword = mEdtCurrentPassword.getText().toString();
        String newPassword = mEdtNewPassword.getText().toString();
        String reNewPassword = mEdtConfirmNewPassword.getText().toString();
        if (currentPassword.equals("") || newPassword.equals("") || reNewPassword.equals("")) {
            Toast.makeText(mContext, "Cant empty", Toast.LENGTH_SHORT).show();
        } else {
            if (newPassword.equals(reNewPassword)) {
                ParseRequest.changePassword(newPassword, this);
            } else {
                Toast.makeText(mContext, "New password and re-password incorrect", Toast.LENGTH_SHORT).show();
            }
        }
    }

    @Override
    public void onChangePasswordSuccess(ParseUser user) {
        Toast.makeText(mContext, "Change password success", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onChangePasswordError(String message) {
        Toast.makeText(mContext, message, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onLogoutSuccess() {

    }

    @Override
    public void onLogoutError(String message) {
        Toast.makeText(mContext, message, Toast.LENGTH_SHORT).show();
    }
}
