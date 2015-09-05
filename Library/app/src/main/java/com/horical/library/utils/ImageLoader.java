package com.horical.library.utils;

import android.graphics.Bitmap;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.ImageView;

import java.lang.ref.WeakReference;

/**
 * Created by trandu on 04/09/2015.
 */
public class ImageLoader extends AsyncTask<String, Void, Bitmap> {

    private WeakReference<ImageView> imageReference;

    public ImageLoader(ImageView imageView) {
        imageReference = new WeakReference<ImageView>(imageView);
    }

    @Override
    public void onPreExecute() {
    }

    @Override
    public Bitmap doInBackground(String... params) {
        return BitmapUtils.getBitmapFromURL(params[0]);
    }

    @Override
    public void onProgressUpdate(Void... v) {
        super.onProgressUpdate(v);
    }

    @Override
    public void onPostExecute(Bitmap bmp) {
        if (isCancelled()) {
            bmp = null;
        }
        if (imageReference != null) {
            ImageView imageView = imageReference.get();
            if (bmp != null) {
                //bmp = Bitmap.createScaledBitmap(bmp, 100, 100, true);
                imageView.setImageBitmap(bmp);
            }
        }
    }

}
