//
//  CheckInBookViewController.h
//  Library
//
//  Created by Yui on 9/9/14.
//  Copyright (c) 2014 Yui. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Parse/Parse.h>
#import "Utilities.h"

@interface CheckInBookViewController : UIViewController <UITableViewDataSource, UITableViewDelegate> {
    NSString *bookISBN;
    PFObject *book;
    PFObject *student;
    NSMutableArray *students;
}

@property (strong, nonatomic) IBOutlet UITableView *tbvListStudents;
@property (strong, nonatomic) IBOutlet UIButton *btnCheckin;
@property (strong, nonatomic) IBOutlet UIImageView *imgBookCover;
@property (strong, nonatomic) IBOutlet UILabel *lblBookTitle;
@property (strong, nonatomic) IBOutlet UILabel *lblBookAuthor;
@property (strong, nonatomic) IBOutlet UILabel *lblBookISBN;
@property (strong, nonatomic) IBOutlet UILabel *lblBookQuantityAvailable;
@property (strong, nonatomic) IBOutlet UILabel *lblPickName;

- (IBAction)checkin:(id)sender;
- (void)setBookISBN:(NSString *)isbn;

@end
