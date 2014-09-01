//
//  LoginViewController.m
//  TestStoryboard
//
//  Created by Tien Nguyen Thanh on 9/1/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import "LoginViewController.h"
#import "Constants.h"
#import <QuartzCore/QuartzCore.h>

@interface LoginViewController ()

@end

@implementation LoginViewController



- (id)initWithCoder:(NSCoder *)aDecoder
{
    self = [super initWithCoder:aDecoder];
    if (self)
    {
        [self performSelectorOnMainThread:@selector(decorate) withObject:nil waitUntilDone:NO];
    }
    return self;
}

- (void)decorate
{
    _btnLogin.layer.cornerRadius = 5.0f;
    
    _btnCreateAccount.layer.cornerRadius = 5.0f;
    _btnCreateAccount.layer.borderWidth = 1.0f;
    _btnCreateAccount.layer.borderColor = [UIColorFromRGB(kAppGreen) CGColor];
    
    _tfEmail.delegate = self;
    _tfPassword.delegate = self;
    _tfPassword.secureTextEntry = YES;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    [_btnForgotPassword addTarget:self action:@selector(buttonResetPasswordDidClick) forControlEvents: UIControlEventTouchUpInside];

}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)doLogin:(id)sender
{
    NSLog(@"Login");
}

- (void)buttonResetPasswordDidClick
{
    if ([_tfEmail.text isEqualToString:@""])
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Enter your email"
                                                        message: @"First enter above the email you used for Class Library"
                                                       delegate: nil
                                              cancelButtonTitle:@"OK"
                                              otherButtonTitles: nil];
        [alert show];
    }
    else
    {
        // TODO: Send recovery email to the target address
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Reset password"
                                                        message: [NSString stringWithFormat:@"An email has been sent to %@", _tfEmail.text]
                                                       delegate: nil
                                              cancelButtonTitle:@"OK"
                                              otherButtonTitles: nil];
        [alert show];
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
        [_tfPassword resignFirstResponder];
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
