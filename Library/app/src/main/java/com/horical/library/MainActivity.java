package com.horical.library;

import android.app.Fragment;
import android.app.FragmentManager;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.view.KeyEvent;
import android.view.View;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.horical.library.bases.BaseFragmentActivity;
import com.horical.library.dto.NewBook;
import com.horical.library.fragments.AddBookFragment;
import com.horical.library.fragments.AddStudentFragment;
import com.horical.library.fragments.BookDetailFragment;
import com.horical.library.fragments.BooksFragment;
import com.horical.library.fragments.HomeFragment;
import com.horical.library.fragments.SettingsFragment;
import com.horical.library.fragments.StudentsFragment;
import com.horical.library.listenners.BackPressListener;
import com.horical.library.listenners.MainActivityListener;

public class MainActivity extends BaseFragmentActivity implements View.OnClickListener, MainActivityListener
{

    private RadioButton mRdbHome, mRdbBooks, mRdbStudents, mRdbSettings;
    private TextView mTvHome, mTvBooks, mTvStudents, mTvSettings;
    private RadioGroup mLayoutFooter;

    private AppConstants.TAB_TYPE mCurrentTab = AppConstants.TAB_TYPE.TAB_NONE;

    @Override
    protected Fragment onCreateMainFragment(Bundle savedInstancesState)
    {
        mCurrentTab = AppConstants.TAB_TYPE.TAB_HOME;
        return HomeFragment.newInstance();
    }

    @Override
    protected int getFragmentContainerId()
    {
        return R.id.layoutContent;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initViews();
    }

    private void initViews()
    {
        mRdbHome = (RadioButton) findViewById(R.id.btnHome);
        mRdbHome.setOnClickListener(this);

        mRdbBooks = (RadioButton) findViewById(R.id.btnBooks);
        mRdbBooks.setOnClickListener(this);

        mRdbStudents = (RadioButton) findViewById(R.id.btnStudents);
        mRdbStudents.setOnClickListener(this);

        mRdbSettings = (RadioButton) findViewById(R.id.btnSettings);
        mRdbSettings.setOnClickListener(this);

        mLayoutFooter = (RadioGroup) findViewById(R.id.layoutFooter);
    }

    private void initListener()
    {

    }

    private void selectFragmentByID(int id)
    {
        switch (id)
        {
            case 0: //TAB_HOME
                HomeFragment homeFragment = HomeFragment.newInstance();
                showFragmentWithClearStack(homeFragment);
                mCurrentTab = AppConstants.TAB_TYPE.TAB_HOME;
                break;
            case 1: //TAB_BOOKS
                BooksFragment booksFragment = BooksFragment.newInstances();
                showFragmentWithClearStack(booksFragment);
                mCurrentTab = AppConstants.TAB_TYPE.TAB_BOOKS;
                break;
            case 2: //TAB_STUDENTS
                StudentsFragment studentsFragment = StudentsFragment.newInstances();
                showFragmentWithClearStack(studentsFragment);
                mCurrentTab = AppConstants.TAB_TYPE.TAB_STUDENTS;
                break;
            case 3: //TAB SETTINGS
                SettingsFragment settingsFragment = SettingsFragment.newInstances();
                showFragmentWithClearStack(settingsFragment);
                mCurrentTab = AppConstants.TAB_TYPE.TAB_SETTINGS;
                break;
        }
    }

    @Override
    public void onClick(View v)
    {
        switch (v.getId())
        {
            case R.id.btnHome:
                if (mCurrentTab != AppConstants.TAB_TYPE.TAB_HOME)
                {
                    selectFragmentByID(0);
                }
                break;
            case R.id.btnBooks:
                if (mCurrentTab != AppConstants.TAB_TYPE.TAB_BOOKS)
                {
                    selectFragmentByID(1);
                }
                break;
            case R.id.btnStudents:
                if (mCurrentTab != AppConstants.TAB_TYPE.TAB_STUDENTS)
                {
                    selectFragmentByID(2);
                }
                break;
            case R.id.btnSettings:
                if (mCurrentTab != AppConstants.TAB_TYPE.TAB_SETTINGS)
                {
                    selectFragmentByID(3);
                }
                break;
            default:
                break;
        }
    }

    private static final long EXIT_INTERVAL = 2000L;
    private long exitTimer = Long.MIN_VALUE;

    @Override
    public boolean dispatchKeyEvent(@NonNull KeyEvent event)
    {
        if (event.getAction() == KeyEvent.ACTION_DOWN && event.getKeyCode() == KeyEvent.KEYCODE_BACK
                && event.getRepeatCount() == 0)
        {
            FragmentManager fm = getFragmentManager();
            if (mFragmentTagStack.size() > 0)
            {
                Fragment f = fm.findFragmentByTag(mFragmentTagStack.peek());
                if (f instanceof BackPressListener)
                {
                    if (((BackPressListener) f).onBackPress())
                    {
                        return true;
                    }
                }
            }

            boolean tryFinish = false;
            if (mFragmentTagStack.size() == 1)
            {
                tryFinish = true;
            }

            if (tryFinish)
            {
                if ((exitTimer + EXIT_INTERVAL) < System.currentTimeMillis())
                {
                    Toast.makeText(this, getString(R.string.confirm_exit), Toast.LENGTH_SHORT).show();
                    exitTimer = System.currentTimeMillis();
                } else
                {
                    finish();
                }
                return true;
            } else
            {
                return super.dispatchKeyEvent(event);
            }
        }
        return super.dispatchKeyEvent(event);
    }

    @Override
    public void createCameraForScan()
    {

    }

    @Override
    public void attachAddBookFragment(NewBook book)
    {
        AddBookFragment addBookFragment = AddBookFragment.newInstances();
        addBookFragment.setBook(book);
        showFragment(addBookFragment);
    }

    @Override
    public void attachBookDetailFragment(NewBook book)
    {
        showFragment(BookDetailFragment.newInstance());
    }

    @Override
    public void attachAddStudentFragment()
    {
        showFragment(AddStudentFragment.newInstances());
    }

    @Override
    public void attachBooksFragment()
    {
        BooksFragment booksFragment = new BooksFragment();
        showFragmentWithClearStack(booksFragment);
    }

    @Override
    public void showFooterLayout()
    {
        mLayoutFooter.setVisibility(View.VISIBLE);
    }

    @Override
    public void hideFooterLayout()
    {
        mLayoutFooter.setVisibility(View.GONE);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data)
    {
        super.onActivityResult(requestCode, resultCode, data);
    }
}
