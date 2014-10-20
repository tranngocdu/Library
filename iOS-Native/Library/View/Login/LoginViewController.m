//
//  LoginViewController.m
//  TestStoryboard
//
//  Created by Tien Nguyen Thanh on 9/1/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import "LoginViewController.h"
#import "HomeViewController.h"
#import "Constants.h"
#import "UIButton+AppButton.h"
#import <QuartzCore/QuartzCore.h>
#import <Parse/Parse.h>

@interface LoginViewController ()

@end

@implementation LoginViewController



- (id)initWithCoder:(NSCoder *)aDecoder
{
    self = [super initWithCoder:aDecoder];
    if (self)
    {

    }

    return self;
}

- (void) decorate
{
    [_btnLogin setAppButtonHasBackgroundColor:YES withColor:UIColorFromRGB(kAppGreen)];
    [_btnCreateAccount setAppButtonHasBackgroundColor:NO withColor:UIColorFromRGB(kAppGreen)];
    
    _tfEmail.delegate = self;
    _tfPassword.delegate = self;
    _tfPassword.secureTextEntry = YES;
}

- (void)viewDidLoad
{
    [super viewDidLoad];

    [self decorate];

    if(isIpad()) {
        _tfEmail.textAlignment = NSTextAlignmentCenter;
        _tfPassword.textAlignment = NSTextAlignmentCenter;
    }
}

- (void) viewDidAppear:(BOOL)animated {
    // Get user data
    PFUser *currentUser = [PFUser currentUser];
    // If user is already logged in, move to home view
    if (currentUser) {
        HomeViewController *homeView = [self.storyboard instantiateViewControllerWithIdentifier:@"TabBarIndetifier"];
        [self.navigationController presentViewController:homeView animated:NO completion:nil];
    }
    
    self.tfPassword.text = @"";
    self.tfEmail.text = @"";
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)doLogin:(id)sender
{
    if ([_tfEmail.text isEqualToString:@""] || [_tfPassword.text isEqualToString: @""])
    {
        [[Utilities share] showAlertWithTitle:@"All Fields Required" withMessage:@"Please enter username and password."];
    } else {
        [[Utilities share] showLoading];
        // Disable button
        _btnLogin.enabled = NO;
        _btnCreateAccount.enabled = NO;
        _btnForgotPassword.enabled = NO;
        
        NSString *email = _tfEmail.text;
        NSString *password = _tfPassword.text;
        
        [PFUser logInWithUsernameInBackground:email password:password
        block:^(PFUser *user, NSError *error) {
            [[Utilities share] hideLoading];
            // Enable button again
            _btnLogin.enabled = YES;
            _btnCreateAccount.enabled = YES;
            _btnForgotPassword.enabled = YES;
            
            if (user) {
                // Do stuff after successful login.
                NSLog(@"Login successful with username: %@", user.username);
                HomeViewController *homeView = [self.storyboard instantiateViewControllerWithIdentifier:@"TabBarIndetifier"];
                [self.navigationController presentViewController:homeView animated:YES completion:nil];
            } else {
                // The login failed. Check error to see why.
                NSLog(@"Wrong username or password");
                [[Utilities share] showAlertWithTitle:@"Incorrect Login" withMessage:@"Please check your username or password."];
            }
        }];
    }
}

- (IBAction)buttonResetPasswordDidClick:(id)sender
{
    NSString *email = _tfEmail.text;
    if ([email isEqualToString:@""]) {
        [[Utilities share] showAlertWithTitle:@"Enter your email" withMessage:@"First enter above the email you used for Class Library"];
    } else {
        // Send recovery email to the target address
        [PFUser requestPasswordResetForEmailInBackground:email];
        // Alert
        NSString *alertMsg = [NSString stringWithFormat:@"An email has been sent to %@", email];
        [[Utilities share] showAlertWithTitle:@"Reset password" withMessage:alertMsg];
    }
}

- (BOOL)textFieldShouldReturn:(UITextField *)textField
{
    [textField resignFirstResponder];
    if (textField == _tfEmail)
    {
        [_tfPassword becomeFirstResponder];
    }
    else if (textField == _tfPassword)
    {
        [textField resignFirstResponder];
        if(([_tfEmail.text length] > 0) && ([_tfPassword.text length] > 0)) {
            [self doLogin:_btnLogin];
        }
    }
    
    return YES;
}
/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
