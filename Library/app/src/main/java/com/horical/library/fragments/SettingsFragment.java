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
import com.horical.library.base.BaseFragment;

/**
 * Created by trandu on 24/08/2015.
 */
public class SettingsFragment extends BaseFragment implements View.OnClickListener
{
    private EditText mEdtEmail, mEdtCurrentPassword, mEdtNewPassword, mEdtConfirmNewPassword;
    private Button mBtnUpgrade, mBtnHelpMe, mBtnLogout;

    public static SettingsFragment newInstances()
    {
        return new SettingsFragment();
    }

    @Override
    public void onAttach(Activity activity)
    {
        super.onAttach(activity);
    }

    @Override
    public void onCreate(Bundle bundle)
    {
        super.onCreate(bundle);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle bundle)
    {
        View v = inflater.inflate(R.layout.fragment_settings, container, false);
        return v;
    }

    @Override
    public void onViewCreated(View view, Bundle bundle)
    {
        super.onViewCreated(view, bundle);
    }


    @Override
    protected void initView(View view)
    {
        mEdtCurrentPassword = (EditText) view.findViewById(R.id.edtCurrentPassword);
        mEdtConfirmNewPassword = (EditText) view.findViewById(R.id.edtConfirmNewPassword);
        mEdtEmail = (EditText) view.findViewById(R.id.edtEmail);
        mEdtNewPassword = (EditText) view.findViewById(R.id.edtNewPassword);

        mBtnHelpMe = (Button) view.findViewById(R.id.btnHelpMe);
        mBtnLogout = (Button) view.findViewById(R.id.btnLogout);
        mBtnUpgrade = (Button) view.findViewById(R.id.btnUpgrade);
    }

    @Override
    public void initListener(View view)
    {
        mBtnHelpMe.setOnClickListener(this);
        mBtnLogout.setOnClickListener(this);
        mBtnUpgrade.setOnClickListener(this);
    }

    @Override
    protected void initData()
    {

    }

    @Override
    protected boolean hasFooterLayout()
    {
        return true;
    }

    @Override
    public void onClick(View v)
    {
        switch (v.getId())
        {
            case R.id.btnHelpMe:
                Toast.makeText(getActivity(), "btnHelpMe", Toast.LENGTH_SHORT).show();
                break;
            case R.id.btnLogout:
                Toast.makeText(getActivity(), "btnLogout", Toast.LENGTH_SHORT).show();
                break;
            case R.id.btnUpgrade:
                Toast.makeText(getActivity(), "btnUpgrade", Toast.LENGTH_SHORT).show();
            default:
                break;
        }
    }
}
