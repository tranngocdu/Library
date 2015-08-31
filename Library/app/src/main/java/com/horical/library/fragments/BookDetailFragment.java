package com.horical.library.fragments;

import android.app.Activity;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.horical.library.R;
import com.horical.library.base.BaseFragment;

/**
 * Created by Van An on 8/28/2015.
 */
public class BookDetailFragment extends BaseFragment implements View.OnClickListener
{

    public static BookDetailFragment newInstance()
    {
        return new BookDetailFragment();
    }

    @Override
    public void onAttach(Activity activity)
    {
        super.onAttach(activity);
    }

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
    {
        View view = inflater.inflate(R.layout.fragment_book_detail, container, false);
        return view;
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState)
    {
        super.onViewCreated(view, savedInstanceState);
    }

    @Override
    protected void initView(View view)
    {

    }

    @Override
    protected void initListener(View view)
    {

    }

    @Override
    protected void initData()
    {

    }

    @Override
    protected boolean hasFooterLayout()
    {
        return false;
    }

    @Override
    public void onClick(View v)
    {

    }
}
