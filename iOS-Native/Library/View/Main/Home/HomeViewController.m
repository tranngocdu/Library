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
        NSString *cheatISBN = @"123456789";
        NSString *cheatType = @"org.iso.QRCode";
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

- (void)barcodeReader:(BarcodeReaderViewController *)barcodeReader onFoundItem:(NSString *)content withType:(NSString *)type
{
    NSLog(@"Detected Item: %@, contentType %@, modalType: %d", content, type, actionModalType);

#warning Hinh nhu ben Checkin, Check ViewCOntroller cua e da xu ly cai nay roi ha?
    PFUser *currentUser = [PFUser currentUser];
    PFQuery *query = [PFQuery queryWithClassName:@"NewBook"];
    [query whereKey:@"ISBN" equalTo:content];
    [query whereKey:@"User" equalTo:currentUser.objectId];

    [query findObjectsInBackgroundWithBlock:^(NSArray *objects, NSError *error) {
        if(!error) {
            NSLog(@"%@", objects);
            
            if(actionModalType == 1) {
                // Checkin

            } else {
                // Checkout
                
            }

        } else {
            Utilities *utilities = [[Utilities alloc] init];
            [utilities showAlertWithTitle:@"Error" withMessage:@"Server error"];
        }
    }];

    // Check to ignore case of Simulator not show Barcode Reader View Controller
    if([self.navigationController.viewControllers count] > 1) {
        [self.navigationController popViewControllerAnimated:YES];
    }
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
