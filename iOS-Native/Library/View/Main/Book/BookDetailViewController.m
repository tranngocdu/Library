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
}

- (void)viewDidAppear:(BOOL)animated {
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
            
            // If have students checked out, load students informations
            if ([book[@"studentList"] count] > 0) {
                NSMutableArray *stds = [[NSMutableArray alloc] init];
                for (PFObject *std in book[@"studentList"]) {
                    [stds addObject:std.objectId];
                }
                
                PFQuery *stdQuery = [PFQuery queryWithClassName:@"Student"];
                [stdQuery whereKey:@"objectId" containedIn:stds];
                
                [stdQuery findObjectsInBackgroundWithBlock:^(NSArray *objects, NSError *error) {
                    studentsList = objects;
                    
                    // Set height of table view
                    int rowHeight = 44;
                    float tbvHeight = rowHeight * [studentsList count];
                    _tbvStudentsLoaned.frame = CGRectMake(_tbvStudentsLoaned.frame.origin.x, _tbvStudentsLoaned.frame.origin.y, _tbvStudentsLoaned.frame.size.width, tbvHeight);

                    CGRect theFrame = [_viewButtons frame];
                    theFrame.origin.y = _tbvStudentsLoaned.frame.origin.y + tbvHeight + 15;
                    
                    self.viewButtons.frame = theFrame;
                    [_tbvStudentsLoaned reloadData];
                    
                    // after set data show the view
                    _lblLoaned.hidden = NO;
                    _tbvStudentsLoaned.hidden = NO;
                    _viewButtons.hidden = NO;
                    
                    [self performSelector:@selector(test) withObject:nil afterDelay:5];
                }];
            }
        } else {
            NSLog(@"%@", error);
            Utilities *utilities = [[Utilities alloc] init];
            [utilities showAlertWithTitle:@"Error" withMessage:@"Server error"];
            _viewButtons.hidden = NO;
        }
    }];
}

- (void) test
{
                        NSLog(@"%@", NSStringFromCGRect(_viewButtons.frame));
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [studentsList count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *cellIdentifier = @"studentCell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier];
    
    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellIdentifier];
    }
    PFObject *student = [studentsList objectAtIndex:indexPath.row];
    cell.textLabel.text = student[@"Name"];
    
    return cell;
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
    [checkoutView setBookId:book.objectId];
    [self.navigationController pushViewController:checkoutView animated:YES];
}

- (void)checkinBook:(id)sender {
    CheckInBookViewController *checkinView = [self.storyboard instantiateViewControllerWithIdentifier:@"CheckinBookIndentifier"];
    [checkinView setBookId:book.objectId];
    [self.navigationController pushViewController:checkinView animated:YES];
}

- (void)editBook:(id)sender {
    EditBookViewController *editView = [self.storyboard instantiateViewControllerWithIdentifier:@"EditBookIdentifier"];
    [editView setBookId:book.objectId];
    [self.navigationController pushViewController:editView animated:YES];
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
        [book deleteInBackgroundWithBlock:^(BOOL succeeded, NSError *error) {
            if (!error) {
                [self.navigationController popViewControllerAnimated:YES];
            } else {
                NSLog(@"Error: %@", error);
                Utilities *utilities = [[Utilities alloc] init];
                [utilities showAlertWithTitle:@"Error" withMessage:@"Server error."];
            }
        }];
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
