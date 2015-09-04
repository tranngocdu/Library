package com.horical.library.bases;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;

import com.horical.library.adapters.Item;
import com.horical.library.adapters.ItemBook;
import com.horical.library.adapters.ItemHeader;
import com.horical.library.adapters.ItemStudent;

import java.util.ArrayList;

/**
 * Created by trandu on 31/08/2015.
 */
public class BaseCustomAdapter extends BaseAdapter {

    private Context mContext;
    private ArrayList<Item> mArrayList;

    public static String[] alphabet = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"};
    public int[] index = new int[alphabet.length];


    public BaseCustomAdapter(Context context, ArrayList<Item> arrayList) {
        mContext = context;
        mArrayList = arrayList;
        mArrayList = sortAlphabet(mArrayList);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        return getItem(position).getView(LayoutInflater.from(mContext), convertView, position);
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
        return mArrayList.get(position);
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
            Item item = arrayList.get(i);
            String name = null;
            if (item instanceof ItemBook) {
                name = ((ItemBook) item).mBook.getTitle();
            } else if (item instanceof ItemStudent) {
                name = ((ItemStudent) item).mStudent.getName();
            }
            String firstChar = null;
            if (name != null) {
                firstChar = name.substring(0, 1);
            }
            for (int j = 0; j < alphabet.length; j++) {
                if (arrayLists[j] == null) {
                    arrayLists[j] = new ArrayList();
                    index[j] = -1;
                }
                if (alphabet[j].equalsIgnoreCase(firstChar)) {
                    arrayLists[j].add(arrayList.get(i));
                }
            }
        }

        for (int i = 0; i < arrayLists.length; i++) {
            if (arrayLists[i] != null) {
                if (arrayLists[i].size() > 0) {
                    result.add(new ItemHeader(result.size(), alphabet[i]));
                    index[i] = result.size();
                    result.addAll(arrayLists[i]);
                }
            }
        }
        return result;
    }

    public ArrayList getAllItem() {
        return this.mArrayList;
    }

}
