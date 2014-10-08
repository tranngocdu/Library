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
    [[Utilities share] showLoading];
    // Get book by id
    PFQuery *query = [PFQuery queryWithClassName:@"NewBook"];
    [query whereKey:@"ISBN" equalTo:bookISBN];
    [query whereKey:@"User" equalTo:[PFUser currentUser].objectId];
    [query findObjectsInBackgroundWithBlock:^(NSArray *objects, NSError *error) {
        if (!error) {
            book = [objects objectAtIndex:0];
            // Set view
            _lblPickName.hidden = NO;
            _btnCheckin.hidden = NO;
            
            _lblBookTitle.text = book[@"title"];
            _lblBookAuthor.text = book[@"author"];
            _lblBookISBN.text = book[@"ISBN"];
            _lblBookQuantityAvailable.text = [NSString stringWithFormat:@"%@ Available", book[@"quantity_available"]];
            NSString *imageUrl = book[@"cover_image"];
            [NSURLConnection sendAsynchronousRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:imageUrl]] queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
                _imgBookCover.image = [UIImage imageWithData:data];
            }];

            // If have students checked out, load students informations
            if ([book[@"studentList"] count] > 0) {
                NSMutableArray *stds = [[NSMutableArray alloc] init];
                for (PFObject *std in book[@"studentList"]) {
                    if([[std allKeys] count] > 0) {
                        if (![std[@"objectId"] isEqualToString:@""]) {
                            [stds addObject:std[@"objectId"]];
                        } else {
                            [stds addObject:std.objectId];
                        }
                    } else if (std.objectId) {
                        [stds addObject:std.objectId];
                    }
                }
                // stop when no student in the list
                if([stds count] > 0) {
                    PFQuery *stdQuery = [PFQuery queryWithClassName:@"Student"];
                    [stdQuery whereKey:@"objectId" containedIn:stds];
                    
                    [stdQuery findObjectsInBackgroundWithBlock:^(NSArray *objects, NSError *error) {
                        students = (NSMutableArray *)objects;
                        _tbvListStudents.hidden = NO;
                        [_tbvListStudents reloadData];
                    }];
                }
            }
        } else {
            NSLog(@"Error: %@", error);
            [[Utilities share] showAlertWithTitle:@"Error" withMessage:@"Server error"];
        }
        [[Utilities share] hideLoading];
    }];
}

- (void)setBookISBN:(NSString *)isbn {
    bookISBN = isbn;
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
    
    PFObject *std  = [students objectAtIndex:indexPath.row];
    cell.textLabel.text = std[@"Name"];
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
    [[Utilities share] showLoading];
    // Get book informations
    PFQuery *query = [PFQuery queryWithClassName:@"NewBook"];
    NSLog(@"fetch book with id: %@", book.objectId);
    [query getObjectInBackgroundWithId:book.objectId block:^(PFObject *object, NSError *error) {
        if (!error) {
            book = object;
            // Slice student out of studentList
            NSInteger count = [students count];
            for (NSInteger index = (count - 1); index >= 0; index--) {
                PFObject *std = students[index];
                if ([std.objectId isEqualToString:student.objectId]) {
                    [students removeObjectAtIndex:index];
                }
            }
            book[@"studentList"] = students;
            
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
                [[Utilities share] hideLoading];
                if (!error) {
                    // Move to home view
                    HomeViewController *homeView = [self.storyboard instantiateViewControllerWithIdentifier:@"TabBarIndetifier"];
                    [self.navigationController presentViewController:homeView animated:YES completion:^{
                        [[Utilities share] showAlertWithTitle:@"Library" withMessage:@"Back on the shelf!"];
                    }];
                } else {
                    NSLog(@"Error: %@", error);
                    [[Utilities share] showAlertWithTitle:@"Error" withMessage:@"Server error"];
                }
            }];
        } else {
            NSLog(@"Error: %@", error);
            [[Utilities share] hideLoading];
            [[Utilities share] showAlertWithTitle:@"Error" withMessage:@"Server error"];
        }
    }];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
