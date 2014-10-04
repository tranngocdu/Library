//
//  Utilities.m
//  Library
//
//  Created by Nam Huynh on 9/23/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import "Utilities.h"

@implementation Utilities

- (void)showAlertWithTitle:(NSString *)title withMessage: (NSString *) message {
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:title
                                                    message:message
                                                   delegate:nil
                                          cancelButtonTitle:@"OK"
                                          otherButtonTitles:nil];
    [alert show];
}

- (void)showLoading:(UIViewController *)view {
    loadingView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, view.view.frame.size.width, view.view.frame.size.height)];
    loadingView.backgroundColor = [UIColor blackColor];
    loadingView.alpha = 0.5;
    loadingView.layer.zPosition = 99999;
    [view.view addSubview:loadingView];
}

- (void)hideLoading:(UIViewController *)view {
    [loadingView removeFromSuperview];
}


@end
