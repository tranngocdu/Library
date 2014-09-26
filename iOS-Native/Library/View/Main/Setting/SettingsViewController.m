//
//  SettingsViewController.m
//  Library
//
//  Created by Tien Nguyen Thanh on 9/2/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import "SettingsViewController.h"
#import "LoginViewController.h"
#import "HomeViewController.h"
#import "Constants.h"
#import "UIButton+AppButton.h"
#import <Parse/Parse.h>

@interface SettingsViewController ()

@end

@implementation SettingsViewController

- (id)initWithCoder:(NSCoder *)aDecoder
{
    self = [super initWithCoder: aDecoder];
    if (self)
    {

    }

    return self;
}

- (void) decorate
{
    [_btnUpdateAccount setAppButtonHasBackgroundColor:NO withColor:UIColorFromRGB(kAppGreen)];
    [_btnLogOut setAppButtonHasBackgroundColor:NO withColor:UIColorFromRGB(kAppRed)];
    [_btnHelpMe setAppButtonHasBackgroundColor:NO withColor:UIColorFromRGB(kAppGreen)];
    
    _tfEmail.delegate = self;
    _tfCurrentPassword.delegate = self;
    _tfCurrentPassword.secureTextEntry = YES;
    _tfNewPassword.delegate = self;
    _tfNewPassword.secureTextEntry = YES;
    _tfNewPasswordConfirm.delegate = self;
    _tfNewPasswordConfirm.secureTextEntry = YES;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self decorate];
}

- (void)viewDidAppear:(BOOL)animated {
    user = [PFUser currentUser];
    _tfEmail.text = user[@"username"];
    _tfEmail.enabled = NO;
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (BOOL)textFieldShouldReturn:(UITextField *)textField
{
    if (textField == _tfEmail)
    {
        [_tfCurrentPassword becomeFirstResponder];
    }
    else if (textField == _tfCurrentPassword)
    {
        [_tfNewPassword becomeFirstResponder];
    }
    else if (textField == _tfNewPassword)
    {
        [_tfNewPasswordConfirm becomeFirstResponder];
    }
    else if (textField == _tfNewPasswordConfirm)
    {
        [_tfNewPasswordConfirm resignFirstResponder];
    }
    return YES;
}

- (void)update:(id)sender {
    NSString *currentPassword = _tfCurrentPassword.text;
    NSString *newPassword = _tfNewPassword.text;
    NSString *newPasswordConfirm = _tfNewPasswordConfirm.text;
    
    Utilities *utilities = [[Utilities alloc] init];
    
    if([currentPassword isEqualToString:@""] ||
       [newPassword isEqualToString:@""]) {
        [utilities showAlertWithTitle:@"Check Password" withMessage:@"The password you entered was incorrect."];
    } else if(![newPassword isEqualToString:newPasswordConfirm]) {
        [utilities showAlertWithTitle:@"Try again" withMessage:@"The passwords did not match."];
    } else {
        // Login to check current password
        [PFUser logInWithUsernameInBackground:user[@"username"] password:currentPassword block:^(PFUser *checkuser, NSError *error) {
            if (!error) {
                user.password = newPassword;
                [user saveInBackgroundWithBlock:^(BOOL succeeded, NSError *error) {
                    if(!error) {
                        // Relogin with new password
                        [PFUser logInWithUsernameInBackground:user[@"username"] password:newPassword block:^(PFUser *user, NSError *error) {
                            if (!error) {
                                HomeViewController *homeView = [self.storyboard instantiateViewControllerWithIdentifier:@"TabBarIndetifier"];
                                [self.navigationController presentViewController:homeView animated:YES completion:^{
                                    [utilities showAlertWithTitle:@"Changed" withMessage:@"Settings have been changed."];
                                }];
                            } else {
                                NSLog(@"Error: %@", error);
                                [utilities showAlertWithTitle:@"Error" withMessage:@"Server error."];
                            }
                        }];
                    } else {
                        NSLog(@"Error: %@", error);
                        [utilities showAlertWithTitle:@"Error" withMessage:@"Server error."];
                    }
                }];
            } else {
                NSLog(@"Error: %@", error);
                [utilities showAlertWithTitle:@"Error" withMessage:@"Wrong current password."];
            }
        }];
    }
}

- (void)logout:(id)sender {
    [PFUser logOut];
    [self.navigationController.presentingViewController dismissViewControllerAnimated:YES completion:nil];
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
