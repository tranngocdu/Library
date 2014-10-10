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
    [[Utilities share] showLoading];
    PFUser *currentUser = [PFUser currentUser];
    
    // Create query
    PFQuery *query = [PFQuery queryWithClassName:@"Student"];
    [query whereKey:@"UserId" equalTo:currentUser.objectId];
    query.limit = 1000;
    [query orderByAscending:@"Name"];

    // Query
    [query findObjectsInBackgroundWithBlock:^(NSArray *data, NSError *error) {
        [[Utilities share] hideLoading];
        if (!error) {
            students = (NSMutableArray *)data;
            [self reloadData:students];
        } else {
            // Alert error
            [[Utilities share] showAlertWithTitle:@"Error" withMessage:@"Server error."];
        }
    }];
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return [displaySortHeader count];
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    return 44;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    NSString *key = displaySortHeader[section];
    return [displayList[key] count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *tableIndentifier = @"studentListCell";
    
    StudentCell *cell = (StudentCell *)[self.tfStudentList
                         dequeueReusableCellWithIdentifier:tableIndentifier
                         forIndexPath:indexPath];
    
    NSString *key = displaySortHeader[indexPath.section];
    PFObject *student = [[displayList objectForKey:key] objectAtIndex:indexPath.row];
    
    // Get student
//    PFObject *student = [students objectAtIndex:indexPath.row];
    cell.tfName.text = student[@"Name"];
    cell.btnDelete.tag = indexPath.row;
    [cell.btnDelete addTarget:self action:@selector(clickOnDeleteButton:) forControlEvents:UIControlEventTouchUpInside];
    
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    // Get student
    NSString *key = displaySortHeader[indexPath.section];
    PFObject *student = [[displayList objectForKey:key] objectAtIndex:indexPath.row];
    
    StudentDetailViewController *studentDetailView = [self.storyboard instantiateViewControllerWithIdentifier:@"StudentDetailIdentifier"];
    
    // Set student id
    [studentDetailView setStudentId:(NSString *)student.objectId];
    
    [self.navigationController pushViewController:studentDetailView animated:YES];
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

- (NSString*) tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section {
    return displaySortHeader[section];
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
        [[Utilities share] showLoading];
        // If clicked at OK button, get student from data and delete
        PFObject *student = [students objectAtIndex:cellSelect];
        [student deleteInBackgroundWithBlock:^(BOOL succeeded, NSError *error) {
            [[Utilities share] hideLoading];
            if(!error) {
                // Remove item out of data
                [students removeObjectAtIndex:cellSelect];
                
                // Reload list view
                [self reloadData:students];
            } else {
                NSLog(@"Error when delete student %@", error);
                [[Utilities share] showAlertWithTitle:@"Error" withMessage:@"Server error"];
            }
        }];
    }
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self getListStudent];
    [self decorate];
    
    self.searchDisplayController.delegate = self;
    self.searchDisplayController.searchResultsDataSource = self;
    self.searchDisplayController.searchResultsDelegate = self;
}

- (void)viewDidAppear:(BOOL)animated {
    
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (BOOL) searchDisplayController:(UISearchDisplayController *)controller shouldReloadTableForSearchScope:(NSInteger)searchOption {
    return YES;
}

- (void)updateSearchResultsForSearchController:(UISearchController *)searchController {
    NSLog(@"Update");
}

- (void) filterContentForSearchText:(NSString *)searchText scope:(NSString *)scope {
    // Use alternative function
    searchResults = [self getMatchedListWithCondition:searchText inList:students];
}

- (NSArray*) getMatchedListWithCondition:(NSString*)searchText inList:(NSArray*)inArray {
    // this function scan all item of inArray and get/eleminate item
    NSMutableArray *resultArray = [[NSMutableArray alloc] init];
    NSString *searchTextUpper = [searchText uppercaseString];

    for(int i=0; i<[inArray count]; i++) {
        NSDictionary *item = inArray[i];
        NSString *title = [[item objectForKey:@"Name"] uppercaseString];
        
        // Check if condition matched, add this item to result array
        if([title rangeOfString:searchTextUpper].location != NSNotFound) {
            [resultArray addObject:item];
        }
    }
    
//        NSLog(@"Length: %d", [resultArray count]);
    
    return resultArray;
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

- (BOOL)searchBarShouldBeginEditing:(UISearchBar *)searchBar {
    NSLog(@"aaa");
    return YES;
}

- (BOOL)searchBarShouldEndEditing:(UISearchBar *)searchBar {
    NSLog(@"BBB");
    [self reloadData:students];
    return YES;
}

- (BOOL)searchDisplayController:(UISearchDisplayController *)controller shouldReloadTableForSearchString:(NSString *)searchString {
    
    [self filterContentForSearchText:searchString scope:[[self.searchDisplayController.searchBar scopeButtonTitles] objectAtIndex:[self.searchDisplayController.searchBar
                                                                                                                                   selectedScopeButtonIndex]]];
    
    // Update search section new data
    [self reloadData:searchResults];
    return YES;
}

- (void) reloadData:(NSArray*)inArray {
    [self sectionization:inArray];
    [_tfStudentList reloadData];
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
