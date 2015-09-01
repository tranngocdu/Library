package com.horical.library.adapters;

import android.view.LayoutInflater;
import android.view.View;

/**
 * Created by trandu on 30/08/2015.
 */
public abstract class Item {

    public enum ItemType {
        ITEM_HEADER, ITEM_BOOK, ITEM_STUDENT;
    }

    public abstract View getView(LayoutInflater inflater, View convertView);

    public abstract int getViewType();
}
