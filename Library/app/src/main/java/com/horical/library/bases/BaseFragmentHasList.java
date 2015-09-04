package com.horical.library.bases;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import com.horical.library.R;
import com.horical.library.adapters.SideBarAdapter;

import java.util.ArrayList;

/**
 * Created by trandu on 01/09/2015.
 */
public abstract class BaseFragmentHasList extends BaseFragment {

    protected ListView mLvSideBar;

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
    }

    @Override
    public void onCreate(Bundle bundle) {
        super.onCreate(bundle);
    }

    @Override
    public void onViewCreated(View view, Bundle bundle) {
        super.onViewCreated(view, bundle);
    }

    @Override
    protected void initView(View view) {
        mLvSideBar = (ListView) view.findViewById(R.id.lvSideBar);
    }

    @Override
    protected void initListener(View view) {

    }

    @Override
    protected void initData() {
        ArrayList<String> arrayList = new ArrayList<String>();
        for (int i = 0; i < BaseCustomAdapter.alphabet.length; i++) {
            arrayList.add(BaseCustomAdapter.alphabet[i]);
        }
        SideBarAdapter sideBarAdapter = new SideBarAdapter(mContext, 0, arrayList);
        mLvSideBar.setAdapter(sideBarAdapter);
    }

    @Override
    protected boolean hasFooterLayout() {
        return true;
    }
}
