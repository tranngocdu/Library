package com.horical.library.adapters;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.TextView;

import com.horical.library.R;
import com.horical.library.connection.ParseRequest;
import com.horical.library.dto.Student;

/**
 * Created by trandu on 01/09/2015.
 */
public class ItemStudent extends Item implements View.OnClickListener {

    public Student mStudent;

    public ItemStudent(Student student) {
        mStudent = student;
    }

    @Override
    public View getView(LayoutInflater inflater, View convertView) {
        ViewHolder holder;
        if (convertView == null) {
            holder = new ViewHolder();
            convertView = inflater.inflate(R.layout.simple_list_item_student, null);
            holder.tvStudentName = (TextView) convertView.findViewById(R.id.tvStudentName);
            holder.tvDeleteStudent = (TextView) convertView.findViewById(R.id.tvDeleteStudent);
            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }
        holder.tvStudentName.setText(mStudent.getName());
        holder.tvDeleteStudent.setOnClickListener(this);
        return convertView;
    }

    @Override
    public int getViewType() {
        return ItemType.ITEM_STUDENT.ordinal();
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.tvDeleteStudent:
                Log.e("TAG", "onClick : delete");
                mStudent.deleteInBackground();
                break;
        }
    }

    class ViewHolder {
        TextView tvStudentName;
        TextView tvDeleteStudent;
    }

}
