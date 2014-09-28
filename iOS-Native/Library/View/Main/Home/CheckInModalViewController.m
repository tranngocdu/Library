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

    self.view.backgroundColor = [UIColor colorWithWhite:1.0 alpha:0.5];
}

- (void)setType:(int)typeNum {
    checkType = typeNum;
}

-(void) dismissWithClickPosition:(int)clickPos;
{
    [self.presentingViewController dismissViewControllerAnimated:NO completion:^ {
        if(self.delegate && [self.delegate respondsToSelector:@selector(checkinModal:type:onClickAt:)]) {
            [self.delegate checkinModal:self type:checkType onClickAt:clickPos];
        }
    }];
}

- (void)scan:(id)sender {
    [self dismissWithClickPosition:1];
}

- (void)list:(id)sender {
    [self dismissWithClickPosition:2];
}

- (void)cancel:(id)sender {
    [self dismissWithClickPosition:3];
}

@end
