//
//  AddBookModalViewController.h
//  Library
//
//  Created by Nam Huynh on 9/29/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import <UIKit/UIKit.h>

@class AddBookModalViewController;

@protocol AddBookModalDelegate <NSObject>
- (void) addBookModal:(AddBookModalViewController*)addBookModal onClickAt:(int)buttonIndex;
@end

@interface AddBookModalViewController : UIViewController <UIViewControllerTransitioningDelegate>

@property (nonatomic, assign) id<AddBookModalDelegate>delegate;

- (IBAction)cancel:(id)sender;
- (IBAction)scan:(id)sender;
- (IBAction)addManual:(id)sender;

@property (strong, nonatomic) IBOutlet UIButton *btnCancel;
@property (strong, nonatomic) IBOutlet UIButton *btnScan;
@property (strong, nonatomic) IBOutlet UIButton *btnManual;

@end
