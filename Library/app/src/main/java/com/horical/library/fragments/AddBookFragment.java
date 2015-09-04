package com.horical.library.fragments;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.Toast;

import com.horical.library.R;
import com.horical.library.bases.BaseFragment;
import com.horical.library.connection.ParseRequest;
import com.horical.library.connection.callback.AddBookCallback;
import com.horical.library.dto.NewBook;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

import io.filepicker.Filepicker;
import io.filepicker.models.FPFile;

/**
 * Created by Diem Huong on 8/27/2015.
 */
public class AddBookFragment extends BaseFragment implements View.OnClickListener, AddBookCallback
{

    private static AddBookFragment INSTANCE;
    private Button mBtnAddBook, mBtnAddPhoto;
    private ImageButton mBtnBack;
    private ImageView mImvBookThumbnail;
    private EditText mEdtBookTitle, mEdtBookAuthor, mEdtBookISBM, mEdtBookNumber;
    private NewBook book;

    public static AddBookFragment newInstances()
    {
        if (INSTANCE == null)
        {
            INSTANCE = new AddBookFragment();
        }
        return INSTANCE;
    }

    public void setBook(NewBook book)
    {
        this.book = book;
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

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
    {
        View view = inflater.inflate(R.layout.fragment_add_book, container, false);
        return view;
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState)
    {
        super.onViewCreated(view, savedInstanceState);
        if (savedInstanceState != null)
        {
            mEdtBookTitle.setText(savedInstanceState.getCharSequence("title"));
            mEdtBookAuthor.setText(savedInstanceState.getCharSequence("author"));
            mEdtBookISBM.setText(savedInstanceState.getCharSequence("isbn"));
            mEdtBookNumber.setText("1");
        }
    }

    @Override
    protected void initView(View view)
    {
        mBtnBack = (ImageButton) view.findViewById(R.id.ibtnBack);
        mBtnAddBook = (Button) view.findViewById(R.id.btnAddBook);
        mBtnAddPhoto = (Button) view.findViewById(R.id.btnAddPhoto);
        mImvBookThumbnail = (ImageView) view.findViewById(R.id.imvBookThumbnail);
        mEdtBookTitle = (EditText) view.findViewById(R.id.edtBookTitle);
        mEdtBookAuthor = (EditText) view.findViewById(R.id.edtBookAuthor);
        mEdtBookISBM = (EditText) view.findViewById(R.id.edtBookISBM);
        mEdtBookNumber = (EditText) view.findViewById(R.id.edtBookNumber);
    }

    @Override
    protected void initListener(View view)
    {
        mBtnAddPhoto.setOnClickListener(this);
        mBtnAddBook.setOnClickListener(this);
        mBtnBack.setOnClickListener(this);
    }

    @Override
    protected void initData()
    {
        mEdtBookTitle.setText(book.getTitle());
        mEdtBookAuthor.setText(book.getAuthor());
        mEdtBookISBM.setText(book.getISBN());
    }

    @Override
    protected void clearCached()
    {
        mEdtBookTitle.setText("");
        mEdtBookAuthor.setText("");
        mEdtBookISBM.setText("");
        mEdtBookNumber.setText("1");
    }

    @Override
    protected boolean hasFooterLayout()
    {
        return false;
    }

    @Override
    public void onClick(View v)
    {
        switch (v.getId())
        {
            case R.id.btnAddBook:
                addBook();
                break;
            case R.id.btnAddPhoto:
                Filepicker.setKey("AxSWMxslOTdats8w3eJO0z");
                Filepicker.setAppName("Library");
                Intent intent = new Intent(mContext, Filepicker.class);
                startActivityForResult(intent, Filepicker.REQUEST_CODE_GETFILE);
                break;
            case R.id.ibtnBack:

                break;
            default:
                break;
        }
    }

    public void addBook()
    {
        String bookName = mEdtBookTitle.getText().toString();
        String bookAuthor = mEdtBookAuthor.getText().toString();
        String bookISBN = mEdtBookISBM.getText().toString();
        int bookTotal = Integer.parseInt(mEdtBookNumber.getText().toString());
        if (bookName.equals("") || bookAuthor.equals("") || bookISBN.equals("") || bookTotal <= 0)
        {
            Toast.makeText(mContext, "Please insert content, Can't empty", Toast.LENGTH_SHORT).show();
        } else
        {
            book.setUser(mUserId);
            book.setTitle(bookName);
            book.setAuthor(bookAuthor);
            book.setISBN(bookISBN);
            book.setQuantityTotal(bookTotal);
            book.setQuantityAvailable(bookTotal);
            ParseRequest.addBook(book, this);
        }
    }

    @Override
    public void onAddBookSuccess()
    {
        Toast.makeText(mContext, "Add book success.", Toast.LENGTH_SHORT).show();
        mMainActivityListener.attachBooksFragment();
    }

    @Override
    public void onAddBookError(String message)
    {
        Toast.makeText(mContext, message, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data)
    {
        if (requestCode == Filepicker.REQUEST_CODE_GETFILE)
        {
            if (resultCode == Activity.RESULT_OK)
            {
                ArrayList<FPFile> fpFiles = data.getParcelableArrayListExtra(Filepicker.FPFILES_EXTRA);
                final FPFile file = fpFiles.get(0);
                book.setCoverImage(file.getUrl());
                new Thread(new Runnable()
                {
                    @Override
                    public void run()
                    {
                        try
                        {
                            final Bitmap bmp;
                            URL url = new URL(file.getUrl());
                            HttpURLConnection http = (HttpURLConnection) url.openConnection();
                            InputStream is = http.getInputStream();
                            bmp = BitmapFactory.decodeStream(is);
                            mImvBookThumbnail.post(new Runnable()
                            {
                                @Override
                                public void run()
                                {
                                    mImvBookThumbnail.setImageBitmap(bmp);
                                }
                            });
                        } catch (Exception e)
                        {
                            e.printStackTrace();
                        }
                    }
                }).start();
                Toast.makeText(mContext, file.getUrl(), Toast.LENGTH_SHORT).show();
            }
        }
    }

    @Override
    public void onSaveInstanceState(Bundle outState)
    {
        super.onSaveInstanceState(outState);
        Toast.makeText(mContext, "onSaveInstanceState", Toast.LENGTH_SHORT).show();
        outState.putCharSequence("title", mEdtBookTitle.getText().toString());
        outState.putCharSequence("author", mEdtBookAuthor.getText().toString());
        outState.putCharSequence("isbn", mEdtBookISBM.getText().toString());
    }


}
