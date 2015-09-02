package com.horical.library.fragments;

import android.app.Activity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

import com.horical.library.R;
import com.horical.library.adapters.BookAdapter;
import com.horical.library.adapters.ItemBook;
import com.horical.library.bases.BaseFragmentHasList;
import com.horical.library.dto.Book;

import java.util.ArrayList;

/**
 * Created by trandu on 24/08/2015.
 */
public class BooksFragment extends BaseFragmentHasList implements View.OnClickListener, AdapterView.OnItemClickListener {

    private static BooksFragment INSTANCE;
    private TextView mTvAddBooks;
    private RadioButton mRbtAllBooks, mRbtAvailable, mRbtCheckedOut;
    private EditText mEdtSearch;
    private ListView mLvAllBook;
    private BookAdapter mBookAdapter;


    public static BooksFragment newInstances() {
        if (INSTANCE == null) {
            INSTANCE = new BooksFragment();
        }
        return INSTANCE;
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
        View v = inflater.inflate(R.layout.fragment_books, container, false);
        return v;
    }

    @Override
    public void onViewCreated(View view, Bundle bundle) {
        super.onViewCreated(view, bundle);
    }

    @Override
    protected void initView(View view) {
        super.initView(view);
        mRbtAllBooks = (RadioButton) view.findViewById(R.id.rbtAllBooks);
        mRbtAvailable = (RadioButton) view.findViewById(R.id.rbtAvailable);
        mRbtCheckedOut = (RadioButton) view.findViewById(R.id.rbtCheckedOut);
        mTvAddBooks = (TextView) view.findViewById(R.id.tvAddBooks);
        mEdtSearch = (EditText) view.findViewById(R.id.edtSearch);
        mLvAllBook = (ListView) view.findViewById(R.id.lvAllBooks);
    }

    @Override
    protected void initListener(View view) {
        super.initListener(view);
        mRbtCheckedOut.setOnClickListener(this);
        mRbtAvailable.setOnClickListener(this);
        mRbtAllBooks.setOnClickListener(this);
        mTvAddBooks.setOnClickListener(this);

        mLvAllBook.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView parent, View view, int position, long id) {
            }
        });
        mLvSideBar.setOnItemClickListener(this);
    }

    @Override
    protected void initData() {
        super.initData();
        ArrayList arrayList = new ArrayList();
        arrayList.add(new ItemBook(new Book("abc", "def", "100")));
        arrayList.add(new ItemBook(new Book("ghi", "ihg", "200")));
        mBookAdapter = new BookAdapter(mContext, arrayList);
        mLvAllBook.setAdapter(mBookAdapter);
    }

    @Override
    protected void clearCached() {

    }

    @Override
    protected boolean hasFooterLayout() {
        return true;
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        if (mBookAdapter.index[position] != -1) {
            mLvAllBook.smoothScrollToPositionFromTop(mBookAdapter.index[position] - 1, 0);
        }
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
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
                mMainActivityListener.attachAddBookFragment();
                break;
            default:
                break;
        }
    }


}
