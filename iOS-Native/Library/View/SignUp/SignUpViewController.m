//
//  SignUpViewController.m
//  Library
//
//  Created by Tien Nguyen Thanh on 9/1/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import "SignUpViewController.h"
#import "HomeViewController.h"
#import "Constants.h"
#import "UIButton+AppButton.h"
#import <QuartzCore/QuartzCore.h>
#import <Parse/Parse.h>

@interface SignUpViewController ()

@end

@implementation SignUpViewController

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
    _tfPassword.secureTextEntry = YES;
    _tfPasswordConfirm.secureTextEntry = YES;
    
    [_btnCreateAccount setAppButtonHasBackgroundColor:YES withColor:UIColorFromRGB(kAppGreen)];
    [_btnIHaveAccount setAppButtonHasBackgroundColor:NO withColor:UIColorFromRGB(kAppGreen)];
    
    _tfEmail.delegate = self;
    _tfPassword.delegate = self;
    _tfPasswordConfirm.delegate = self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];

    [self decorate];

    if(isIpad()) {
        _tfEmail.textAlignment = NSTextAlignmentCenter;
        _tfPassword.textAlignment = NSTextAlignmentCenter;
        _tfPasswordConfirm.textAlignment = NSTextAlignmentCenter;
    }
}

- (IBAction) goBackToLoginScreen:(id)sender
{
    [self.navigationController popViewControllerAnimated: YES];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(BOOL)textFieldShouldReturn:(UITextField *)textField
{
    if (textField == _tfEmail)
    {
        [_tfPassword becomeFirstResponder];
    }
    else if (textField == _tfPassword)
    {
        [_tfPasswordConfirm becomeFirstResponder];
    }
    else if (textField == _tfPasswordConfirm)
    {
        [textField resignFirstResponder];

        if(([_tfEmail.text length] > 0) &&
           ([_tfPassword.text length] > 0) &&
           ([_tfPasswordConfirm.text length] > 0)) {
            [self signup:_btnCreateAccount];
        }
    }
    return YES;
}

- (void)signup:(id)sender {
    NSString *email = _tfEmail.text;
    NSString *password = _tfPassword.text;
    NSString *passwordConfirm = _tfPasswordConfirm.text;
    
    // Validate sign up informations
    if ([email isEqualToString:@""]) {
        [[Utilities share] showAlertWithTitle:@"Error" withMessage:@"Cannot sign up user with an empty name."];
    } else if ([password isEqualToString:@""]) {
        [[Utilities share] showAlertWithTitle:@"Error" withMessage:@"Cannot sign up user with an empty password."];
    } else if (![password isEqualToString:passwordConfirm]) {
        [[Utilities share] showAlertWithTitle:@"Error" withMessage:@"Your password do not match. Please try again."];
    } else {
        [[Utilities share] showLoading];
        // Disable button
        _btnCreateAccount.enabled = NO;
        _btnIHaveAccount.enabled = NO;
        
        // Create user using parse
        PFUser *user = [PFUser user];
        user.username = email;
        user.password = password;
        user.email = email;
        
        // Send data
        [user signUpInBackgroundWithBlock:^(BOOL succeeded, NSError *error) {
            [[Utilities share] hideLoading];
            // Enable button again
            _btnCreateAccount.enabled = YES;
            _btnIHaveAccount.enabled = YES;
            
            if (!error) {
                NSLog(@"User %@ created", email);
                // Hooray! Let them use the app now.
                UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"OK"
                                                                message:@"Your account has been created successful."
                                                               delegate:self
                                                      cancelButtonTitle:@"OK"
                                                      otherButtonTitles:nil];
                [alert show];
            } else {
                // Show the errorString somewhere and let the user try again.
                NSString *errorString = [error userInfo][@"error"];
                NSLog(@"%@", errorString);
                
                NSString *alertMsg = [NSString stringWithFormat:@"Username %@ already taken.", email];
                [[Utilities share] showAlertWithTitle:@"Error" withMessage:alertMsg];
            }
        }];

    }
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
    // Move to home view
    HomeViewController *homeView = [self.storyboard instantiateViewControllerWithIdentifier:@"TabBarIndetifier"];
    [self.navigationController presentViewController:homeView animated:YES completion:nil];
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
