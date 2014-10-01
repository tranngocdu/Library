//
//  EditBookModalViewController.h
//  Library
//
//  Created by Nam Huynh on 10/1/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface EditBookModalViewController : UIViewController <UITextFieldDelegate, UIViewControllerTransitioningDelegate>

@property (strong, nonatomic) IBOutlet UITextField *tfQuantity;
@property (strong, nonatomic) IBOutlet UIButton *btnCancel;
@property (strong, nonatomic) IBOutlet UIButton *btnSubmit;

- (IBAction)cancel:(id)sender;
- (IBAction)submit:(id)sender;

@end
