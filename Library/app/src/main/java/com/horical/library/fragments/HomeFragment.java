package com.horical.library.fragments;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import com.horical.library.R;
import com.horical.library.base.BaseFragment;
import com.horical.library.scanner.ZBarConstants;
import com.horical.library.scanner.ZBarScannerActivity;
import com.horical.library.utils.CameraUtils;

/**
 * Created by trandu on 24/08/2015.
 */
public class HomeFragment extends BaseFragment implements View.OnClickListener {

    public static final int ZBAR_SCANNER_REQUEST = 0;
    public static final int ZBAR_QR_SCANNER_REQUEST = 1;

    private Button mBtnCheckOut, mBtnCheckIn;

    public HomeFragment() {

    }

    public static HomeFragment newInstance() {
        return new HomeFragment();
    }

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
    }

    @Override
    public void onCreate(Bundle bundle) {
        super.onCreate(bundle);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle bundle) {
        View v = inflater.inflate(R.layout.fragment_home, container, false);
        return v;
    }

    @Override
    public void onViewCreated(View view, Bundle bundle) {
        super.onViewCreated(view, bundle);
        initDatas();
        initView(view);
        initListener(view);
    }

    public void initView(View view) {
        mBtnCheckIn = (Button) view.findViewById(R.id.btnCheckIn);
        mBtnCheckOut = (Button) view.findViewById(R.id.btnCheckOut);
    }

    private void initDatas() {

    }

    public void initListener(View view) {
        mBtnCheckIn.setOnClickListener(this);
        mBtnCheckOut.setOnClickListener(this);
    }

    @Override
    protected void initData() {

    }

    @Override
    protected boolean hasFooterLayout() {
        return true;
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnCheckIn:
                Toast.makeText(getActivity(), "Check in", Toast.LENGTH_SHORT).show();
                break;
            case R.id.btnCheckOut:
                if (CameraUtils.isCameraAvailable(getActivity())) {
                    Intent intent = new Intent(getActivity(), ZBarScannerActivity.class);
                    startActivityForResult(intent, ZBAR_SCANNER_REQUEST);
                } else {
                    Toast.makeText(getActivity(), "Rear Facing Camera Unavailable", Toast.LENGTH_SHORT).show();
                }
                break;
            default:
                break;
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode) {
            case ZBAR_SCANNER_REQUEST:
                if (resultCode == Activity.RESULT_OK) {
                    Toast.makeText(getActivity(), "Scan Result = " + data.getStringExtra(ZBarConstants.SCAN_RESULT), Toast.LENGTH_SHORT).show();
                } else if (resultCode == Activity.RESULT_CANCELED && data != null) {
                    String error = data.getStringExtra(ZBarConstants.ERROR_INFO);
                    if (!TextUtils.isEmpty(error)) {
                        Toast.makeText(getActivity(), error, Toast.LENGTH_SHORT).show();
                    }
                }
                break;
        }
    }
}
