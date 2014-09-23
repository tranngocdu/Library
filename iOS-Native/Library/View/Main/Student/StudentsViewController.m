//
//  StudentsViewController.m
//  Library
//
//  Created by hangnguyen on 9/2/14.
//  Copyright (c) 2014 hangnguyen. All rights reserved.
//

#import "StudentsViewController.h"
#import "AddStudentViewController.h"
#import "StudentDetailViewController.h"
#import "Utilities.h"
#import <Parse/Parse.h>

@interface StudentsViewController ()

@end

@implementation StudentsViewController

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
    UINavigationController *controller = self.navigationController;
    if (controller == nil)
    {
        NSLog(@"nil");
    }
}

- (void)getListStudent {
    Utilities *utilities = [[Utilities alloc] init];
    PFUser *currentUser = [PFUser currentUser];
    
    // Create query
    PFQuery *query = [PFQuery queryWithClassName:@"Student"];
    [query whereKey:@"UserId" equalTo:currentUser.objectId];
    query.limit = 1000;
    [query orderByAscending:@"Name"];

    // Query
    [query findObjectsInBackgroundWithBlock:^(NSArray *data, NSError *error) {
        if (!error) {
            students = (NSMutableArray *)data;
            [_tfStudentList reloadData];
        } else {
            // Alert error
            [utilities showAlertWithTitle:@"Error" withMessage:@"Server error."];
        }
    }];
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [students count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *tableIndentifier = @"studentListCell";
    
    StudentCell *cell = (StudentCell *)[tableView
                         dequeueReusableCellWithIdentifier:tableIndentifier
                         forIndexPath:indexPath];

    // Get student
    PFObject *student = [students objectAtIndex:indexPath.row];
    cell.tfName.text = student[@"Name"];
    cell.btnDelete.tag = indexPath.row;
    [cell.btnDelete addTarget:self action:@selector(clickOnDeleteButton:) forControlEvents:UIControlEventTouchUpInside];
    
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    // Get student
    PFObject *student = [students objectAtIndex:indexPath.row];
    
    StudentDetailViewController *studentDetailView = [self.storyboard instantiateViewControllerWithIdentifier:@"StudentDetailIdentifier"];
    
    // Set student id
    [studentDetailView setStudentId:(NSString *)student.objectId];
    
    [self.navigationController pushViewController:studentDetailView animated:YES];
}

- (void)clickOnDeleteButton:(UIButton *)sender {
    if(sender.tag >= 0) {
        cellSelect = (int)sender.tag;
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Delete" message:@"Are you sure you want to delete this student?" delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"OK", nil];
        [alert show];
    }
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
    if(buttonIndex == 1) {
        // If clicked at OK button, get student from data and delete
        PFObject *student = [students objectAtIndex:cellSelect];
        [student deleteInBackgroundWithBlock:^(BOOL succeeded, NSError *error) {
            if(!error) {
                // Remove item out of data
                [students removeObjectAtIndex:cellSelect];
                
                // Reload list view
                [_tfStudentList reloadData];
            } else {
                NSLog(@"Error when delete student %@", error);
                Utilities *utilities = [[Utilities alloc] init];
                [utilities showAlertWithTitle:@"Error" withMessage:@"Server error"];
            }
        }];
    }
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self getListStudent];
    [self decorate];
}

- (void)viewDidAppear:(BOOL)animated {
    
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)addStudent:(id)sender {
    AddStudentViewController *addStudentView = [self.storyboard instantiateViewControllerWithIdentifier:@"AddStudentIndentifier"];
    [self.navigationController pushViewController:addStudentView animated:YES];
}

- (void)deleteStudent:(id)sender {
    NSLog(@"Delete");
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
