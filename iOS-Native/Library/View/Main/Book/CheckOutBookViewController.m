//
//  CheckOutBookViewController.m
//  Library
//
//  Created by Tien Nguyen Thanh on 9/2/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import "CheckOutBookViewController.h"
#import "UIButton+AppButton.h"

@interface CheckOutBookViewController ()

@end

@implementation CheckOutBookViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void) decorate {
    [_btnCheckout setAppButtonHasBackgroundColor:NO withColor:UIColorFromRGB(kAppGray)];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    [self.navigationItem setTitle:@"Check Out"];
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