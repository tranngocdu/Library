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
