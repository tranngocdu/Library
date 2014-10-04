//
//  Constants.h
//  Library
//
//  Created by Tien Nguyen Thanh on 9/1/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#ifndef Library_Constants_h
#define Library_Constants_h

#define UIColorFromRGB(rgbValue) [UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 green:((float)((rgbValue & 0xFF00) >> 8))/255.0 blue:((float)(rgbValue & 0xFF))/255.0 alpha:1.0]

#define kAppGreen 0x3cc1a6
#define kAppRed 0xf46b63
#define kAppGray 0xd3d3d3
#define kAppPink 0xf5817a
#define kAppSegmentBg 0xc95750

#define RunOnUI(A) [self performSelectorOnMainThread:@selector(A) withObject:nil waitUntilDone:NO];

#define isIpad() ([UIDevice currentDevice].userInterfaceIdiom == UIUserInterfaceIdiomPad)
#endif
