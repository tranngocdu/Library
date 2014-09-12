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

- (void)scan:(id)sender {
    NSLog(@"Scan");
    [self.presentingViewController dismissViewControllerAnimated:NO completion:nil];
}

- (void)list:(id)sender {
    NSLog(@"List");
    [self.presentingViewController dismissViewControllerAnimated:NO completion:^{
        BooksViewController *bookView = [self.storyboard instantiateViewControllerWithIdentifier:@"BookViewIndentifier"];
        [self.navigationController pushViewController:bookView animated:YES];
    }];
}

- (void)cancel:(id)sender {
    [self.presentingViewController dismissViewControllerAnimated:NO completion:nil];
}

@end