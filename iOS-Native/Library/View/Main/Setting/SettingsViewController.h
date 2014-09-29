//
//  SettingsViewController.h
//  Library
//
//  Created by Tien Nguyen Thanh on 9/2/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Parse/Parse.h>

@interface SettingsViewController : UIViewController <UITextFieldDelegate, UIAlertViewDelegate> {
    PFUser *user;
}

- (IBAction)update:(id)sender;
- (IBAction)logout:(id)sender;
- (IBAction)helpme:(id)sender;

@property (strong, nonatomic) IBOutlet UITextField *tfEmail;
@property (strong, nonatomic) IBOutlet UITextField *tfCurrentPassword;
@property (strong, nonatomic) IBOutlet UITextField *tfNewPassword;
@property (strong, nonatomic) IBOutlet UITextField *tfNewPasswordConfirm;
@property (strong, nonatomic) IBOutlet UIButton *btnUpdateAccount;
@property (strong, nonatomic) IBOutlet UIButton *btnLogOut;
@property (strong, nonatomic) IBOutlet UIButton *btnHelpMe;

@end
