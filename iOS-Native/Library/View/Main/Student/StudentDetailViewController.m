//
//  StudentDetailViewController.m
//  Library
//
//  Created by Nam Huynh on 9/19/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import "StudentDetailViewController.h"

@implementation StudentDetailViewController

- (void)decorate {
    _topTab.layer.cornerRadius = 5.0f;
    _topTab.layer.masksToBounds = YES;
    _topTab.layer.borderColor = [[UIColor whiteColor] CGColor];
}


- (void)viewDidLoad {
    [self decorate];
}

@end
