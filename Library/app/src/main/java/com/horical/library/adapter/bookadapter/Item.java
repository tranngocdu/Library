package com.horical.library.adapter.bookadapter;

import android.view.LayoutInflater;
import android.view.View;

/**
 * Created by trandu on 30/08/2015.
 */
public interface Item {

    enum ItemType {
        ITEM_HEADER, ITEM_BODY;
    }

    View getView(LayoutInflater inflater, View convertView);

    int getViewType();
}
