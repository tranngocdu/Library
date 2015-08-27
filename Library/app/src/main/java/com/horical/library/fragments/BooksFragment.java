package com.horical.library.fragments;

import android.app.Activity;
import android.os.Bundle;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

import com.horical.library.R;
import com.horical.library.base.BaseFragment;
import com.horical.library.listenner.MainListenner;

/**
 * Created by trandu on 24/08/2015.
 */
public class BooksFragment extends BaseFragment implements View.OnClickListener
{
    TextView mTvAddBooks;


    RadioButton mRbtAllBooks, mRbtAvailable, mRbtCheckedOut;
    EditText mEdtSearch;

    public static BooksFragment newInstances()
    {
        return new BooksFragment();
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
        View v = inflater.inflate(R.layout.fragment_books, container, false);
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

    @Override
    protected void initView(View view)
    {
        mRbtAllBooks = (RadioButton) view.findViewById(R.id.rbtAllBooks);
        mRbtAvailable = (RadioButton) view.findViewById(R.id.rbtAvailable);
        mRbtCheckedOut = (RadioButton) view.findViewById(R.id.rbtCheckedOut);
        mTvAddBooks = (TextView) view.findViewById(R.id.tvAddBooks);
        mEdtSearch = (EditText) view.findViewById(R.id.edtSearch);
    }

    @Override
    protected void initListener(View view)
    {
        mRbtCheckedOut.setOnClickListener(this);
        mRbtAvailable.setOnClickListener(this);
        mRbtAllBooks.setOnClickListener(this);
        mTvAddBooks.setOnClickListener(this);
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
            case R.id.rbtCheckedOut:
                Toast.makeText(getActivity(), "rbtCheckedOut", Toast.LENGTH_SHORT).show();
                break;
            case R.id.rbtAvailable:
                Toast.makeText(getActivity(), "rbtAvailable", Toast.LENGTH_SHORT).show();
                break;
            case R.id.rbtAllBooks:
                Toast.makeText(getActivity(), "rbtAllBooks", Toast.LENGTH_SHORT).show();
                break;
            case R.id.tvAddBooks:
                Toast.makeText(getActivity(), "tvAddBooks", Toast.LENGTH_SHORT).show();
                mMainListenner.attachAddBookFragment();
                break;
            default:
                break;
        }
    }
}
