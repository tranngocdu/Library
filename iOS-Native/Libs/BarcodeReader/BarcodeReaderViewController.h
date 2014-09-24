//
//  BarcodeReaderViewController.h
//  Library
//
//  Created by vantoan8x on 24/09/14.
//  Copyright (c) 2014 Horical. All rights reserved.
//

#import <UIKit/UIKit.h>

@class BarcodeReaderViewController;
@protocol BarcodeReaderDelegate <NSObject>

@required
- (void) barcodeReader:(BarcodeReaderViewController*)barcodeReader onFoundItem:(NSString*)content withType:(NSString*)type;

@end


@interface BarcodeReaderViewController : UIViewController
{
    NSString *detectionString;
    NSString *detectionType;
}

@property(nonatomic, assign) id<BarcodeReaderDelegate> delegate;

- (id) initWithDelegate:(id<BarcodeReaderDelegate>)delegate;

@end