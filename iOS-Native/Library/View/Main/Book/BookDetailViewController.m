//
//  BookDetailViewController.m
//  Library
//
//  Created by Tien Nguyen Thanh on 9/2/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import "BookDetailViewController.h"
#import "AddBookManualViewController.h"
#import "CheckOutBookViewController.h"
#import "CheckInBookViewController.h"
#import "EditBookViewController.h"

@interface BookDetailViewController ()

@end

@implementation BookDetailViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void) decorate
{
    _btnCheckinBook.layer.cornerRadius = 5.0;
    _btnCheckinBook.layer.borderWidth = 1.0f;
    _btnCheckinBook.layer.borderColor = [UIColorFromRGB(kAppRed) CGColor];
    _btnCheckinBook.layer.backgroundColor = nil;
    [_btnCheckinBook setTitleColor:UIColorFromRGB(kAppRed) forState:UIControlStateNormal];
    
    _btnEditBook.layer.cornerRadius = 5.0;
    _btnEditBook.layer.borderWidth = 1.0f;
    _btnEditBook.layer.borderColor = [UIColorFromRGB(kAppGreen) CGColor];
    _btnEditBook.layer.backgroundColor = nil;
    [_btnEditBook setTitleColor:UIColorFromRGB(kAppGreen) forState:UIControlStateNormal];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self decorate];
    // Do any additional setup after loading the view.
    [self.navigationItem setTitle:@"Book Detail"];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)addBookManual:(id)sender {
    EditBookViewController *editView = [self.storyboard instantiateViewControllerWithIdentifier:@"AddBookManualIndentifier"];
    [self.navigationController pushViewController:editView animated:YES];
}

- (void)checkoutBook:(id)sender {
    CheckOutBookViewController *checkoutView = [self.storyboard instantiateViewControllerWithIdentifier:@"CheckoutBookIndentifier"];
    [self.navigationController pushViewController:checkoutView animated:YES];
}

- (void)checkinBook:(id)sender {
    CheckInBookViewController *checkinView = [self.storyboard instantiateViewControllerWithIdentifier:@"CheckinBookIndentifier"];
    [self.navigationController pushViewController:checkinView animated:YES];
}

- (void)editBook:(id)sender {
    NSLog(@"Edit book");
}

- (IBAction)removeBook:(id)sender {
    UIAlertView *theAlert = [[UIAlertView alloc] initWithTitle:@"Confirmation"
                                                       message:@"Are you sure you wish to remove XXX from your collection?"
                                                      delegate:self
                                             cancelButtonTitle:@"No"
                                             otherButtonTitles:@"Yes", nil];
    [theAlert show];
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
    NSLog(@"%ld", buttonIndex);
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
