package com.horical.library.fragments;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.horical.library.MainApplication;
import com.horical.library.R;
import com.horical.library.bases.BaseFragment;
import com.horical.library.connection.ParseRequest;
import com.horical.library.connection.callback.GetBookISBNCallback;
import com.horical.library.dto.NewBook;
import com.horical.library.scanner.ZBarConstants;
import com.horical.library.scanner.ZBarScannerActivity;
import com.horical.library.utils.CameraUtils;

/**
 * Created by trandu on 24/08/2015.
 */
public class HomeFragment extends BaseFragment implements View.OnClickListener, GetBookISBNCallback
{

    public static final int ZBAR_SCANNER_REQUEST = 0;
    public static final int ZBAR_QR_SCANNER_REQUEST = 1;

    private static HomeFragment INSTANCE;

    private Button mBtnCheckOut, mBtnCheckIn;
    private String mUserEmail, mUserSessionToken;

    public HomeFragment()
    {

    }

    public static HomeFragment newInstance()
    {
        if (INSTANCE == null)
        {
            INSTANCE = new HomeFragment();
        }
        return INSTANCE;
    }

    private void showDialog(String title, String message, String negativeButton, String neutralButton, String positiveButton)
    {
        AlertDialog.Builder builder = new AlertDialog.Builder(mContext);
        builder.setTitle(title);
        builder.setMessage(message);
        builder.setPositiveButton(positiveButton, new DialogInterface.OnClickListener()
        {
            @Override
            public void onClick(DialogInterface dialog, int which)
            {

            }
        });
        builder.setNegativeButton(negativeButton, new DialogInterface.OnClickListener()
        {
            @Override
            public void onClick(DialogInterface dialog, int which)
            {
                if (CameraUtils.isCameraAvailable(getActivity()))
                {
                    Intent intent = new Intent(getActivity(), ZBarScannerActivity.class);
                    startActivityForResult(intent, ZBAR_SCANNER_REQUEST);
                } else
                {
                    Toast.makeText(getActivity(), "Rear Facing Camera Unavailable", Toast.LENGTH_SHORT).show();
                }
            }
        });
        builder.setNeutralButton(neutralButton, new DialogInterface.OnClickListener()
        {
            @Override
            public void onClick(DialogInterface dialog, int which)
            {
                mMainActivityListener.attachBooksFragment();
            }
        });
        builder.show();
    }

    @Override
    public void onAttach(Activity activity)
    {
        super.onAttach(activity);
        Intent intent = activity.getIntent();
        mUserEmail = intent.getStringExtra("email");
        mUserSessionToken = intent.getStringExtra("token");
        MainApplication.saveUserSession(mUserEmail, mUserSessionToken);
    }

    @Override
    public void onCreate(Bundle bundle)
    {
        super.onCreate(bundle);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle bundle)
    {
        View v = inflater.inflate(R.layout.fragment_home, container, false);
        return v;
    }

    @Override
    public void onViewCreated(View view, Bundle bundle)
    {
        super.onViewCreated(view, bundle);
    }

    @Override
    protected void initView(View view)
    {
        mBtnCheckIn = (Button) view.findViewById(R.id.btnCheckIn);
        mBtnCheckOut = (Button) view.findViewById(R.id.btnCheckOut);
    }

    @Override
    protected void initListener(View view)
    {
        mBtnCheckIn.setOnClickListener(this);
        mBtnCheckOut.setOnClickListener(this);
    }

    @Override
    protected void initData()
    {

    }

    @Override
    protected void clearCached()
    {

    }

    @Override
    protected boolean hasFooterLayout()
    {
        return true;
    }

    @Override
    public void onClick(View v)
    {
        switch (v.getId())
        {
            case R.id.btnCheckIn:
                showDialog("Check in", "", "Scan", "List", "Cancel");
                break;
            case R.id.btnCheckOut:

                break;
            default:
                break;
        }
    }


    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data)
    {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode)
        {
            case ZBAR_SCANNER_REQUEST:
                if (resultCode == Activity.RESULT_OK)
                {
                    Toast.makeText(getActivity(), "Scan Result = " + data.getStringExtra(ZBarConstants.SCAN_RESULT), Toast.LENGTH_SHORT).show();
                    String isbn = data.getStringExtra(ZBarConstants.SCAN_RESULT);
                    ParseRequest.getBookISBN(isbn, this);
                } else if (resultCode == Activity.RESULT_CANCELED && data != null)
                {
                    String error = data.getStringExtra(ZBarConstants.ERROR_INFO);
                    if (!TextUtils.isEmpty(error))
                    {
                        Toast.makeText(getActivity(), error, Toast.LENGTH_SHORT).show();
                    }
                }
                break;
        }
    }

    @Override
    public void onError(String message)
    {
        Toast.makeText(mContext, message, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onSuccess(NewBook book)
    {
        mMainActivityListener.attachAddBookFragment(book);
    }
}
