//
//  CheckInModalViewController.m
//  Library
//
//  Created by Nam Huynh on 9/12/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import "CheckInModalViewController.h"
#import "BooksViewController.h"

@implementation CheckInModalViewController

- (void)viewDidAppear:(BOOL)animated {
    if (checkType == 1) {
        _lblCheck.text = @"Check In";
    } else {
        _lblCheck.text = @"Check Out";
    }
}

- (void)setType:(int)typeNum {
    checkType = typeNum;
}

- (void)scan:(id)sender {
    if (checkType == 1) {
        NSLog(@"Check in");
    } else {
        NSLog(@"Check out");
    }
    [self.presentingViewController dismissViewControllerAnimated:NO completion:nil];
}

- (void)list:(id)sender {
//    [self.navigationController.presentingViewController dismissViewControllerAnimated:YES completion:^{
//        BooksViewController *bookView = [self.storyboard instantiateViewControllerWithIdentifier:@"TabBarIndetifier"];
//        [self.navigationController presentViewController:bookView animated:YES completion:nil];
//    }];
}

- (void)cancel:(id)sender {
    [self.presentingViewController dismissViewControllerAnimated:NO completion:nil];
}

@end
