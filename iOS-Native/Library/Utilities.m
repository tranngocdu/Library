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

- (void)showLoading {
    // Get screen size
    CGRect screenSize = [[UIScreen mainScreen] bounds];
    
    // Backdrop
    loadingView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, screenSize.size.width, screenSize.size.height)];
    loadingView.backgroundColor = [UIColor blackColor];
    loadingView.alpha = 0.7;
    loadingView.layer.zPosition = 99999;
    
    // Spinner
    UIActivityIndicatorView *spinner = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhiteLarge];
    spinner.center = CGPointMake(screenSize.size.width / 2, screenSize.size.height / 2);
    spinner.hidesWhenStopped = YES;
    [spinner startAnimating];
    
    // Add view
    [loadingView addSubview:spinner];
    [loadingView setUserInteractionEnabled:YES];
    [[[[UIApplication sharedApplication] delegate] window] addSubview:loadingView];
}

- (void)hideLoading {
    [loadingView setUserInteractionEnabled:NO];
    [loadingView removeFromSuperview];
}


@end
