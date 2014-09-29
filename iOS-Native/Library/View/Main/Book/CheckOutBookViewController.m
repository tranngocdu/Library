//
//  CheckOutBookViewController.m
//  Library
//
//  Created by Tien Nguyen Thanh on 9/2/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import "CheckOutBookViewController.h"
#import "HomeViewController.h"
#import "UIButton+AppButton.h"
#import "Utilities.h"
#import <Parse/Parse.h>

@interface CheckOutBookViewController ()

@end

@implementation CheckOutBookViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void) decorate {
    [_btnCheckout setAppButtonHasBackgroundColor:NO withColor:UIColorFromRGB(kAppGray)];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    [self.navigationItem setTitle:@"Check Out"];
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
            
            // Load list students
            PFUser *currentUser = [PFUser currentUser];
            PFQuery *query = [PFQuery queryWithClassName:@"Student"];
            [query whereKey:@"UserId" equalTo:currentUser.objectId];
            [query orderByDescending:@"createdAt"];
            [query findObjectsInBackgroundWithBlock:^(NSArray *objects, NSError *error) {
                if(!error) {
                    students = objects;
                    [_tbvListStudents reloadData];
                } else {
                    NSLog(@"Error: %@", error);
                    Utilities *utilities = [[Utilities alloc] init];
                    [utilities showAlertWithTitle:@"Error" withMessage:@"Server error"];
                }
            }];
        } else {
            NSLog(@"Error: %@", error);
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

- (void)setBookId:(NSString *)objectId {
    bookId = objectId;
}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [students count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *cellIdentifier = @"CheckOutStudentCell";
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
    UITableViewCell *cell = [tableView cellForRowAtIndexPath:indexPath];
    cell.accessoryType = UITableViewCellAccessoryNone;
}

- (void)checkout:(id)sender {
    Utilities *utilities = [[Utilities alloc] init];
    if(!student) {
        [utilities showAlertWithTitle:@"Library" withMessage:@"Please pick a student"];
    } else {
        // Get book informations
        PFQuery *query = [PFQuery queryWithClassName:@"NewBook"];
        NSLog(@"fetch book with id: %@", book.objectId);
        [query getObjectInBackgroundWithId:book.objectId block:^(PFObject *object, NSError *error) {
            if (!error) {
                // Check available quantity
                int quantityAvailable = [book[@"quantity_available"] intValue];
                if (quantityAvailable <= 0) {
                    [utilities showAlertWithTitle:@"Oops!" withMessage:@"All copies has been checked out!"];
                } else {
                    bool isExist = false;
                    // Check user is in book students list or not
                    for (PFObject *std in book[@"studentList"]){
                        if([std.objectId isEqual:student.objectId]) {
                            isExist = true;
                        }
                    }
                    
                    // If not exist, push student to students list
                    if (!isExist) {
                        NSMutableArray *studentList = (NSMutableArray *)book[@"studentList"];
                        
                        PFObject *studentInfo = [PFObject objectWithClassName:@"Student"];
                        studentInfo[@"Name"] = student[@"Name"];
                        studentInfo.objectId = student.objectId;
                        
                        [studentList addObject:studentInfo];
                        book[@"studentList"] = studentList;
                        
                        // Reduce available books 1
                        quantityAvailable = quantityAvailable -1;
                        
                        // Recalculate quantity out
                        int quantityTotal = [book[@"quantity_total"] intValue];
                        int quantityOut = quantityTotal - quantityAvailable;
                        
                        book[@"quantity_available"] = @(quantityAvailable);
                        book[@"quantity_out"] = @(quantityOut);
                        
                        NSLog(@"Checked out");
                        
                        [book saveInBackgroundWithBlock:^(BOOL succeeded, NSError *error) {
                            if (!error) {
                                // Move to home view
                                HomeViewController *homeView = [self.storyboard instantiateViewControllerWithIdentifier:@"TabBarIndetifier"];
                                [self.navigationController presentViewController:homeView animated:YES completion:^{
                                    [utilities showAlertWithTitle:@"Library" withMessage:@"Happy reading!"];
                                }];
                            } else {
                                NSLog(@"Error: %@", error);
                                [utilities showAlertWithTitle:@"Error" withMessage:@"Server error"];
                            }
                        }];
                    } else {
                        [utilities showAlertWithTitle:@"Library" withMessage:@"This student has been checked out!"];
                    }
                }
            } else {
                NSLog(@"Error: %@", error);
                [utilities showAlertWithTitle:@"Error" withMessage:@"Server error"];
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
