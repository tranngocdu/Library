//
//  HomeViewController.m
//  Library
//
//  Created by Tien Nguyen Thanh on 9/2/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import "HomeViewController.h"
#import "CheckInModalViewController.h"
#import "CheckInBookViewController.h"
#import "CheckOutBookViewController.h"
#import "BooksViewController.h"
#import "Constants.h"
#import "UIButton+AppButton.h"
#import <QuartzCore/QuartzCore.h>
#import <Parse/Parse.h>
#import "BarcodeReaderViewController.h"
#import "Utilities.h"

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
    [self.tabBarController.tabBar setTintColor:UIColorFromRGB(kAppRed)];
}

- (void)viewWillAppear:(BOOL)animated
{
    NSLog(@"viewWillAppear -------- Show tab bar when hidden");
    self.tabBarController.tabBar.hidden = NO;
}

- (void)checkinModal:(CheckInModalViewController *)checkInModal type:(int)type onClickAt:(int)buttonIndex
{
    NSLog(@"Click at : %d, %d", type, buttonIndex);

    if(buttonIndex == 1) {
        // Scan

#if TARGET_IPHONE_SIMULATOR
        NSString *cheatISBN = @"9781234567897";
        NSString *cheatType = @"org.gs1.EAN-13";
        [self barcodeReader:nil onFoundItem:cheatISBN withType:cheatType];
#else
        BarcodeReaderViewController *barcodeReader = [[BarcodeReaderViewController alloc] initWithDelegate:self];
        [self.navigationController pushViewController:barcodeReader animated:YES];
        self.tabBarController.tabBar.hidden = YES;
#endif

    } else if(buttonIndex == 2) {
        // List
        [self.tabBarController setSelectedIndex:1];

    } else if(buttonIndex == 3) {
        // Cancel

    }
}

- (void)barcodeReaderOnCancel:(BarcodeReaderViewController *)barcodeReader
{
    if([self.navigationController.viewControllers count] > 1) {
        [self.navigationController popViewControllerAnimated:YES];
    }
}

- (void)barcodeReader:(BarcodeReaderViewController *)barcodeReader onFoundItem:(NSString *)content withType:(NSString *)type
{
    // Check to ignore case of Simulator not show Barcode Reader View Controller
    if([self.navigationController.viewControllers count] > 1) {
        [self.navigationController popViewControllerAnimated:YES];
    }
    
    Utilities *utilities = [[Utilities alloc] init];
    
    NSLog(@"Detected Item: %@, contentType %@, modalType: %d", content, type, actionModalType);

    PFUser *currentUser = [PFUser currentUser];
    PFQuery *query = [PFQuery queryWithClassName:@"NewBook"];
    [query whereKey:@"ISBN" equalTo:content];
    [query whereKey:@"User" equalTo:currentUser.objectId];

    [query findObjectsInBackgroundWithBlock:^(NSArray *objects, NSError *error) {
        if(!error) {
            if ([objects count] > 0) {
                PFObject *book = [objects objectAtIndex:0];
                if(actionModalType == 1) {
                    // Checkin
                    CheckInBookViewController *checkinView = [self.storyboard instantiateViewControllerWithIdentifier:@"CheckinBookIndentifier"];
                    [checkinView setBookISBN:book[@"ISBN"]];
                    [self.navigationController pushViewController:checkinView animated:YES];
                } else {
                    // Checkout
                    CheckOutBookViewController *checkoutView = [self.storyboard instantiateViewControllerWithIdentifier:@"CheckoutBookIndentifier"];
                    [checkoutView setBookISBN:book[@"ISBN"]];
                    [self.navigationController pushViewController:checkoutView animated:YES];
                }
            } else {
                [utilities showAlertWithTitle:@"Not so quick..." withMessage:@"We couldn't find a book with that ISBN number. Please check the ISBN numbers and try again."];
            }
        } else {
            [utilities showAlertWithTitle:@"Error" withMessage:@"Server error"];
        }
    }];
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

    actionModalType = 1;
    [checkView setType:1];
    [checkView setDelegate:self];

    [self presentViewController:checkView animated:NO completion:nil];
}

- (void)checkout:(id)sender {
    // Add modal view
    CheckInModalViewController *checkView = [self.storyboard instantiateViewControllerWithIdentifier:@"CheckInModalIdentifier"];
    
    [checkView setTransitioningDelegate:self.transitioningDelegate];
    checkView.modalPresentationStyle = UIModalPresentationCustom;

    actionModalType = 2;
    [checkView setType:2];
    [checkView setDelegate:self];
    
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
