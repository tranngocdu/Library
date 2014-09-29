//
//  AddBookModalViewController.m
//  Library
//
//  Created by Nam Huynh on 9/29/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import "AddBookModalViewController.h"

@implementation AddBookModalViewController

- (void)viewDidAppear:(BOOL)animated {
    self.view.backgroundColor = [UIColor colorWithWhite:1.0 alpha:0.5];
}

- (void) dismissWithClickPosition:(int)clickPos;
{
    [self.presentingViewController dismissViewControllerAnimated:NO completion:^ {
        [self.delegate addBookModal:self onClickAt:clickPos];
    }];
}

- (void)scan:(id)sender {
    [self dismissWithClickPosition:1];
}

- (void)addManual:(id)sender {
    [self dismissWithClickPosition:2];
}

- (void)cancel:(id)sender {
    [self dismissWithClickPosition:3];
}


@end
