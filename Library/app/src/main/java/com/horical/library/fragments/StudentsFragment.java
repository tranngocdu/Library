package com.horical.library.fragments;

import android.app.Activity;
import android.app.Fragment;
import android.os.Bundle;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.horical.library.R;
import com.horical.library.base.BaseFragment;

/**
 * Created by trandu on 24/08/2015.
 */

public class StudentsFragment extends BaseFragment implements View.OnClickListener
{
    public static StudentsFragment newInstances()
    {
        return new StudentsFragment();
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
        View v = inflater.inflate(R.layout.fragment_students, container, false);
        return v;
    }

    @Override
    public void onViewCreated(View view, Bundle bundle)
    {
        super.onViewCreated(view, bundle);
    }

    private void initDatas()
    {

    }

    private void initView(View view)
    {

    }

    private void initListener(View view)
    {

    }

    @Override
    public void onClick(View v)
    {
        switch (v.getId())
        {

        }
    }
}
