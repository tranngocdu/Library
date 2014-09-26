//
//  CheckInBookViewController.m
//  Library
//
//  Created by Yui on 9/9/14.
//  Copyright (c) 2014 Yui. All rights reserved.
//

#import "CheckInBookViewController.h"
#import "HomeViewController.h"
#import "UIButton+AppButton.h"
#import "Utilities.h"
#import <Parse/Parse.h>

@interface CheckInBookViewController ()

@end

@implementation CheckInBookViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void) decorate {
    [_btnCheckin setAppButtonHasBackgroundColor:NO withColor:UIColorFromRGB(kAppGray)];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view.
    [self.navigationItem setTitle:@"Check In"];
    [self decorate];
}

- (void)viewDidAppear:(BOOL)animated {
    // Get book by id
    PFQuery *query = [PFQuery queryWithClassName:@"NewBook"];
    [query getObjectInBackgroundWithId:bookId block:^(PFObject *object, NSError *error) {
        if (!error) {
            book = object;
            // Set view
            _lblBookTitle.text = book[@"title"];
            _lblBookAuthor.text = book[@"author"];
            _lblBookISBN.text = book[@"ISBN"];
            _lblBookQuantityAvailable.text = [NSString stringWithFormat:@"%@ Available", book[@"quantity_available"]];
            NSString *imageUrl = book[@"cover_image"];
            [NSURLConnection sendAsynchronousRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:imageUrl]] queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
                _imgBookCover.image = [UIImage imageWithData:data];
            }];
            
            students = book[@"studentList"];
            [_tbvListStudents reloadData];
        } else {
            NSLog(@"Error: %@", error);
            Utilities *utilities = [[Utilities alloc] init];
            [utilities showAlertWithTitle:@"Error" withMessage:@"Server error"];
        }
    }];
}

- (void)setBookId:(NSString *)objectId {
    bookId = objectId;
}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [students count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *cellIdentifier = @"CheckInStudentCell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier];
    
    if(cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellIdentifier];
    }
    
//    PFObject *std  = [students objectAtIndex:indexPath.row];
    cell.textLabel.text = @"asdasds";
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    student = [students objectAtIndex:indexPath.row];
    UITableViewCell *cell = [tableView  cellForRowAtIndexPath:indexPath];
    cell.accessoryType = UITableViewCellAccessoryCheckmark;
}

- (void)tableView:(UITableView *)tableView didDeselectRowAtIndexPath:(NSIndexPath *)indexPath {
    student = [students objectAtIndex:indexPath.row];
    UITableViewCell *cell = [tableView  cellForRowAtIndexPath:indexPath];
    cell.accessoryType = UITableViewCellAccessoryNone;
}

- (void)checkin:(id)sender {
    Utilities *utilities = [[Utilities alloc] init];
    // Get book informations
    PFQuery *query = [PFQuery queryWithClassName:@"NewBook"];
    NSLog(@"fetch book with id: %@", book.objectId);
    [query getObjectInBackgroundWithId:book.objectId block:^(PFObject *object, NSError *error) {
        if (!error) {
            // Check available quantity
            int quantityAvailable = [book[@"quantity_available"] intValue];
            // Increase available books 1
            quantityAvailable = quantityAvailable + 1;
            
            // Recalculate quantity out
            int quantityTotal = [book[@"quantity_total"] intValue];
            int quantityOut = quantityTotal - quantityAvailable;
            
            book[@"quantity_available"] = @(quantityAvailable);
            book[@"quantity_out"] = @(quantityOut);
            
            [book saveInBackgroundWithBlock:^(BOOL succeeded, NSError *error) {
                if (!error) {
                    // Move to home view
                    HomeViewController *homeView = [self.storyboard instantiateViewControllerWithIdentifier:@"TabBarIndetifier"];
                    [self.navigationController presentViewController:homeView animated:YES completion:^{
                        [utilities showAlertWithTitle:@"Library" withMessage:@"Back on the shelf!"];
                    }];
                } else {
                    NSLog(@"Error: %@", error);
                    [utilities showAlertWithTitle:@"Error" withMessage:@"Server error"];
                }
            }];
        } else {
            NSLog(@"Error: %@", error);
            [utilities showAlertWithTitle:@"Error" withMessage:@"Server error"];
        }
    }];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
