//
//  CheckInModalViewController.m
//  Library
//
//  Created by Nam Huynh on 9/12/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import "CheckInModalViewController.h"
#import "HomeViewController.h"

@implementation CheckInModalViewController

- (void)scan:(id)sender {
    NSLog(@"Scan");
    [self.presentingViewController dismissViewControllerAnimated:NO completion:nil];
}

- (void)list:(id)sender {
    NSLog(@"List");
    [self.presentingViewController dismissViewControllerAnimated:NO completion:^{
        HomeViewController *homeView = [[HomeViewController alloc] init];
        [homeView presentBooksView];
    }];
}

- (void)cancel:(id)sender {
    [self.presentingViewController dismissViewControllerAnimated:NO completion:nil];
}

@end
