//
//  CheckInModalViewController.h
//  Library
//
//  Created by Nam Huynh on 9/12/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface CheckInModalViewController : UIViewController <UIViewControllerTransitioningDelegate> {
    int checkType;
}

- (IBAction)cancel:(id)sender;
- (IBAction)scan:(id)sender;
- (IBAction)list:(id)sender;

- (void)setType:(int)typeNum;

@property (strong, nonatomic) IBOutlet UIButton *btnCancel;
@property (strong, nonatomic) IBOutlet UIButton *btnScan;
@property (strong, nonatomic) IBOutlet UIButton *btnList;
@property (strong, nonatomic) IBOutlet UILabel *lblCheck;

@end
