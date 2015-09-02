package com.horical.library.fragments;

import android.app.Activity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;

import com.horical.library.R;
import com.horical.library.bases.BaseFragment;

/**
 * Created by Diem Huong on 8/27/2015.
 */
public class AddBookFragment extends BaseFragment implements View.OnClickListener {

    private static AddBookFragment INSTANCE;
    private Button btnAddBook, btnAddPhoto;
    private ImageButton ibtnBack;
    private EditText edtBookTitle, edtBookAuthor, edtBookISBM, edtBookNumber;

    public static AddBookFragment newInstances() {
        if (INSTANCE == null) {
            INSTANCE = new AddBookFragment();
        }
        return INSTANCE;
    }

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_add_book, container, false);
        return view;
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
    }

    private void initDatas() {

    }

    @Override
    protected void initView(View view) {
        ibtnBack = (ImageButton) view.findViewById(R.id.ibtnBack);
        btnAddBook = (Button) view.findViewById(R.id.btnAddBook);
        btnAddPhoto = (Button) view.findViewById(R.id.btnAddPhoto);
        edtBookAuthor = (EditText) view.findViewById(R.id.edtBookAuthor);
        edtBookISBM = (EditText) view.findViewById(R.id.edtBookISBM);
        edtBookNumber = (EditText) view.findViewById(R.id.edtBookNumber);
    }

    @Override
    protected void initListener(View view) {
        btnAddPhoto.setOnClickListener(this);
        btnAddBook.setOnClickListener(this);
        ibtnBack.setOnClickListener(this);
    }

    @Override
    protected void initData() {

    }

    @Override
    protected void clearCached() {

    }

    @Override
    protected boolean hasFooterLayout() {
        return false;
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnAddBook:
                break;
            case R.id.btnAddPhoto:
                break;
            case R.id.ibtnBack:
                break;
            default:
                break;
        }
    }
}
