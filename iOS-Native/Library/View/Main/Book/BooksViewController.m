//
//  BooksViewController.m
//  Library
//
//  Created by hangnguyen on 9/2/14.
//  Copyright (c) 2014 hangnguyen. All rights reserved.
//

#import "BooksViewController.h"
#import "BookDetailViewController.h"
#import "EditBookViewController.h"
#import "BookCell.h"
#import "Utilties.h"
#import <Parse/Parse.h>

@interface BooksViewController ()

@end

@implementation BooksViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self)
    {
        
    }
    
    return self;
}

- (void) decorate
{
    _topTab.layer.cornerRadius = 5.0f;
    _topTab.layer.masksToBounds = YES;
    _topTab.layer.borderColor = [UIColorFromRGB(kAppPink) CGColor];
    _topTab.layer.backgroundColor = [UIColorFromRGB(kAppPink) CGColor];
    
    _topView.layer.backgroundColor = [UIColorFromRGB(kAppPink) CGColor];
//    NSLog(@"NAV: %@", self.navigationController == nil ? @" NO" : @" YES");
}

- (void)viewDidLoad {
    [super viewDidLoad];
    [self decorate];
}

- (void)viewDidAppear:(BOOL)animated {
    // Load available books
    [self loadBooksWithType:0];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [books count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *tableIndentifier = @"bookListCell";
    
    BookCell *cell = (BookCell *)[tableView
                                        dequeueReusableCellWithIdentifier:tableIndentifier
                                        forIndexPath:indexPath];
    
    // Get student
    PFObject *book = [books objectAtIndex:indexPath.row];
    cell.lblBookAuthor.text = book[@"author"];
    cell.lblBookName.text = book[@"title"];
    
    cell.lblBookQuantity.text = [NSString stringWithFormat:@"%@ available", book[@"quantity_available"]];
    
    NSString *imageUrl = book[@"cover_image"];
    [NSURLConnection sendAsynchronousRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:imageUrl]] queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse *response, NSData *data, NSError *error) {
        cell.bookPhoto.image = [UIImage imageWithData:data];
    }];

    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    NSLog(@"%ld", (long)indexPath.row);
    
    BookDetailViewController *bookDetailView = [self.storyboard instantiateViewControllerWithIdentifier:@"BookDetailIndentifier"];
    [self.navigationController pushViewController:bookDetailView animated:YES];
}

- (void)loadBooksWithType:(int)type {
    PFUser *currentUser = [PFUser currentUser];
    PFQuery *query = [PFQuery queryWithClassName:@"NewBook"];
    
    // Remove old data
    [books removeAllObjects];
    [_listBooks reloadData];
    
    [query whereKey:@"User" equalTo:currentUser.objectId];
    
    if (type == 0) {
        [query whereKey:@"quantity_available" greaterThan:@"0"];
    } else if (type == 1){
        [query whereKey:@"quantity_out" greaterThan:@0];
    }
    
    [query orderByDescending:@"createdAt"];
    query.limit = 1000;
    
    [query findObjectsInBackgroundWithBlock:^(NSArray *objects, NSError *error) {
        if(!error) {
            books = (NSMutableArray *)objects;
            // Rerender table view
            [_listBooks reloadData];
            NSLog(@"%@", books);
        } else {
            Utilties *utilities = [[Utilties alloc] init];
            [utilities showAlertWithTitle:@"Error" withMessage:@"Server error"];
        }
    }];
}

- (IBAction)segmentChanged:(id)sender {
    UISegmentedControl *segmentedControl = (UISegmentedControl *) sender;
    NSInteger selectedSegment = segmentedControl.selectedSegmentIndex;
    
    // Load available books
    if (selectedSegment == 0) {
        [self loadBooksWithType:0];
    }
    // Load checked out books
    else if (selectedSegment == 1) {
        [self loadBooksWithType:1];
    }
    // Load all books
    else if (selectedSegment == 2) {
        [self loadBooksWithType:2];
    }
}

- (void)addBookManual:(id)sender {
    EditBookViewController *editView = [self.storyboard instantiateViewControllerWithIdentifier:@"AddBookManualIndentifier"];
    [self.navigationController pushViewController:editView animated:YES];
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
