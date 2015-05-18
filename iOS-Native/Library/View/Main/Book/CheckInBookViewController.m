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
                    if ([[std allKeys] count] == 0) {
                        
                    } else if([[std allKeys] count] > 0) {
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
                        [self reloadData:students];
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

    static NSString *cellIdentifier = @"CheckInStudentCell";
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

    UITableViewCell *cell = [tableView  cellForRowAtIndexPath:indexPath];
    cell.accessoryType = UITableViewCellAccessoryNone;
}

- (void)checkin:(id)sender {
    if(!student) {
        [[Utilities share] showAlertWithTitle:@"Library" withMessage:@"Please pick a student"];
    } else {
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
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
