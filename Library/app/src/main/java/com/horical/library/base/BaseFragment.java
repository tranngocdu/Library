package com.horical.library.base;

import android.app.Activity;
import android.app.Fragment;
import android.content.Context;
import android.os.Bundle;

import com.horical.library.listenner.MainListenner;

/**
 * Created by Diem Huong on 8/25/2015.
 */
abstract public class BaseFragment extends Fragment
{
    protected Context mContext;
    protected MainListenner mMainListenner;

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        mContext = getActivity();
    }

    @Override
    public void onAttach(Activity activity)
    {
        super.onAttach(activity);
        try
        {
            mMainListenner = (MainListenner) activity;
        } catch (ClassCastException e)
        {
            throw new ClassCastException(activity.toString() + " must implement MainListener");
        }
    }

    @Override
    public void onDetach()
    {
        super.onDetach();
        mMainListenner = null;
    }
}
