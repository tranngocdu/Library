package com.horical.library.base;

import android.app.Activity;
import android.app.Fragment;
import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.horical.library.LoginActivity;
import com.horical.library.MainActivity;
import com.horical.library.listenner.LoginActivityListener;
import com.horical.library.listenner.MainActivityListener;

/**
 * Created by Diem Huong on 8/25/2015.
 */
abstract public class BaseFragment extends Fragment
{
    protected Context mContext;
    protected MainActivityListener mMainActivityListener;
    protected LoginActivityListener mLoginActivityListener;
    private Activity currentActivity;

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
            currentActivity = getActivity();
            if (currentActivity instanceof MainActivity)
            {
                mMainActivityListener = (MainActivityListener) activity;
            } else if (currentActivity instanceof LoginActivity)
            {
                mLoginActivityListener = (LoginActivityListener) activity;
            }
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
        if (currentActivity instanceof MainActivity)
        {
            if (hasFooterLayout())
            {
                mMainActivityListener.showFooterLayout();
            } else
            {
                mMainActivityListener.hideFooterLayout();
            }
        } else if (currentActivity instanceof LoginActivity)
        {
            // do something
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
        if (currentActivity instanceof MainActivity)
        {
            if (!hasFooterLayout())
            {
                mMainActivityListener.showFooterLayout();
            } else
            {
                mMainActivityListener.hideFooterLayout();
            }
            mMainActivityListener = null;
        } else if (currentActivity instanceof LoginActivity)
        {
            mLoginActivityListener = null;
        }
    }
}
