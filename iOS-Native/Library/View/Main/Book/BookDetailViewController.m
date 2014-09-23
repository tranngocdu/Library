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
#import "UIButton+AppButton.h"
#import "Utilities.h"
#import <Parse/Parse.h>

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
    [_btnCheckoutBook setAppButtonHasBackgroundColor:YES withColor:UIColorFromRGB(kAppGreen)];
    [_btnCheckinBook setAppButtonHasBackgroundColor:NO withColor:UIColorFromRGB(kAppRed)];
    [_btnEditBook setAppButtonHasBackgroundColor:NO withColor:UIColorFromRGB(kAppGreen)];
    [_btnRemoveBook setAppButtonHasBackgroundColor:YES withColor:UIColorFromRGB(kAppRed)];
}

- (void)viewDidLoad {
    CGRect screenRect = [[UIScreen mainScreen] bounds];
    CGFloat screenWidth = screenRect.size.width;
    CGFloat screenHeight = screenRect.size.height;
    [_scroller setScrollEnabled:YES];
    [_scroller setContentSize:CGSizeMake(screenWidth, screenHeight)];
    [super viewDidLoad];
    [self decorate];
    // Do any additional setup after loading the view.
    [self.navigationItem setTitle:@"Book Detail"];
}

- (void)viewDidAppear:(BOOL)animated {
    // Get book informations
    PFQuery *query = [PFQuery queryWithClassName:@"NewBook"];
    [query getObjectInBackgroundWithId:bookId block:^(PFObject *book, NSError *error) {
        if(!error) {
            NSLog(@"%@", book);
            _lblBookTitle.text = book[@"title"];
            _lblBookAuthor.text = book[@"author"];
            _lblBookISBN.text = book[@"ISBN"];
            _lblBookQuantity.text = [NSString stringWithFormat:@"%@ total / %@ Available", book[@"quantity_total"], book[@"quantity_available"]];
            NSString *imageUrl = book[@"cover_image"];
            [NSURLConnection sendAsynchronousRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:imageUrl]] queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
                _imgBookCover.image = [UIImage imageWithData:data];
            }];
        } else {
            NSLog(@"%@", error);
            Utilities *utilities = [[Utilities alloc] init];
            [utilities showAlertWithTitle:@"Error" withMessage:@"Server error"];
        }
    }];

}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)setBookId:(NSString *)bId {
    bookId = bId;
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
    NSLog(@"%ld", (long)buttonIndex);
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
