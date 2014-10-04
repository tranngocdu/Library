//
//  EditBookModalViewController.m
//  Library
//
//  Created by Nam Huynh on 10/1/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import "EditBookModalViewController.h"
#import "AddBookScanViewController.h"

@interface EditBookModalViewController ()

@end

@implementation EditBookModalViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)cancel:(id)sender {
    [self.presentingViewController dismissViewControllerAnimated:YES completion:nil];
}

- (void)submit:(id)sender {
    NSLog(@"submit");
    // This will create new object
    //AddBookScanViewController *addScanView = [[AddBookScanViewController alloc] init];

    if(self.editDelegate && [self.editDelegate respondsToSelector:@selector(onEditChangedValue:)]) {
        [self.editDelegate onEditChangedValue:_tfQuantity.text];
    }

    [self.presentingViewController dismissViewControllerAnimated:YES completion:nil];
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
