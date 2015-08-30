package com.horical.library.adapter.bookadapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.horical.library.R;

import java.util.ArrayList;

/**
 * Created by trandu on 31/08/2015.
 */
public class SideBarAdapter extends ArrayAdapter {

    private Context mContext;
    private int mLayoutId;
    private ArrayList mArrayList;

    public SideBarAdapter(Context context, int layoutId, ArrayList arrayList) {
        super(context, layoutId, arrayList);
        mContext = context;
        mLayoutId = layoutId;
        mArrayList = arrayList;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder viewHolder;
        if (convertView == null) {
            viewHolder = new ViewHolder();
            convertView = LayoutInflater.from(mContext).inflate(R.layout.simple_list_item_book_side_bar, null);
            viewHolder.tvSidebar = (TextView) convertView.findViewById(R.id.tvSidebar);
            convertView.setTag(viewHolder);
        } else {
            viewHolder = (ViewHolder) convertView.getTag();
        }
        viewHolder.tvSidebar.setText(mArrayList.get(position) + "");
        return convertView;
    }

    class ViewHolder {
        TextView tvSidebar;
    }

}
