//
//  SettingsViewController.m
//  Library
//
//  Created by Tien Nguyen Thanh on 9/2/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import "SettingsViewController.h"
#import "Constants.h"

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
    _btnUpdateAccount.layer.cornerRadius = 5.0;
    _btnUpdateAccount.layer.borderWidth = 1.0;
    _btnUpdateAccount.layer.borderColor = [UIColorFromRGB(kAppGreen) CGColor];
    
    _btnLogOut.layer.cornerRadius = 5.0;
    
    _btnHelpMe.layer.cornerRadius = 5.0;
    _btnHelpMe.layer.borderWidth = 1.0;
    _btnHelpMe.layer.borderColor = [UIColorFromRGB(kAppGreen) CGColor];
    
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

- (void) viewDidAppear:(BOOL)animated
{
    [self.tabBarController setTitle:@"Settings"];
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
