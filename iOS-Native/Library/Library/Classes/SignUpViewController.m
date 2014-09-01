//
//  SignUpViewController.m
//  Library
//
//  Created by Tien Nguyen Thanh on 9/1/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import "SignUpViewController.h"
#import "Constants.h"
#import <QuartzCore/QuartzCore.h>

@interface SignUpViewController ()

@end

@implementation SignUpViewController

- (id)initWithCoder:(NSCoder *)aDecoder
{
    self = [super initWithCoder:aDecoder];
    if (self)
    {
        [self performSelectorOnMainThread:@selector(decorate) withObject:nil waitUntilDone:NO];
        
    }
    return self;
}

- (void) decorate
{
    _tfPassword.secureTextEntry = YES;
    _tfPasswordConfirm.secureTextEntry = YES;
    
    _btnCreateAccount.layer.cornerRadius = 5.0f;
    
    _btnIHaveAccount.layer.cornerRadius = 5.0f;
    _btnIHaveAccount.layer.borderWidth = 1.0f;
    _btnIHaveAccount.layer.borderColor = [UIColorFromRGB(kAppGreen) CGColor];
    
    _tfEmail.delegate = self;
    _tfPassword.delegate = self;
    _tfPasswordConfirm.delegate = self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    [_btnIHaveAccount addTarget:self action:@selector(goBackToLoginScreen) forControlEvents:UIControlEventTouchUpInside];
    
}

- (void) goBackToLoginScreen
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
        [_tfPasswordConfirm resignFirstResponder];
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
