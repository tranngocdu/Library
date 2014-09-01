//
//  LoginViewController.h
//  TestStoryboard
//
//  Created by Tien Nguyen Thanh on 9/1/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface LoginViewController : UIViewController

@property (nonatomic) IBOutlet UIButton *btnLogin;
@property (nonatomic) IBOutlet UIButton *btnCreateAccount;
@property (strong, nonatomic) IBOutlet UILabel *forgotPasswordLabel;

- (IBAction)doLogin:(id)sender;
- (IBAction)gotoCreateAccount:(id)sender;
- (IBAction)gotoResetPassword:(id)sender;
@end
