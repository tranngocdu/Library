package com.horical.library.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.widget.TextView;

import com.horical.library.R;

/**
 * Created by trandu on 30/08/2015.
 */
public class ItemHeader extends Item {

    public int mIndex;
    private String mText;

    public ItemHeader(int index, String text) {
        this.mIndex = index;
        this.mText = text;
    }

    @Override
    public View getView(LayoutInflater inflater, View convertView) {

        ViewHolder viewHolder;
        if (convertView == null) {
            viewHolder = new ViewHolder();
            convertView = inflater.inflate(R.layout.simple_list_item_header, null);
            viewHolder.tvHeader = (TextView) convertView.findViewById(R.id.tvHeader);
            convertView.setTag(viewHolder);
        } else {
            viewHolder = (ViewHolder) convertView.getTag();
        }
        viewHolder.tvHeader.setText(mText);

        return convertView;
    }

    @Override
    public int getViewType() {
        return ItemType.ITEM_HEADER.ordinal();
    }

    class ViewHolder {
        TextView tvHeader;
    }

}
