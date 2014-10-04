//
//  LoginViewController.h
//  TestStoryboard
//
//  Created by Tien Nguyen Thanh on 9/1/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Utilities.h"

@interface LoginViewController : UIViewController <UITextFieldDelegate> {
    Utilities *utilities;
}

@property (strong, nonatomic) IBOutlet UIButton *btnLogin;
@property (strong, nonatomic) IBOutlet UIButton *btnCreateAccount;
@property (strong, nonatomic) IBOutlet UIButton *btnForgotPassword;
@property (strong, nonatomic) IBOutlet UITextField *tfEmail;
@property (strong, nonatomic) IBOutlet UITextField *tfPassword;

- (IBAction)doLogin:(id)sender;
- (IBAction)buttonResetPasswordDidClick:(id)sender;

@end
