//
//  BooksViewController.m
//  Library
//
//  Created by hangnguyen on 9/2/14.
//  Copyright (c) 2014 hangnguyen. All rights reserved.
//

#import "BooksViewController.h"
#import "BookDetailViewController.h"
#import "AddBookModalViewController.h"
#import "AddBookManualViewController.h"
#import "AddBookScanViewController.h"
#import "BookCell.h"
#import "BarcodeReaderViewController.h"
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

    self.searchDisplayController.delegate = self;
    self.searchDisplayController.searchResultsDelegate = self;
    self.searchDisplayController.searchResultsDataSource = self;
}

- (void)viewDidAppear:(BOOL)animated {
    // Load available books
    [self loadBooksWithType:0];
}

- (void)viewWillAppear:(BOOL)animated
{
    self.tabBarController.tabBar.hidden = NO;
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
    //NSPredicate *resultPredicate = [NSPredicate predicateWithFormat:@"name contains[c] %@", searchText];

    // this function scan all the array and check every item to get or eleminate this iiem
    //searchResults = [books filteredArrayUsingPredicate:resultPredicate];

    // Use alternative function
    searchResults = [self getMatchedListWithCondition:searchText inList:books];
}

- (NSArray*) getMatchedListWithCondition:(NSString*)searchText inList:(NSArray*)inArray {

    // this function scan all item of inArray and get/eleminate item
    NSMutableArray *resultArray = [[NSMutableArray alloc] init];
    NSString *searchTextUpper = [searchText uppercaseString];

    for(int i=0; i<[inArray count]; i++) {
        NSDictionary *item = inArray[i];
        NSString *title = [[item objectForKey:@"title"] uppercaseString];

        // Check if condition matched, add this item to result array
        if([title rangeOfString:searchTextUpper].location != NSNotFound) {
            [resultArray addObject:item];
        }
    }

//    NSLog(@"Length: %d", [resultArray count]);
    
    return resultArray;
}

- (void) sectionization:(NSArray*)inArray {
    NSMutableDictionary *resultDic = [NSMutableDictionary dictionary];

    for(int i=0; i<[inArray count]; i++) {
        NSDictionary *item = inArray[i];

        NSString *title = item[@"title"];
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

    NSLog(@"START SEARCH");
    return YES;
}

- (BOOL)searchBarShouldEndEditing:(UISearchBar *)searchBar {
    [self reloadData:books];
    NSLog(@"END SEARCH");
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
    [_listBooks reloadData];
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return [displaySortHeader count];
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {

    NSString *key = displaySortHeader[section];
    return [displayList[key] count];
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    return 85;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *tableIndentifier = @"bookListCell";
    
    BookCell *cell = (BookCell *)[self.listBooks // tableView
                                        dequeueReusableCellWithIdentifier:tableIndentifier
                                        forIndexPath:indexPath];

    // Get book
    NSString *key = displaySortHeader[indexPath.section];
    PFObject *book = [[displayList objectForKey:key] objectAtIndex:indexPath.row];

    cell.lblBookAuthor.text = book[@"author"];
    cell.lblBookName.text = book[@"title"];
    
    cell.lblBookQuantity.text = [NSString stringWithFormat:@"%@ available", book[@"quantity_available"]];
    
    // Init cell image
    cell.bookPhoto.image = [UIImage imageNamed:@"no-art.png"];
//    cell.bookPhoto.image = nil;
    
    // Get image async
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        NSString *imageUrl = book[@"cover_image"];
        [NSURLConnection sendAsynchronousRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:imageUrl]] queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse *response, NSData *data, NSError *error) {
            if (data) {
                UIImage *img = [UIImage imageWithData:data];
                if (img) {
                    dispatch_async(dispatch_get_main_queue(), ^{
                        BookCell *updateCell = (id)[self.listBooks cellForRowAtIndexPath:indexPath];
                        if (updateCell) {
                            cell.bookPhoto.image = img;
                        }
                    });
                }
            }
        }];
    });
    
//    NSString *imageUrl = book[@"cover_image"];
//    if(imageUrl != nil) {
//        [NSURLConnection sendAsynchronousRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:imageUrl]] queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse *response, NSData *data, NSError *error) {
//            cell.bookPhoto.image = [UIImage imageWithData:data];
//        }];
//    }

    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    BookDetailViewController *bookDetailView = [self.storyboard instantiateViewControllerWithIdentifier:@"BookDetailIndentifier"];

    //PFObject *book = [books objectAtIndex:indexPath.row];
    NSString *key = displaySortHeader[indexPath.section];
    PFObject *book = [[displayList objectForKey:key] objectAtIndex:indexPath.row];

    [bookDetailView setBookId:book.objectId];
    [self.navigationController pushViewController:bookDetailView animated:YES];
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

- (void)loadBooksWithType:(int)type {
    [[Utilities share] showLoading];
    
    PFUser *currentUser = [PFUser currentUser];
    PFQuery *query = [PFQuery queryWithClassName:@"NewBook"];
    
    // Remove old data
    [books removeAllObjects];
    searchResults = [NSArray array];
    displayList = [NSDictionary dictionary];
    displaySortHeader = [NSArray array];
    [self reloadData:books];
    
    [query whereKey:@"User" equalTo:currentUser.objectId];
    
    if (type == 1) {
        [query whereKey:@"quantity_available" greaterThan:@0];
    } else if (type == 2){
        [query whereKey:@"quantity_out" greaterThan:@0];
    }
    
    [query orderByDescending:@"createdAt"];
    query.limit = 1000;
    
    [query findObjectsInBackgroundWithBlock:^(NSArray *objects, NSError *error) {
        if(!error) {
            books = (NSMutableArray *)objects;
            NSLog(@"%@", [books objectAtIndex:0]);

            // Rerender table view
            [self reloadData:books];

        } else {
            NSLog(@"Error: %@", error);
            [[Utilities share] showAlertWithTitle:@"Error" withMessage:@"Server error"];
        }
        [[Utilities share] hideLoading];
    }];
}

- (IBAction)segmentChanged:(id)sender {
    UISegmentedControl *segmentedControl = (UISegmentedControl *) sender;
    NSInteger selectedSegment = segmentedControl.selectedSegmentIndex;
    
    // Load available books
    if (selectedSegment == 1) {
        [self loadBooksWithType:1];
    }
    // Load checked out books
    else if (selectedSegment == 2) {
        [self loadBooksWithType:2];
    }
    // Load all books
    else if (selectedSegment == 0) {
        [self loadBooksWithType:0];
    }
}

- (void)addBookManual:(id)sender {
    // Add modal view
    AddBookModalViewController *addModal = [self.storyboard instantiateViewControllerWithIdentifier:@"AddBookModalIdentifier"];
    
    [addModal setTransitioningDelegate:self.transitioningDelegate];
    addModal.modalPresentationStyle = UIModalPresentationCustom;
    [addModal setDelegate:self];
    
    [self presentViewController:addModal animated:NO completion:nil];
}

- (void)addBookModal:(AddBookModalViewController*)addBookModal onClickAt:(int)buttonIndex {
    if (buttonIndex == 1) {
#if TARGET_IPHONE_SIMULATOR
        [self barcodeReader:nil onFoundItem:@"2145431431257" withType:@"org.gs1.EAN-13"];
#else
        BarcodeReaderViewController *barcodeReader = [[BarcodeReaderViewController alloc] initWithDelegate:self];
        [self.navigationController pushViewController:barcodeReader animated:YES];
        self.tabBarController.tabBar.hidden = YES;
#endif
    } else if (buttonIndex == 2) {
        AddBookManualViewController *addManualView = [self.storyboard instantiateViewControllerWithIdentifier:@"AddBookManualIdentifier"];
        [self.navigationController pushViewController:addManualView animated:YES];
    } else {
        NSLog(@"Cancel add book modal");
    }
}

- (void)barcodeReaderOnCancel:(BarcodeReaderViewController *)barcodeReader {

    if ([self.navigationController.viewControllers count] > 1) {
        [self.navigationController popViewControllerAnimated:YES];
    }
}

- (void)barcodeReader:(BarcodeReaderViewController *)barcodeReader onFoundItem:(NSString *)content withType:(NSString *)type {
    if ([self.navigationController.viewControllers count] > 1) {
        [self.navigationController popViewControllerAnimated:YES];
    }

    NSString *sendUrl = [NSString stringWithFormat:@"http://openlibrary.org/api/books?bibkeys=%@&jscmd=data&format=json", content];
    NSURL *url = [[NSURL alloc] initWithString:sendUrl];

    [[Utilities share] showLoading];
    [NSURLConnection sendAsynchronousRequest:[[NSURLRequest alloc] initWithURL:url] queue:[[NSOperationQueue alloc] init] completionHandler:^(NSURLResponse *response, NSData *data, NSError *error) {
        
        [[Utilities share] hideLoading];

        if (error) {
            NSLog(@"Error: %@", error);
            [[Utilities share] showAlertWithTitle:@"Error" withMessage:@"Error when getting book informations."];
        } else {
            NSError *parseError = nil;
            NSDictionary *parseData = [NSJSONSerialization JSONObjectWithData:data options:0 error:&parseError];
            // If parse error
            if (parseError != nil ) {
                AddBookManualViewController *addManualView = [self.storyboard instantiateViewControllerWithIdentifier:@"AddBookManualIdentifier"];
                [addManualView setBookISBN:content];
                [self.navigationController pushViewController:addManualView animated:YES];
            } else {
                NSArray *result = [parseData objectForKey:content];
                if ([result count]) {
                    // Set book data
                    AddBookScanViewController *addScanView = [self.storyboard instantiateViewControllerWithIdentifier:@"AddBookScanIdentifier"];
                    
                    for (NSString *key in result) {
                        if([key isEqualToString:@"title"]) {
                            [addScanView setBookTitle:[result valueForKey:key]];
                        } else if ([key isEqualToString:@"authors"]) {
                            NSArray *bookAuthors = [result valueForKey:key];
                            NSString *author = [[bookAuthors objectAtIndex:0] valueForKey:@"name"];
                            [addScanView setBookAuthor:author];
                        } else if ([key isEqualToString:@"cover"]) {
                            NSDictionary *bookCovers = [result valueForKey:key];
                            NSString *coverMedium = [bookCovers valueForKey:@"medium"];
                            [addScanView setBookCover:coverMedium];
                        }
                    }
                    [addScanView setBookISBN:content];
                    [addScanView setBookQuantity:@"1"];
                    [self.navigationController pushViewController:addScanView animated:YES];
                } else {
                    AddBookManualViewController *addManualView = [self.storyboard instantiateViewControllerWithIdentifier:@"AddBookManualIdentifier"];
                    [addManualView setBookISBN:content];
                    [self.navigationController pushViewController:addManualView animated:YES];
                }
            }
        }
    }];
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
