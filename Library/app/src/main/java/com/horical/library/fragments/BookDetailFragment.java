package com.horical.library.fragments;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.ListView;

import com.horical.library.R;
import com.horical.library.adapters.BookDetailNameUserAdapter;
import com.horical.library.bases.BaseFragment;
import com.horical.library.dto.Book;
import com.horical.library.dto.BookDetail;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import static android.R.layout.simple_list_item_1;


public class BookDetailFragment extends BaseFragment implements View.OnClickListener {

    ListView mListView, mListViewIndex;
    BookDetailNameUserAdapter mBookDetailNameUserAdapter;
    ArrayAdapter<String> mIndexAdapter;
    LinearLayout sideIndex;
    String[] mStringIndex;
    List<String> mIndexListName = new ArrayList<>();
    Vector<Book> mBookDetailVector;
    List<Integer> mDealList = new ArrayList<>();
    int mTotalListSize = 0;

    public static BookDetailFragment newInstance() {
        return new BookDetailFragment();
    }

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_book_detail, container, false);
        return view;
    }

    public void setStringIndex() {
        mStringIndex = new String[]{"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "T", "U", "V", "X", "Y", "Z"};
    }

    private Vector<Book> getIndexedBooks(Vector<Book> booksVector) {
        Vector<Book> v = new Vector<>();
        String idx1;
        String idx2 = null;
        for (int i = 0; i < booksVector.size(); i++) {
            Book temp = booksVector.elementAt(i);
            idx1 = (temp.getName().substring(0, 1)).toLowerCase();
            if (!idx1.equalsIgnoreCase(idx2)) {
                v.add(new Book(idx1.toUpperCase(), "", "", "", ""));
                idx2 = idx1;
                mIndexListName.add(idx1.toLowerCase().toString());
                mDealList.add(i);
            }
            v.add(temp);
        }
        return v;
    }

    public int getPosition(String s, List<String> strings) {
        int pos = 0;
        for (int i = 0; i < strings.size(); i++) {
            if (strings.get(i).equals(s)) {
                pos = i;
            }
        }
        return pos;
    }

    public void displayListItem(int itemPosition) {
        int pos = getPosition(mStringIndex[itemPosition].toLowerCase(), mIndexListName);
        int listLocation = mDealList.get(pos);

        if (listLocation > mTotalListSize) {
            listLocation = mTotalListSize;
        }
        mListView.setSelection(listLocation);
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
    }

    @Override
    protected void initView(View view) {
        mListView = (ListView) view.findViewById(R.id.lvBookName);
        mListViewIndex = (ListView) view.findViewById(R.id.lvIndex);
        sideIndex = (LinearLayout) view.findViewById(R.id.llSlideIndex);
    }

    @Override
    protected void initListener(View view) {
        mListViewIndex.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                displayListItem(position);
            }
        });
    }

    @Override
    protected void initData() {
        mBookDetailVector = BookDetail.getBookList();
        Vector subsidiesList = getIndexedBooks(mBookDetailVector);
        mTotalListSize = subsidiesList.size();
        mBookDetailNameUserAdapter = new BookDetailNameUserAdapter(getActivity(), subsidiesList);
        setStringIndex();
        mIndexAdapter = new ArrayAdapter<>(getActivity(), simple_list_item_1, mStringIndex);
        mListView.setAdapter(mBookDetailNameUserAdapter);
        mListViewIndex.setAdapter(mIndexAdapter);
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

    }
}
