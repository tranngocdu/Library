package com.horical.library.adapter.bookadapter;

import android.view.LayoutInflater;
import android.view.View;

/**
 * Created by trandu on 30/08/2015.
 */
public abstract class Item {

    public enum ItemType {
        ITEM_HEADER, ITEM_BODY;
    }

    public abstract View getView(LayoutInflater inflater, View convertView);

    public abstract int getViewType();
}
