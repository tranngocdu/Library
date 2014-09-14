//
//  HomeViewController.m
//  Library
//
//  Created by Tien Nguyen Thanh on 9/2/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import "HomeViewController.h"
#import "CheckInModalViewController.h"
#import "CheckOutModalViewController.h"
#import "BooksViewController.h"
#import "Constants.h"
#import "UIButton+AppButton.h"
#import <QuartzCore/QuartzCore.h>

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
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)checkin:(id)sender {
    // Add modal view
    CheckInModalViewController *checkinView = [self.storyboard instantiateViewControllerWithIdentifier:@"CheckInModalIndentifier"];
    
    [checkinView setTransitioningDelegate:self.transitioningDelegate];
    checkinView.modalPresentationStyle = UIModalPresentationCustom;
    [self presentViewController:checkinView animated:NO completion:nil];
}

- (void)checkout:(id)sender {
    // Add modal view
    CheckInModalViewController *checkoutView = [self.storyboard instantiateViewControllerWithIdentifier:@"CheckOutModalIndentifier"];
    
    [checkoutView setTransitioningDelegate:self.transitioningDelegate];
    checkoutView.modalPresentationStyle = UIModalPresentationCustom;
    [self presentViewController:checkoutView animated:NO completion:nil];
}

- (void)presentBooksView {
    BooksViewController *booksView = [self.storyboard instantiateViewControllerWithIdentifier:@"BooksViewIndentifier"];
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
