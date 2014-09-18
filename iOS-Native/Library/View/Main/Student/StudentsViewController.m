//
//  StudentsViewController.m
//  Library
//
//  Created by hangnguyen on 9/2/14.
//  Copyright (c) 2014 hangnguyen. All rights reserved.
//

#import "StudentsViewController.h"
#import "AddStudentViewController.h"
#import "Utilties.h"
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
    PFUser *currentUser = [PFUser currentUser];
    
    // Create query
    PFQuery *query = [PFQuery queryWithClassName:@"Student"];
    [query whereKey:@"UserId" equalTo:currentUser.objectId];
    query.limit = 1000;
    [query orderByAscending:@"Name"];

    // Query
    [query findObjectsInBackgroundWithBlock:^(NSArray *data, NSError *error) {
        if (!error) {
            students = data;
            [_tfStudentList reloadData];
            NSLog(@"%@", data);
        } else {
            // Alert error
            Utilties *utilities = [[Utilties alloc] init];
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
    
    return cell;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self decorate];
}

- (void)viewDidAppear:(BOOL)animated {
    [self getListStudent];
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
