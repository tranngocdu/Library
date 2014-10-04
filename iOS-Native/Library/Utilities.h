//
//  Utilities.h
//  Library
//
//  Created by Nam Huynh on 9/23/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Utilities : NSObject {
    UIView *loadingView;
    UIActivityIndicatorView *spinner;
}

+ (Utilities*)share;

- (void)showAlertWithTitle:(NSString *)title withMessage: (NSString *) message;
- (void)showLoading;
- (void)hideLoading;

@end
