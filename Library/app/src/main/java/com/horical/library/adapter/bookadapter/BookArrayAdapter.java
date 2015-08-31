package com.horical.library.adapter.bookadapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;

import java.util.ArrayList;

/**
 * Created by trandu on 30/08/2015.
 */
public class BookArrayAdapter extends BaseAdapter {

    private Context mContext;
    private ArrayList<Item> mArrayList;

    public BookArrayAdapter(Context context, ArrayList<Item> arrayList) {
        this.mContext = context;
        this.mArrayList = arrayList;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        return getItem(position).getView(LayoutInflater.from(mContext), convertView);
    }

    @Override
    public int getCount() {
        return mArrayList.size();
    }

    @Override
    public Item getItem(int position) {
        return mArrayList.get(position);
    }

    @Override
    public int getItemViewType(int position) {
        return getItem(position).getViewType();
    }

    @Override
    public int getViewTypeCount() {
        return Item.ItemType.values().length;
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }
}
