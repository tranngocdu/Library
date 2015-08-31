package com.horical.library.base;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;

import com.horical.library.adapter.bookadapter.Item;
import com.horical.library.adapter.bookadapter.ItemBody;
import com.horical.library.adapter.bookadapter.ItemHeader;

import java.util.ArrayList;

/**
 * Created by trandu on 31/08/2015.
 */
public class BaseCustomAdapter extends BaseAdapter {

    private Context mContext;
    private ArrayList<Item> mArrayList;

    public String[] alphabet = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"};


    public BaseCustomAdapter(Context context, ArrayList<Item> arrayList) {
        mContext = context;
        mArrayList = arrayList;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        return null;
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
    public Item getItem(int position) {
        return null;
    }

    @Override
    public int getCount() {
        return mArrayList.size();
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    public ArrayList<Item> sortAlphabet(ArrayList<Item> arrayList) {
        ArrayList result = new ArrayList();
        ArrayList[] arrayLists = new ArrayList[alphabet.length];
        for (int i = 0; i < arrayList.size(); i++) {
            String bookName = ((ItemBody) arrayList.get(i)).mBook.getName();
            String firstChar = bookName.substring(0, 1);
            for (int j = 0; j < alphabet.length; j++) {
                if (arrayLists[j] == null) {
                    arrayLists[j] = new ArrayList();
                }
                if (alphabet[j].equalsIgnoreCase(firstChar)) {
                    arrayLists[j].add(arrayList.get(i));
                }
            }
        }
        for (int i = 0; i < arrayLists.length; i++) {
            if (arrayLists[i].size() > 0) {
                result.add(new ItemHeader(result.size(), alphabet[i]));
                result.addAll(arrayLists[i]);
            }
        }
        return result;
    }

}
