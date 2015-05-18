//
//  BookDetailViewController.m
//  Library
//
//  Created by Tien Nguyen Thanh on 9/2/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import "BookDetailViewController.h"
#import "CheckOutBookViewController.h"
#import "CheckInBookViewController.h"
#import "EditBookViewController.h"
#import "UIButton+AppButton.h"
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
    [super viewDidLoad];
    [self decorate];
    // Do any additional setup after loading the view.
    [self.navigationItem setTitle:@"Book Detail"];
}

- (void)viewDidAppear:(BOOL)animated {
    [[Utilities share] showLoading];
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
            NSLog(@"%@", book);
            // If have students checked out, load students informations
            if ([book[@"studentList"] count] > 0) {
                NSMutableArray *stds = [[NSMutableArray alloc] init];
                for (PFObject *std in book[@"studentList"]) {
                    if ([[std allKeys] count] == 0) {
                        NSLog(@"1");
                    } else if([[std allKeys] count] > 0) {
                        if (![std[@"objectId"] isEqualToString:@""]) {
                            NSLog(@"2");
                            [stds addObject:std[@"objectId"]];
                        } else {
                            NSLog(@"3");
                            [stds addObject:std.objectId];
                        }
                    } else if (std.objectId) {
                        NSLog(@"4");
                        [stds addObject:std.objectId];
                    }
                }

                // stop when no student in the list
                if([stds count] <= 0) {
                    _viewButtons.hidden = NO;
                    _tbvStudentsLoaned.hidden = YES;
                    [self adjustScrollSize];

                    return;
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
                    [self reloadData:studentsList];
                    
                    // after set data show the view
                    _lblLoaned.hidden = NO;
                    _tbvStudentsLoaned.hidden = NO;
                    _viewButtons.hidden = NO;

                    [self adjustScrollSize];
                }];
            } else {
                _viewButtons.hidden = NO;
                _tbvStudentsLoaned.hidden = YES;
                [self adjustScrollSize];
            }
        } else {
            NSLog(@"AA %@", error);
            [[Utilities share] showAlertWithTitle:@"Error" withMessage:@"Server error"];
            _viewButtons.hidden = NO;
            [self adjustScrollSize];
        }
    }];
}

- (void) adjustScrollSize {
    CGFloat height = _viewButtons.frame.origin.y + _viewButtons.frame.size.height + 5;

    CGRect r = _tbvStudentsLoaned.frame;
    r.origin.y = height + 5;

    height += _tbvStudentsLoaned.frame.size.height + 5;
    r.size.height = height - 5 - r.origin.y;
    _tbvStudentsLoaned.frame = r;

    _scroller.contentSize = CGSizeMake(self.view.frame.size.width, height);
    [[Utilities share] hideLoading];
}

- (void) reloadData:(NSArray*)inArray {
    [self sectionization:inArray];
    [_tbvStudentsLoaned reloadData];
}

- (void) sectionization:(NSArray*)inArray {
    NSMutableDictionary *resultDic = [NSMutableDictionary dictionary];

    for(int i=0; i<[inArray count]; i++) {
        NSDictionary *item = inArray[i];

        NSString *title = item[@"Name"];
        NSString *firstLetter = [[title substringToIndex:1] uppercaseString];

        NSMutableArray *subList = resultDic[firstLetter];
        if(!subList) {
            subList = [[NSMutableArray alloc] init];
            [resultDic setObject:subList forKey:firstLetter];
        }

        [subList addObject:item];
    }

    // Sort ABC
    displaySortHeader = [[resultDic allKeys] sortedArrayUsingSelector:@selector(compare:)];

    // assign to Data List
    displayList = resultDic;
}

- (NSArray *)sectionIndexTitlesForTableView:(UITableView *)tableView {
    NSMutableArray *fullArray = [NSMutableArray arrayWithArray:[@"A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z" componentsSeparatedByString:@","]];

    for(int i=0; i<[displaySortHeader count]; i++) {
        NSString *letter = displaySortHeader[i];
        if(![fullArray containsObject:letter]) {
            [fullArray addObject:letter];
        }
    }

    return [fullArray sortedArrayUsingSelector:@selector(compare:)]; //displaySortHeader;
}

- (NSInteger) tableView:(UITableView *)tableView sectionForSectionIndexTitle:(NSString *)title atIndex:(NSInteger)index {
    NSInteger section = [displaySortHeader indexOfObject:title];
    return section;
}

- (NSString*) tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section {
    return displaySortHeader[section];
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return [displaySortHeader count];
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    NSString *key = displaySortHeader[section];
    return [displayList[key] count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *cellIdentifier = @"studentCell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier];

    NSString *key = displaySortHeader[indexPath.section];
    PFObject *student = [[displayList objectForKey:key] objectAtIndex:indexPath.row];

    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellIdentifier];
    }

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

- (void)checkoutBook:(id)sender {
    CheckOutBookViewController *checkoutView = [self.storyboard instantiateViewControllerWithIdentifier:@"CheckoutBookIndentifier"];
    [checkoutView setBookISBN:book[@"ISBN"]];
    [self.navigationController pushViewController:checkoutView animated:YES];
}

- (void)checkinBook:(id)sender {
    CheckInBookViewController *checkinView = [self.storyboard instantiateViewControllerWithIdentifier:@"CheckinBookIndentifier"];
    [checkinView setBookISBN:book[@"ISBN"]];
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
        [[Utilities share] showLoading];
        [book deleteInBackgroundWithBlock:^(BOOL succeeded, NSError *error) {
            [[Utilities share] hideLoading];
            if (!error) {
                [self.navigationController popViewControllerAnimated:YES];
            } else {
                NSLog(@"Error: %@", error);
                [[Utilities share] showAlertWithTitle:@"Error" withMessage:@"Server error."];
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
