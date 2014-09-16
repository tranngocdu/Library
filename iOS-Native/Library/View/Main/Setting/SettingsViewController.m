//
//  SettingsViewController.m
//  Library
//
//  Created by Tien Nguyen Thanh on 9/2/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import "SettingsViewController.h"
#import "LoginViewController.h"
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
    _tfNewPassword.delegate = self;
    _tfNewPasswordConfirm.delegate = self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self decorate];
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

- (void)logout:(id)sender {
    [PFUser logOut];
    LoginViewController *loginView = [self.storyboard instantiateViewControllerWithIdentifier:@"LoginIndentifier"];
    [self.navigationController presentViewController:loginView animated:YES completion:nil];
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
