package com.horical.library.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.horical.library.R;
import com.horical.library.dto.NewBook;

/**
 * Created by trandu on 30/08/2015.
 */
public class ItemBook extends Item {


    public NewBook mBook;

    public ItemBook(NewBook book) {
        this.mBook = book;
    }

    @Override
    public View getView(LayoutInflater inflater, View convertView) {

        ViewHolder viewHolder;
        if (convertView == null) {
            viewHolder = new ViewHolder();
            convertView = inflater.inflate(R.layout.simple_list_item_book, null);
            viewHolder.tvName = (TextView) convertView.findViewById(R.id.tvBookName);
            viewHolder.tvAuthor = (TextView) convertView.findViewById(R.id.tvBookAuthor);
            viewHolder.tvAvailable = (TextView) convertView.findViewById(R.id.tvBookAvailable);
            convertView.setTag(viewHolder);
        } else {
            viewHolder = (ViewHolder) convertView.getTag();
        }

        viewHolder.tvName.setText(mBook.getTitle());
        viewHolder.tvAuthor.setText(mBook.getAuthor());
        viewHolder.tvAvailable.setText(mBook.getQuantityAvailable() + " available");

        return convertView;
    }

    @Override
    public int getViewType() {
        return ItemType.ITEM_BOOK.ordinal();
    }

    class ViewHolder {
        ImageView imgBookThumbnail;
        TextView tvName, tvAuthor, tvAvailable;
    }

}
