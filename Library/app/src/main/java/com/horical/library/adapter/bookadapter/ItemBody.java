package com.horical.library.adapter.bookadapter;

import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.horical.library.R;
import com.horical.library.dto.Book;

/**
 * Created by trandu on 30/08/2015.
 */
public class ItemBody extends Item {

    public Book mBook;

    public ItemBody(Book book) {
        this.mBook = book;
    }

    @Override
    public View getView(LayoutInflater inflater, View convertView) {

        ViewHolder viewHolder;
        if (convertView == null) {
            viewHolder = new ViewHolder();
            convertView = inflater.inflate(R.layout.simple_list_item_book_body, null);
            viewHolder.tvName = (TextView) convertView.findViewById(R.id.tvBookName);
            viewHolder.tvAuthor = (TextView) convertView.findViewById(R.id.tvBookAuthor);
            viewHolder.tvAvailable = (TextView) convertView.findViewById(R.id.tvBookAvailable);
            convertView.setTag(viewHolder);
        } else {
            viewHolder = (ViewHolder) convertView.getTag();
        }

        viewHolder.tvName.setText(mBook.getName());
        viewHolder.tvAuthor.setText(mBook.getAuthor());
        viewHolder.tvAvailable.setText(mBook.getAvailable() + " available");

        return convertView;
    }

    @Override
    public int getViewType() {
        return ItemType.ITEM_BODY.ordinal();
    }

    class ViewHolder {
        ImageView imgBookThumbnail;
        TextView tvName, tvAuthor, tvAvailable;
    }

}
