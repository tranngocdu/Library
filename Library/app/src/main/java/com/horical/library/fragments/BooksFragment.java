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
import com.horical.library.adapter.bookadapter.BookArrayAdapter;
import com.horical.library.adapter.bookadapter.Item;
import com.horical.library.adapter.bookadapter.ItemBody;
import com.horical.library.adapter.bookadapter.ItemHeader;
import com.horical.library.adapter.bookadapter.SideBarAdapter;
import com.horical.library.base.BaseFragment;
import com.horical.library.dto.Book;

import java.util.ArrayList;

/**
 * Created by trandu on 24/08/2015.
 */
public class BooksFragment extends BaseFragment implements View.OnClickListener, AdapterView.OnItemClickListener
{
    private TextView mTvAddBooks;
    private RadioButton mRbtAllBooks, mRbtAvailable, mRbtCheckedOut;
    private EditText mEdtSearch;
    private ListView mLvAllBook, mLvSideBar;
    private BookArrayAdapter mBookAdapter;
    private SideBarAdapter mSideBarAdapter;

    public String[] alphabet = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"};
    public int[] index = new int[alphabet.length];

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

    @Override
    protected void initView(View view)
    {
        mRbtAllBooks = (RadioButton) view.findViewById(R.id.rbtAllBooks);
        mRbtAvailable = (RadioButton) view.findViewById(R.id.rbtAvailable);
        mRbtCheckedOut = (RadioButton) view.findViewById(R.id.rbtCheckedOut);
        mTvAddBooks = (TextView) view.findViewById(R.id.tvAddBooks);
        mEdtSearch = (EditText) view.findViewById(R.id.edtSearch);
        mLvAllBook = (ListView) view.findViewById(R.id.lvAllBooks);
        mLvSideBar = (ListView) view.findViewById(R.id.lvSideBar);
    }

    @Override
    protected void initListener(View view)
    {
        mRbtCheckedOut.setOnClickListener(this);
        mRbtAvailable.setOnClickListener(this);
        mRbtAllBooks.setOnClickListener(this);
        mTvAddBooks.setOnClickListener(this);
        mLvAllBook.setOnItemClickListener(this);
        mLvSideBar.setOnItemClickListener(this);
    }

    @Override
    protected void initData()
    {
        ArrayList arrayList = new ArrayList();
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
        mLvAllBook.setAdapter(mBookAdapter);
        try
        {
            ArrayList arrayList1 = new ArrayList();
            for (int i = 0; i < alphabet.length; i++)
            {
                arrayList1.add(alphabet[i]);
            }
            mSideBarAdapter = new SideBarAdapter(getActivity(), 0, arrayList1);
            mLvSideBar.setAdapter(mSideBarAdapter);
        } catch (Exception ex)
        {
            ex.printStackTrace();
        }
    }

    @Override
    protected boolean hasFooterLayout()
    {
        return true;
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id)
    {
            if (index[position] != -1)
            {
                mLvAllBook.smoothScrollToPositionFromTop(index[position] - 1, 0);
            }
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
                mMainActivityListener.attachAddBookFragment();
                break;
            default:
                break;
        }
    }

    public ArrayList<Item> sortAlphabet(ArrayList<Item> arrayList)
    {
        ArrayList result = new ArrayList();
        ArrayList[] arrayLists = new ArrayList[alphabet.length];
        for (int i = 0; i < arrayList.size(); i++)
        {
            String bookName = ((ItemBody) arrayList.get(i)).mBook.getName();
            String firstChar = bookName.substring(0, 1);
            for (int j = 0; j < alphabet.length; j++)
            {
                if (arrayLists[j] == null)
                {
                    arrayLists[j] = new ArrayList();
                    index[j] = -1;
                }
                if (alphabet[j].equalsIgnoreCase(firstChar))
                {
                    arrayLists[j].add(arrayList.get(i));
                }
            }
        }
        for (int i = 0; i < arrayLists.length; i++)
        {
            if (arrayLists[i].size() > 0)
            {
                result.add(new ItemHeader(result.size(), alphabet[i]));
                index[i] = result.size();
                result.addAll(arrayLists[i]);
            }
        }
        return result;
    }

}
