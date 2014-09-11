//
//  AddStudentViewController.m
//  Library
//
//  Created by Tien Nguyen Thanh on 9/2/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import "AddStudentViewController.h"
#import "UIButton+AppButton.h"
#import <QuartzCore/QuartzCore.h>

@interface AddStudentViewController ()

@end

@implementation AddStudentViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self)
    {
        // Custom initialization
    }
    return self;
}

- (void) decorate
{
    [_btnAddStudent setAppButtonHasBackgroundColor:YES withColor:UIColorFromRGB(kAppGreen)];
    
    _tfStudentName.delegate = self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self decorate];
    [self.navigationItem setTitle:@"Add Student"];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)addStudent:(id)sender {
    NSLog(@"Add student");
    [self.navigationController popViewControllerAnimated:YES];
}

- (BOOL)textFieldShouldReturn:(UITextField *)textField
{
    [_tfStudentName resignFirstResponder];
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
