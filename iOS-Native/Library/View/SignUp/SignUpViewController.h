//
//  SignUpViewController.h
//  Library
//
//  Created by Tien Nguyen Thanh on 9/1/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface SignUpViewController : UIViewController <UITextFieldDelegate, UIAlertViewDelegate>
{

}

@property (strong, nonatomic) IBOutlet UITextField *tfEmail;
@property (strong, nonatomic) IBOutlet UITextField *tfPassword;
@property (strong, nonatomic) IBOutlet UITextField *tfPasswordConfirm;
@property (strong, nonatomic) IBOutlet UIButton *btnCreateAccount;
@property (strong, nonatomic) IBOutlet UIButton *btnIHaveAccount;

- (IBAction) goBackToLoginScreen:(id)sender;
- (IBAction) signup:(id)sender;

@end
