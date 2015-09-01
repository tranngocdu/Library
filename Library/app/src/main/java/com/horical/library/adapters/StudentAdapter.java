package com.horical.library.adapters;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;

import com.horical.library.bases.BaseCustomAdapter;

import java.util.ArrayList;

/**
 * Created by trandu on 01/09/2015.
 */
public class StudentAdapter extends BaseCustomAdapter {

    private Context mContext;
    private ArrayList<Item> mArrayList;

    public StudentAdapter(Context context, ArrayList<Item> arrayList) {
        super(context, arrayList);
        this.mContext = context;
        this.mArrayList = arrayList;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        return super.getView(position, convertView, parent);
    }

}
