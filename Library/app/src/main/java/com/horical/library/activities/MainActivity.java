package com.horical.library.activities;

import android.app.Activity;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;

import com.horical.library.R;
import com.horical.library.adapters.MainViewPagerAdapter;
import com.horical.library.fragments.BooksFragment;
import com.horical.library.fragments.HomeFragment;
import com.horical.library.fragments.SettingsFragment;
import com.horical.library.fragments.StudentsFragment;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends FragmentActivity {

    private ViewPager viewPager;
    private PagerAdapter pagerAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initViews();
    }

    public void initViews() {
        viewPager = (ViewPager) findViewById(R.id.viewPager);
        pagerAdapter = new MainViewPagerAdapter(getSupportFragmentManager(), getFragments());
        viewPager.setAdapter(pagerAdapter);
    }

    public List<Fragment> getFragments() {
        List<Fragment> fragments = new ArrayList<Fragment>();
        fragments.add(HomeFragment.newInstance());
        fragments.add(BooksFragment.newInstance());
        fragments.add(StudentsFragment.newInstance());
        fragments.add(SettingsFragment.newInstance());
        return fragments;
    }

}
