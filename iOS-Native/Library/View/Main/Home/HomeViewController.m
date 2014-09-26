//
//  HomeViewController.m
//  Library
//
//  Created by Tien Nguyen Thanh on 9/2/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import "HomeViewController.h"
#import "CheckInModalViewController.h"
#import "BooksViewController.h"
#import "Constants.h"
#import "UIButton+AppButton.h"
#import <QuartzCore/QuartzCore.h>

#import "BarcodeReaderViewController.h"

@interface HomeViewController ()

@end

@implementation HomeViewController

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
    [_btnCheckOut setAppButtonHasBackgroundColor:YES withColor:UIColorFromRGB(kAppGreen)];
    [_btnCheckIn setAppButtonHasBackgroundColor:NO withColor:UIColorFromRGB(kAppRed)];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self decorate];

    BarcodeReaderViewController *ba = [[BarcodeReaderViewController alloc] initWithDelegate:self];
    [self.navigationController pushViewController:ba animated:YES];
}

- (void)barcodeReader:(BarcodeReaderViewController *)barcodeReader onFoundItem:(NSString *)content withType:(NSString *)type
{
    NSLog(@"Detected Item: %@, %@", content, type);

    [self.navigationController popViewControllerAnimated:YES];

    //[barcodeReader dismissViewControllerAnimated:YES completion:nil];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)checkin:(id)sender {
    // Add modal view
    CheckInModalViewController *checkView = [self.storyboard instantiateViewControllerWithIdentifier:@"CheckInModalIdentifier"];
    
    [checkView setTransitioningDelegate:self.transitioningDelegate];
    checkView.modalPresentationStyle = UIModalPresentationCustom;
    
    [checkView setType:1];
    
    [self presentViewController:checkView animated:NO completion:nil];
}

- (void)checkout:(id)sender {
    // Add modal view
    CheckInModalViewController *checkView = [self.storyboard instantiateViewControllerWithIdentifier:@"CheckInModalIdentifier"];
    
    [checkView setTransitioningDelegate:self.transitioningDelegate];
    checkView.modalPresentationStyle = UIModalPresentationCustom;
    
    [checkView setType:2];
    
    [self presentViewController:checkView animated:NO completion:nil];
}

- (void)presentBooksView {
    BooksViewController *booksView = [self.storyboard instantiateViewControllerWithIdentifier:@"TabBarIndetifier"];
    NSLog(@"Present view");
    [self.navigationController presentViewController:booksView animated:YES completion:nil];
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
