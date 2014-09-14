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
    
    PFQuery *query = [PFQuery queryWithClassName:@"Student"];
    [query getObjectInBackgroundWithId:@"1" block:^(PFObject *student, NSError *error) {
        // Do something with the returned PFObject in the gameScore variable.
        NSLog(@"%@", student);
    }];

}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)doLogin:(id)sender
{
    NSLog(@"Login");
    if ([_tfEmail.text isEqualToString:@""] || [_tfPassword.text isEqualToString: @""])
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"All Fields Required"
                                                        message: @"Please enter username and password"
                                                       delegate: nil
                                              cancelButtonTitle:@"OK"
                                              otherButtonTitles: nil];
        [alert show];
    } else {
        HomeViewController *homeView = [self.storyboard instantiateViewControllerWithIdentifier:@"TabBarIndetifier"];
        [self.navigationController presentViewController:homeView animated:YES completion:nil];
    }
}

- (IBAction)buttonResetPasswordDidClick:(id)sender
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
