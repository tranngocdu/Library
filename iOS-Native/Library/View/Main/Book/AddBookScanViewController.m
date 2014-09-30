//
//  AddBookScanViewController.m
//  Library
//
//  Created by Nam Huynh on 9/30/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import "AddBookScanViewController.h"
#import "UIButton+AppButton.h"

@interface AddBookScanViewController ()

@end

@implementation AddBookScanViewController

- (void)decorate {
    [_btnAddBook setAppButtonHasBackgroundColor:YES withColor:UIColorFromRGB(kAppGreen)];
    [_btnEditQuantity setAppButtonHasBackgroundColor:YES withColor:UIColorFromRGB(kAppGreen)];
    [_btnAddPhoto setAppButtonHasBackgroundColor:YES withColor:UIColorFromRGB(kAppGreen)];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    [self decorate];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)addBook:(id)sender {
    
}

- (void)addPhoto:(id)sender {
    
}

- (void)editQuantity:(id)sender {
    
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
