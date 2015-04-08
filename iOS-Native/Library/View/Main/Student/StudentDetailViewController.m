//
//  StudentDetailViewController.m
//  Library
//
//  Created by Nam Huynh on 9/19/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import "StudentDetailViewController.h"
#import <Parse/Parse.h>
#import "Utilities.h"

@implementation StudentDetailViewController

- (void)decorate {
    _topTab.layer.cornerRadius = 5.0f;
    _topTab.layer.masksToBounds = YES;
    _topTab.layer.borderColor = [UIColorFromRGB(kAppPink) CGColor];
    _topTab.layer.backgroundColor = [UIColorFromRGB(kAppPink) CGColor];
    
    
    _topView.layer.backgroundColor = [UIColorFromRGB(kAppPink) CGColor];
}

- (void)viewDidLoad {
    [self decorate];
}

- (void)viewDidAppear:(BOOL)animated {
    [self.tabBarItem setTitle:@"Student Detail"];
    
    [self getStudentInformation];
}

- (NSString *)getStudentId {
    return studentId;
}

- (void)setStudentId:(NSString *)sId {
    studentId = sId;
}

- (void)getStudentInformation {
    [[Utilities share] showLoading];

    PFQuery *query = [PFQuery queryWithClassName:@"Student"];
    [query getObjectInBackgroundWithId:studentId block:^(PFObject *object, NSError *error) {
        [[Utilities share] hideLoading];
        
        if (!error) {
            NSLog(@"Student %@", object);
            NSString *stdentName = object[@"Name"];
            if(stdentName) {
                self.title = stdentName;
            }

        } else {
            NSLog(@"Error %@", error);
        }
    }];
}

- (IBAction)segmentChanged:(id)sender {
    UISegmentedControl *segmentedControl = (UISegmentedControl *) sender;
    NSInteger selectedSegment = segmentedControl.selectedSegmentIndex;
    NSLog(@"%ld", (long)selectedSegment);
}


@end
