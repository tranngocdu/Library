package com.horical.library.fragments;

import android.app.Activity;
import android.app.Fragment;
import android.os.Bundle;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import com.horical.library.R;
import com.horical.library.base.BaseFragment;

/**
 * Created by trandu on 24/08/2015.
 */
public class HomeFragment extends BaseFragment implements View.OnClickListener
{
    private Button mBtnCheckOut, mBtnCheckIn;

    public HomeFragment()
    {

    }

    public static HomeFragment newInstance()
    {
        return new HomeFragment();
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
        View v = inflater.inflate(R.layout.fragment_home, container, false);
        return v;
    }

    @Override
    public void onViewCreated(View view, Bundle bundle)
    {
        super.onViewCreated(view, bundle);
        initDatas();
        initView(view);
        initListener(view);
    }

    private void initView(View view)
    {
        mBtnCheckIn = (Button) view.findViewById(R.id.btnCheckIn);
        mBtnCheckOut = (Button) view.findViewById(R.id.btnCheckOut);
    }

    private void initDatas()
    {

    }

    private void initListener(View view)
    {
        mBtnCheckIn.setOnClickListener(this);
        mBtnCheckOut.setOnClickListener(this);
    }

    @Override
    public void onClick(View v)
    {
        switch (v.getId())
        {
            case R.id.btnCheckIn:
                Toast.makeText(getActivity(), "Check in", Toast.LENGTH_SHORT).show();
                break;
            case R.id.btnCheckOut:
                Toast.makeText(getActivity(), "Check out", Toast.LENGTH_SHORT).show();
                break;
            default:
                break;
        }
    }
}
