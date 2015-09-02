package com.horical.library.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.horical.library.R;
import com.horical.library.dto.Book;

/**
 * Created by trandu on 30/08/2015.
 */
<<<<<<< HEAD:Library/app/src/main/java/com/horical/library/adapters/ItemBook.java
public class ItemBook extends Item {
=======
public class ItemBody extends Item {
>>>>>>> 2a689dba6770d15904e82a0ad01cebd8d8d9d850:Library/app/src/main/java/com/horical/library/adapter/bookadapter/ItemBody.java

    public Book mBook;

    public ItemBook(Book book) {
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

        viewHolder.tvName.setText(mBook.getName());
        viewHolder.tvAuthor.setText(mBook.getAuthor());
        viewHolder.tvAvailable.setText(mBook.getAvailable() + " available");

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
