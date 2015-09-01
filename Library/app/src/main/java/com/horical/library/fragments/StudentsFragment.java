package com.horical.library.fragments;

import android.app.Activity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.TextView;

import com.horical.library.R;
import com.horical.library.adapters.ItemStudent;
import com.horical.library.adapters.StudentAdapter;
import com.horical.library.bases.BaseFragmentHasList;
import com.horical.library.dto.Student;

import java.util.ArrayList;

/**
 * Created by trandu on 24/08/2015.
 */

public class StudentsFragment extends BaseFragmentHasList implements View.OnClickListener {

    private TextView mTvAdd;
    private ListView mLvAllStudent;
    private StudentAdapter mStudentAdapter;


    public static StudentsFragment newInstances() {
        return new StudentsFragment();
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
        View v = inflater.inflate(R.layout.fragment_students, container, false);
        return v;
    }

    @Override
    public void onViewCreated(View view, Bundle bundle) {
        super.onViewCreated(view, bundle);
    }

    @Override
    protected void initView(View view) {
        super.initView(view);
        mTvAdd = (TextView) view.findViewById(R.id.tvAdd);
        mLvAllStudent = (ListView) view.findViewById(R.id.lvAllStudents);
    }

    @Override
    protected void initListener(View view) {
        super.initListener(view);
        mTvAdd.setOnClickListener(this);
        mLvSideBar.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                if (mStudentAdapter.index[position] != -1) {
                    mLvAllStudent.smoothScrollToPositionFromTop(mStudentAdapter.index[position] - 1, 0);
                }
            }
        });
    }

    @Override
    protected void initData() {
        super.initData();
        try {
            ArrayList arrayList = new ArrayList();
            arrayList.add(new ItemStudent(new Student()));
            mStudentAdapter = new StudentAdapter(mContext, arrayList);
            mLvAllStudent.setAdapter(mStudentAdapter);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Override
    protected boolean hasFooterLayout() {
        return true;
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.tvAdd:
                mMainActivityListener.attachAddStudentFragment();
                break;
        }
    }
}
