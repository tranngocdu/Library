package com.horical.library.adapters;

import android.app.Activity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.horical.library.R;
import com.horical.library.dto.Book;

import java.util.ArrayList;
import java.util.Vector;

/**
 * Created by Van An on 8/28/2015.
 */
public class BookDetailNameUserAdapter extends BaseAdapter {
    Activity activity;
    private Vector<Book> books;
    public static ArrayList<Integer> arrayName;

    public BookDetailNameUserAdapter(Activity activity, Vector<Book> books) {
        this.activity = activity;
        this.books = books;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder viewHolder;
        if (convertView == null) {
            LayoutInflater inflater = activity.getLayoutInflater();
            convertView = inflater.inflate(R.layout.custom_listview_book_detail, null);
            viewHolder = new ViewHolder();
            viewHolder.tvName = (TextView) convertView.findViewById(R.id.tvBookName);
            viewHolder.tvHeader = (TextView) convertView.findViewById(R.id.tvHeader);
            viewHolder.llName = (LinearLayout) convertView.findViewById(R.id.llBookName);
            viewHolder.llHeader = (LinearLayout) convertView.findViewById(R.id.llHeader);
            convertView.setTag(viewHolder);
        } else {
            viewHolder = (ViewHolder) convertView.getTag();
        }
        if (position < books.size()) {
            final Book subsidies = books.get(position);
            if (subsidies != null && (subsidies.getName().length() == 1)) {
                viewHolder.llName.setVisibility(View.GONE);
                viewHolder.llHeader.setVisibility(View.VISIBLE);
                viewHolder.tvHeader.setText(subsidies.getName());
            } else {
                viewHolder.llHeader.setVisibility(View.GONE);
                viewHolder.llName.setVisibility(View.VISIBLE);
                viewHolder.tvName.setText(subsidies.getName());
            }
        }
        return convertView;
    }

    @Override
    public int getCount() {
        return books.size();
    }

    @Override
    public Object getItem(int position) {
        return books.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    private class ViewHolder {
        TextView tvName, tvHeader;
        LinearLayout llName, llHeader;
    }
}
