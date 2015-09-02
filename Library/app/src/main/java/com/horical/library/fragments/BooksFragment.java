package com.horical.library.fragments;

import android.app.Activity;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
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

    private TextView mTvAddBooks;
    private RadioButton mRbtAllBooks, mRbtAvailable, mRbtCheckedOut;
    private EditText mEdtSearch;
    private ListView mLvAllBook;
    private BookAdapter mBookAdapter;

    public static BooksFragment newInstances() {
        return new BooksFragment();
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
<<<<<<< HEAD
        mLvSideBar.setOnItemClickListener(this);
=======
        mEdtSearch.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {

            }
        });
>>>>>>> 2a689dba6770d15904e82a0ad01cebd8d8d9d850
    }

    @Override
    protected void initData() {
        super.initData();
        ArrayList arrayList = new ArrayList();
<<<<<<< HEAD
        arrayList.add(new ItemBook(new Book("abc", "def", "100")));
        arrayList.add(new ItemBook(new Book("ghi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("guh", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("goi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("gpi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("gtr", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("gnb", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("gmn", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uit", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uti", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uoi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uio", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("poi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("pji", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("abc", "def", "100")));
        arrayList.add(new ItemBook(new Book("ghi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("guh", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("goi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("gpi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("gtr", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("gnb", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("gmn", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uit", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uti", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uoi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uio", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("poi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("pji", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("abc", "def", "100")));
        arrayList.add(new ItemBook(new Book("ghi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("guh", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("goi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("gpi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("gtr", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("gnb", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("gmn", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uit", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uti", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uoi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uio", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("poi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("pji", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("abc", "def", "100")));
        arrayList.add(new ItemBook(new Book("ghi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("guh", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("goi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("gpi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("gtr", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("gnb", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("gmn", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uit", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uti", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uoi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uio", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("poi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("pji", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("abc", "def", "100")));
        arrayList.add(new ItemBook(new Book("ghi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("guh", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("bbb", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("bnv", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("bkl", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("hui", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("jni", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uit", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("jdk", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("jvm", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("sdk", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("ndk", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("pji", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("abc", "def", "100")));
        arrayList.add(new ItemBook(new Book("ghi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("guh", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("goi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("gpi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("gtr", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("gnb", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("gmn", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uit", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uti", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uoi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("uio", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("poi", "ihg", "200")));
        arrayList.add(new ItemBook(new Book("pji", "ihg", "200")));
        mBookAdapter = new BookAdapter(mContext, arrayList);
=======
        arrayList.add(new ItemBody(new Book("abc", "def", "100")));
        arrayList.add(new ItemBody(new Book("ghi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("guh", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("goi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("gpi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("gtr", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("gnb", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("gmn", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uit", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uti", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uoi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uio", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("poi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("pji", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("abc", "def", "100")));
        arrayList.add(new ItemBody(new Book("ghi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("guh", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("goi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("gpi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("gtr", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("gnb", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("gmn", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uit", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uti", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uoi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uio", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("poi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("pji", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("abc", "def", "100")));
        arrayList.add(new ItemBody(new Book("ghi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("guh", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("goi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("gpi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("gtr", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("gnb", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("gmn", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uit", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uti", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uoi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uio", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("poi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("pji", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("abc", "def", "100")));
        arrayList.add(new ItemBody(new Book("ghi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("guh", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("goi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("gpi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("gtr", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("gnb", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("gmn", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uit", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uti", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uoi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uio", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("poi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("pji", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("abc", "def", "100")));
        arrayList.add(new ItemBody(new Book("ghi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("guh", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("bbb", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("bnv", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("bkl", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("hui", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("jni", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uit", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("jdk", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("jvm", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("sdk", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("ndk", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("pji", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("abc", "def", "100")));
        arrayList.add(new ItemBody(new Book("ghi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("guh", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("goi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("gpi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("gtr", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("gnb", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("gmn", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uit", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uti", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uoi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("uio", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("poi", "ihg", "200")));
        arrayList.add(new ItemBody(new Book("pji", "ihg", "200")));
        arrayList = sortAlphabet(arrayList);
        mBookAdapter = new BookArrayAdapter(getActivity(), arrayList);
>>>>>>> 2a689dba6770d15904e82a0ad01cebd8d8d9d850
        mLvAllBook.setAdapter(mBookAdapter);
    }

    @Override
    protected boolean hasFooterLayout() {
        return true;
    }

<<<<<<< HEAD
    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        if (mBookAdapter.index[position] != -1) {
            mLvAllBook.smoothScrollToPositionFromTop(mBookAdapter.index[position] - 1, 0);
        }
    }

=======
>>>>>>> 2a689dba6770d15904e82a0ad01cebd8d8d9d850
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
