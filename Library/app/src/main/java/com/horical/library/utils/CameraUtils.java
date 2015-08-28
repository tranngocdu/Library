package com.horical.library.utils;

import android.content.Context;
import android.content.pm.PackageManager;

public class CameraUtils {

    public static boolean isCameraAvailable(Context context) {
        PackageManager pm = context.getPackageManager();
        return pm.hasSystemFeature(PackageManager.FEATURE_CAMERA);
    }

}
