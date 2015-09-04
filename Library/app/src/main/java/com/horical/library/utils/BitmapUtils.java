package com.horical.library.utils;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by trandu on 04/09/2015.
 */
public class BitmapUtils {

    public static Bitmap getBitmapFromURL(String urlString) {
        Bitmap bmp = null;
        URL url = null;
        HttpURLConnection httpURLConnection = null;
        InputStream is = null;
        try {
            url = new URL(urlString);
            httpURLConnection = (HttpURLConnection) url.openConnection();
            is = httpURLConnection.getInputStream();
            bmp = BitmapFactory.decodeStream(is);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                is.close();
            } catch (Exception e) {
            }
        }
        return bmp;
    }


}
