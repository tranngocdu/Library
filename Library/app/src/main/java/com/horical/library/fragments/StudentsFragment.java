package com.horical.library.fragments;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.horical.library.R;
import com.horical.library.adapters.Item;
import com.horical.library.adapters.ItemStudent;
import com.horical.library.adapters.StudentAdapter;
import com.horical.library.bases.BaseFragmentHasList;
import com.horical.library.connection.ParseRequest;
import com.horical.library.connection.callback.GetAllStudentCallback;
import com.horical.library.connection.callback.StudentCallback;
import com.horical.library.dto.Student;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by trandu on 24/08/2015.
 */

public class StudentsFragment extends BaseFragmentHasList implements View.OnClickListener, GetAllStudentCallback, StudentCallback
{

    public static final String TAG = StudentsFragment.class.getSimpleName();

    private static StudentsFragment INSTANCE;
    private TextView mTvAdd;
    private ListView mLvAllStudent;
    private StudentAdapter mStudentAdapter;
    private ArrayList<Item> mStudentList;


    public static StudentsFragment newInstances()
    {
        if (INSTANCE == null)
        {
            INSTANCE = new StudentsFragment();
        }
        return INSTANCE;
    }

    public StudentsFragment()
    {
        try
        {
            mStudentList = new ArrayList<Item>();
        } catch (Exception e)
        {
            e.printStackTrace();
        }
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
        View v = inflater.inflate(R.layout.fragment_students, container, false);
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
        super.initView(view);
        mTvAdd = (TextView) view.findViewById(R.id.tvAdd);
        mLvAllStudent = (ListView) view.findViewById(R.id.lvAllStudents);
    }

    @Override
    protected void initListener(View view)
    {
        super.initListener(view);
        mTvAdd.setOnClickListener(this);
        mLvSideBar.setOnItemClickListener(new AdapterView.OnItemClickListener()
        {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id)
            {
                if (mStudentAdapter.index[position] != -1)
                {
                    mLvAllStudent.smoothScrollToPositionFromTop(mStudentAdapter.index[position] - 1, 0);
                }
            }
        });
    }

    @Override
    protected void initData()
    {
        super.initData();
        try
        {
            ParseRequest.getAllStudent(mUserId, this);
        } catch (Exception ex)
        {
            ex.printStackTrace();
        }
    }

    @Override
    protected void clearCached()
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
            case R.id.tvAdd:
                mMainActivityListener.attachAddStudentFragment();
                break;
        }
    }

    @Override
    public void onGetStudentSuccess(List<Student> studentList)
    {
        ArrayList arrayList = new ArrayList();
        for (int i = 0; i < studentList.size(); i++)
        {
            arrayList.add(new ItemStudent(studentList.get(i), this, mContext));
        }
        mStudentList.clear();
        mStudentList.addAll(arrayList);
        mStudentAdapter = new StudentAdapter(mContext, mStudentList);
        mLvAllStudent.setAdapter(mStudentAdapter);
        try
        {
            //mStudentAdapter.notifyDataSetChanged();
        } catch (Exception e)
        {
            e.printStackTrace();
        }
    }

    @Override
    public void onGetStudentError(String message)
    {
        Toast.makeText(mContext, message, Toast.LENGTH_SHORT).show();
    }

    public void showDialog(String title, String message, String positiveButton, String negativeButton, String neutralButton)
    {
        AlertDialog.Builder builder = new AlertDialog.Builder(mContext);
        builder.setTitle(title);
        builder.setMessage(message);
        builder.setPositiveButton(positiveButton, new DialogInterface.OnClickListener()
        {
            @Override
            public void onClick(DialogInterface dialog, int which)
            {

            }
        });
        builder.setNegativeButton(negativeButton, new DialogInterface.OnClickListener()
        {
            @Override
            public void onClick(DialogInterface dialog, int which)
            {

            }
        });
        builder.setNeutralButton(neutralButton, new DialogInterface.OnClickListener()
        {
            @Override
            public void onClick(DialogInterface dialog, int which)
            {

            }
        });
        builder.show();
    }

    @Override
    public void deleteAStudent(int pos)
    {
        mStudentList.remove(pos);
        mStudentAdapter.notifyDataSetChanged();
    }
}
