//
//  Utilities.m
//  Library
//
//  Created by Nam Huynh on 9/23/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import "Utilities.h"

@implementation Utilities

+ (Utilities *)share {
    static Utilities *shareObj = nil;
    
    static dispatch_once_t once;
    dispatch_once(&once, ^{
        shareObj = [[Utilities alloc] init];
    });

    return shareObj;
}

- (void)showAlertWithTitle:(NSString *)title withMessage: (NSString *) message {
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:title
                                                    message:message
                                                   delegate:nil
                                          cancelButtonTitle:@"OK"
                                          otherButtonTitles:nil];
    [alert show];
}

- (void)showLoading {
    [self showLoadingWithLockScreen:NO];
}

- (void)showLoadingWithLockScreen:(BOOL)isLookScreen {
    // Get screen size
    CGRect screenSize = [[UIScreen mainScreen] bounds];

    // release if existed
    if(loadingView) {
        [spinner removeFromSuperview];
        spinner = nil;
        
        [loadingView  removeFromSuperview];
        loadingView = nil;
    }

    if(isLookScreen) {
        // Backdrop
        loadingView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, screenSize.size.width, screenSize.size.height)];
        loadingView.backgroundColor = [UIColor blackColor];
        loadingView.alpha = 0.25;
        loadingView.layer.zPosition = 99999;
        
        // Spinner
        spinner = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhiteLarge];
        spinner.center = CGPointMake(screenSize.size.width / 2, screenSize.size.height / 2);
        spinner.hidesWhenStopped = YES;
        [spinner startAnimating];

        // Add view
        [loadingView addSubview:spinner];
        [loadingView setUserInteractionEnabled:YES];
        [[[[UIApplication sharedApplication] delegate] window] addSubview:loadingView];

    } else {
        [[UIApplication sharedApplication] setNetworkActivityIndicatorVisible:YES];
    }
}

- (void)hideLoading {
    if(loadingView) {
        [loadingView setUserInteractionEnabled:NO];
        [loadingView removeFromSuperview];
    }

    [[UIApplication sharedApplication] setNetworkActivityIndicatorVisible:NO];
}


@end
