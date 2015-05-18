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
    [[Utilities share] showLoading];
    // Get book by id
    PFQuery *query = [PFQuery queryWithClassName:@"NewBook"];
    [query whereKey:@"ISBN" equalTo:bookISBN];
    [query whereKey:@"User" equalTo:[PFUser currentUser].objectId];
    [query findObjectsInBackgroundWithBlock:^(NSArray *objects, NSError *error) {
        if (!error) {
            book = [objects objectAtIndex:0];
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
                    [self reloadData:students];
                } else {
                    NSLog(@"Error: %@", error);
                    [[Utilities share] showAlertWithTitle:@"Error" withMessage:@"Server error"];
                }
                [[Utilities share] hideLoading];
            }];
        } else {
            NSLog(@"Error: %@", error);
            [[Utilities share] showAlertWithTitle:@"Error" withMessage:@"Server error"];
            [[Utilities share] hideLoading];
        }
    }];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)setBookISBN:(NSString *)isbn {
    bookISBN = isbn;
}

- (void) reloadData:(NSArray*)inArray {
    [self sectionization:inArray];
    [_tbvListStudents reloadData];
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

    NSString *key = displaySortHeader[indexPath.section];
    PFObject *std = [[displayList objectForKey:key] objectAtIndex:indexPath.row];

    static NSString *cellIdentifier = @"CheckOutStudentCell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier];
    
   if(cell == nil) {
       cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellIdentifier];
    }

    cell.textLabel.text = std[@"Name"];
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    NSString *key = displaySortHeader[indexPath.section];
    student = [[displayList objectForKey:key] objectAtIndex:indexPath.row];

    UITableViewCell *cell = [tableView  cellForRowAtIndexPath:indexPath];
    cell.accessoryType = UITableViewCellAccessoryCheckmark;
}

- (void)tableView:(UITableView *)tableView didDeselectRowAtIndexPath:(NSIndexPath *)indexPath {
    NSString *key = displaySortHeader[indexPath.section];
    student = [[displayList objectForKey:key] objectAtIndex:indexPath.row];

    UITableViewCell *cell = [tableView cellForRowAtIndexPath:indexPath];
    cell.accessoryType = UITableViewCellAccessoryNone;
}

- (void)checkout:(id)sender {
    if(!student) {
        [[Utilities share] showAlertWithTitle:@"Library" withMessage:@"Please pick a student"];
    } else {
        [[Utilities share] showLoading];

        // Get book informations
        PFQuery *query = [PFQuery queryWithClassName:@"NewBook"];
        NSLog(@"fetch book with id: %@", book.objectId);
        [query getObjectInBackgroundWithId:book.objectId block:^(PFObject *object, NSError *error) {
            if (!error) {
                // Check available quantity
                int quantityAvailable = [book[@"quantity_available"] intValue];
                if (quantityAvailable <= 0) {
                    [[Utilities share] hideLoading];
                    [[Utilities share] showAlertWithTitle:@"Oops!" withMessage:@"All copies has been checked out!"];
                } else {
                    bool isExist = false;
                    
                    NSLog(@"%@", book[@"studentList"]);
                    
                    // Check user is in book students list or not
                    for (PFObject *std in book[@"studentList"]){
                        if ([[std allKeys] count] == 0) {
                            NSLog(@"Do Nothing");
                        } else if([[std allKeys] count] > 0) {
                            if (![std[@"objectId"] isEqualToString:@""]) {
                                if([std[@"objectId"] isEqual:student.objectId]) {
                                    isExist = true;
                                }
                            } else {
                                if([std.objectId isEqual:student.objectId]) {
                                    isExist = true;
                                }
                            }
                        } else if (std.objectId) {
                            if([std.objectId isEqual:student.objectId]) {
                                isExist = true;
                            }
                        }
                    }
                    
                    // If not exist, push student to students list
                    if (!isExist) {
                        NSMutableArray *studentList = (NSMutableArray *)book[@"studentList"];
                        
                        NSArray *objects=[[NSArray alloc]initWithObjects:student.objectId, student[@"Name"],nil];
                        NSArray *keys=[[NSArray alloc]initWithObjects:@"objectId", @"Name" ,nil];
                        NSDictionary *dict=[NSDictionary dictionaryWithObjects:objects forKeys:keys];
                        
                        [studentList addObject:dict];
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
                                    [[Utilities share] showAlertWithTitle:@"Library" withMessage:@"Happy reading!"];
                                }];
                            } else {
                                NSLog(@"Error: %@", error);
                                [[Utilities share] showAlertWithTitle:@"Error" withMessage:@"Server error"];
                            }
                            [[Utilities share] hideLoading];
                        }];
                    } else {
                        [[Utilities share] hideLoading];
                        [[Utilities share] showAlertWithTitle:@"Library" withMessage:@"This student has been checked out!"];
                    }
                }
            } else {
                NSLog(@"Error: %@", error);
                [[Utilities share] hideLoading];
                [[Utilities share] showAlertWithTitle:@"Error" withMessage:@"Server error"];
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
