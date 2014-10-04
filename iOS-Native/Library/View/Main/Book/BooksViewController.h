//
//  BooksViewController.h
//  Library
//
//  Created by hangnguyen on 9/2/14.
//  Copyright (c) 2014 hangnguyen. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AddBookModalViewController.h"
#import "BarcodeReaderViewController.h"
#import "Utilities.h"

@interface BooksViewController : UIViewController <UITableViewDelegate, UITableViewDataSource, AddBookModalDelegate, BarcodeReaderDelegate>
{
    NSMutableArray *books;
}

- (IBAction)addBookManual:(id)sender;
- (IBAction)segmentChanged:(id)sender;

@property (strong, nonatomic) IBOutlet UISegmentedControl *topTab;
@property (strong, nonatomic) IBOutlet UIView *topView;
@property (strong, nonatomic) IBOutlet UITableView *listBooks;

@end
