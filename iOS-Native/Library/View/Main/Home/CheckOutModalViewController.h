//
//  CheckOutModalViewController.h
//  Library
//
//  Created by Nam Huynh on 9/12/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface CheckOutModalViewController : UIViewController <UIViewControllerTransitioningDelegate>

- (IBAction)cancel:(id)sender;
- (IBAction)scan:(id)sender;
- (IBAction)list:(id)sender;

@property (strong, nonatomic) IBOutlet UIButton *btnCancel;
@property (strong, nonatomic) IBOutlet UIButton *btnScan;
@property (strong, nonatomic) IBOutlet UIButton *btnList;

@end
