package com.horical.library.adapters;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.TextView;

import com.horical.library.R;
import com.horical.library.connection.callback.StudentCallback;
import com.horical.library.dto.Student;

/**
 * Created by trandu on 01/09/2015.
 */
public class ItemStudent extends Item implements View.OnClickListener
{
    private Context mContext;

    private StudentCallback mStudentCallback;

    private int pos;

    public Student mStudent;

    public ItemStudent(Student student, StudentCallback studentCallback, Context context)
    {
        this.mContext = context;
        this.mStudent = student;
        this.mStudentCallback = studentCallback;
    }

    @Override
    public View getView(LayoutInflater inflater, View convertView, int pos)
    {
        this.pos = pos;
        ViewHolder holder;
        if (convertView == null)
        {
            holder = new ViewHolder();
            convertView = inflater.inflate(R.layout.simple_list_item_student, null);
            holder.tvStudentName = (TextView) convertView.findViewById(R.id.tvStudentName);
            holder.tvDeleteStudent = (TextView) convertView.findViewById(R.id.tvDeleteStudent);
            convertView.setTag(holder);
        } else
        {
            holder = (ViewHolder) convertView.getTag();
        }
        holder.tvStudentName.setText(mStudent.getName());
        holder.tvDeleteStudent.setOnClickListener(this);
        return convertView;
    }

    public void showDialog(String title, String message, String positiveButton, String neutralButton)
    {
        AlertDialog.Builder builder = new AlertDialog.Builder(mContext);
        builder.setTitle(title);
        builder.setMessage(message);
        builder.setPositiveButton(positiveButton, new DialogInterface.OnClickListener()
        {
            @Override
            public void onClick(DialogInterface dialog, int which)
            {
                mStudentCallback.deleteAStudent(pos);
                mStudent.deleteInBackground();
            }
        });
        builder.setNeutralButton(neutralButton, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {

            }
        });
        builder.show();
    }


    @Override
    public int getViewType()
    {
        return ItemType.ITEM_STUDENT.ordinal();
    }

    @Override
    public void onClick(View v)
    {
        switch (v.getId())
        {
            case R.id.tvDeleteStudent:
                showDialog("Delete", "Do you want delete this student", "Yes", "Cancel");
                break;
        }
    }

    class ViewHolder
    {
        TextView tvStudentName;
        TextView tvDeleteStudent;
    }

}
