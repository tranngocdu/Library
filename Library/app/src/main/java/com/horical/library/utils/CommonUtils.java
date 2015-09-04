package com.horical.library.utils;

import java.util.List;

public class CommonUtils {

    public static String implode(String glue, List<String> listArr) {
        String ret = "";
        for (int i = 0; i < listArr.size(); i++) {
            ret += (i == listArr.size() - 1) ? listArr.get(i) : listArr.get(i) + glue;
        }
        return ret;
    }

}
