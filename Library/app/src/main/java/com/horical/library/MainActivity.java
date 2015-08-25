package com.horical.library;

import android.app.Fragment;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;

import com.horical.library.base.BaseFragmentActivity;
import com.horical.library.fragments.BooksFragment;
import com.horical.library.fragments.HomeFragment;
import com.horical.library.fragments.StudentsFragment;

public class MainActivity extends BaseFragmentActivity implements View.OnClickListener
{
    private ImageButton mRdbHome, mRdbBooks, mRdbStudents, mRdbSettings;
    private TextView mTvHome, mTvBooks, mTvStudents, mTvSettings;

    private AppConstants.TAB_TYPE mCurrentTab = AppConstants.TAB_TYPE.TAB_HOME;

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
        mRdbHome = (ImageButton) findViewById(R.id.btnHome);
        mRdbHome.setOnClickListener(this);
        mTvHome = (TextView) findViewById(R.id.tvHome);

        mRdbBooks = (ImageButton) findViewById(R.id.btnBooks);
        mRdbBooks.setOnClickListener(this);
        mTvBooks = (TextView) findViewById(R.id.tvBooks);

        mRdbStudents = (ImageButton) findViewById(R.id.btnStudents);
        mRdbStudents.setOnClickListener(this);
        mTvStudents = (TextView) findViewById(R.id.tvStudents);

        mRdbSettings = (ImageButton) findViewById(R.id.btnSettings);
        mRdbSettings.setOnClickListener(this);
        mTvSettings = (TextView) findViewById(R.id.tvSettings);
    }

    @Override
    public void onClick(View v)
    {
        switch (v.getId())
        {
            case R.id.btnHome:
                if (mCurrentTab != AppConstants.TAB_TYPE.TAB_HOME)
                {
                    HomeFragment homeFragment = HomeFragment.newInstance();
                    showFragmentWithClearStack(homeFragment);
                    mCurrentTab = AppConstants.TAB_TYPE.TAB_HOME;
                }
                break;
            case R.id.btnBooks:
                if (mCurrentTab != AppConstants.TAB_TYPE.TAB_BOOKS)
                {
                    BooksFragment booksFragment = BooksFragment.newInstances();
                    showFragmentWithClearStack(booksFragment);
                    mCurrentTab = AppConstants.TAB_TYPE.TAB_BOOKS;
                }
                break;
            case R.id.btnStudents:
                if (mCurrentTab != AppConstants.TAB_TYPE.TAB_STUDENTS)
                {
                    StudentsFragment studentsFragment = StudentsFragment.newInstances();
                    showFragmentWithClearStack(studentsFragment);
                    mCurrentTab = AppConstants.TAB_TYPE.TAB_STUDENTS;
                }
                break;
        }
    }
}
