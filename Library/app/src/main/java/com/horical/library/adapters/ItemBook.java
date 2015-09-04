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
    public View getView(LayoutInflater inflater, View convertView, int pos) {

        final ViewHolder viewHolder;
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
        /*new Thread(new Runnable() {
            @Override
            public void run() {
                Bitmap bmp = null;
                URL url = null;
                HttpURLConnection httpURLConnection = null;
                InputStream is = null;
                try {
                    url = new URL(mBook.getCoverImage());
                    httpURLConnection = (HttpURLConnection) url.openConnection();
                    is = httpURLConnection.getInputStream();
                    bmp = BitmapFactory.decodeStream(is);
                    viewHolder.imgBookThumbnail.setImageBitmap(bmp);
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    try {
                        is.close();
                    } catch (Exception e) {
                    }
                }
            }
        }).start();*/
        viewHolder.tvName.setText(mBook.getTitle());
        viewHolder.tvAuthor.setText(mBook.getAuthor());
        viewHolder.tvAvailable.setText(mBook.getQuantityAvailable() + " available");

        return convertView;
    }

    @Override
    public int getViewType() {
        return ItemType.ITEM_BOOK.ordinal();
    }

    public NewBook getBook() {
        return this.mBook;
    }

    class ViewHolder {
        ImageView imgBookThumbnail;
        TextView tvName, tvAuthor, tvAvailable;
    }

}
