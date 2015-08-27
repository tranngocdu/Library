package com.horical.library.base;

import android.app.Activity;
import android.app.Fragment;
import android.content.Context;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

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
    public void onViewCreated(View view, Bundle savedInstanceState)
    {
        super.onViewCreated(view, savedInstanceState);
        initView(view);
        initListener(view);
        initData();
        if (hasFooterLayout())
        {
            mMainListenner.showFooterLayout();
        } else
        {
            mMainListenner.hideFooterLayout();
        }
    }


    abstract protected void initView(View view);

    abstract protected void initListener(View view);

    abstract protected void initData();

    abstract protected boolean hasFooterLayout();

    @Override
    public void onDetach()
    {
        super.onDetach();
        Toast.makeText(getActivity(), "detach", Toast.LENGTH_LONG).show();
        if (!hasFooterLayout())
        {
            mMainListenner.showFooterLayout();
        } else
        {
            mMainListenner.hideFooterLayout();
        }
        mMainListenner = null;
    }
}
