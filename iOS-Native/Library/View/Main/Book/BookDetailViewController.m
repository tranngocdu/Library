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
    CGFloat scrollViewHeight = 0.0f;
    for (UIView* view in _scroller.subviews) {
        scrollViewHeight += view.frame.size.height;
    }
    
    [_scroller setScrollEnabled:YES];
    [_scroller setContentSize:CGSizeMake(320, scrollViewHeight)];
    [super viewDidLoad];
    [self decorate];
    // Do any additional setup after loading the view.
    [self.navigationItem setTitle:@"Book Detail"];
    
    // Hide all buttons
    [self setAllButtonsHidden:YES];
}

- (void)viewDidAppear:(BOOL)animated {
    NSLog(@"Load book");
    // Get book informations
    PFQuery *query = [PFQuery queryWithClassName:@"NewBook"];
    [query getObjectInBackgroundWithId:bookId block:^(PFObject *object, NSError *error) {
        if(!error) {
            book = object;
            _lblBookTitle.text = book[@"title"];
            _lblBookAuthor.text = book[@"author"];
            _lblBookISBN.text = [NSString stringWithFormat:@"ISBN: %@",  book[@"ISBN"]];
            _lblBookQuantityTotal.text = [NSString stringWithFormat:@"%@ Total  /", book[@"quantity_total"]];
            _lblBookQuantityAvailable.text = [NSString stringWithFormat:@"%@ Available", book[@"quantity_available"]];
            NSString *imageUrl = book[@"cover_image"];
            [NSURLConnection sendAsynchronousRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:imageUrl]] queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
                _imgBookCover.image = [UIImage imageWithData:data];
            }];
            
            // Enable buttons
            [self setAllButtonsHidden:NO];
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

- (void)setAllButtonsHidden:(BOOL)isHidden {
    _btnCheckinBook.hidden = isHidden;
    _btnCheckoutBook.hidden = isHidden;
    _btnEditBook.hidden = isHidden;
    _btnRemoveBook.hidden = isHidden;
}

- (void)addBookManual:(id)sender {
    EditBookViewController *editView = [self.storyboard instantiateViewControllerWithIdentifier:@"AddBookManualIndentifier"];
    [self.navigationController pushViewController:editView animated:YES];
}

- (void)checkoutBook:(id)sender {
    CheckOutBookViewController *checkoutView = [self.storyboard instantiateViewControllerWithIdentifier:@"CheckoutBookIndentifier"];
    [checkoutView setBook:book];
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
                                                       message: [NSString stringWithFormat:@"Are you sure you wish to remove %@ from your collection?", book[@"title"]]
                                                      delegate:self
                                             cancelButtonTitle:@"No"
                                             otherButtonTitles:@"Yes", nil];
    [theAlert show];
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
    // If yes
    if (buttonIndex == 1) {
        NSLog(@"YES");
    }
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
