package com.horical.library.fragments;

import android.app.Activity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.horical.library.R;
import com.horical.library.bases.BaseFragment;
import com.horical.library.connection.ParseRequest;
import com.horical.library.connection.callback.AddStudentCallback;

/**
 * Created by trandu on 02/09/2015.
 */
public class AddStudentFragment extends BaseFragment implements View.OnClickListener, AddStudentCallback
{

    private static AddStudentFragment INSTANCE;
    private EditText mEdtNameStudent;
    private Button mBtnAddStudent;

    public static AddStudentFragment newInstances()
    {
        if (INSTANCE == null)
        {
            INSTANCE = new AddStudentFragment();
        }
        return INSTANCE;
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
        View view = inflater.inflate(R.layout.fragment_add_student, container, false);
        return view;
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState)
    {
        super.onViewCreated(view, savedInstanceState);
    }

    @Override
    protected void initView(View view)
    {
        mEdtNameStudent = (EditText) view.findViewById(R.id.edtNameStudent);
        mBtnAddStudent = (Button) view.findViewById(R.id.btnAddStudent);
    }

    @Override
    protected void initListener(View view)
    {
        mBtnAddStudent.setOnClickListener(this);
    }

    @Override
    protected void initData()
    {

    }

    @Override
    protected void clearCached()
    {
        mEdtNameStudent.setText("");
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
            case R.id.btnAddStudent:
                addStudent(mEdtNameStudent.getText().toString());
                mMainActivityListener.attachStudentFragment();
                break;
        }
    }

    public void addStudent(String name)
    {
        if (name.equals(""))
        {
            Toast.makeText(mContext, "Student name can\'t empty", Toast.LENGTH_SHORT).show();
        } else
        {
            ParseRequest.addStudent(name, mUserId, this);
        }
    }

    @Override
    public void onAddStudentSuccess()
    {
        Toast.makeText(mContext, "add student success.", Toast.LENGTH_SHORT).show();
        mEdtNameStudent.setText("");
    }

    @Override
    public void onAddStudentError(String message)
    {
        Toast.makeText(mContext, message, Toast.LENGTH_SHORT).show();
    }
}
