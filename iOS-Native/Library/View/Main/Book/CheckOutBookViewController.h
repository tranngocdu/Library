//
//  CheckOutBookViewController.h
//  Library
//
//  Created by Tien Nguyen Thanh on 9/2/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Parse/Parse.h>

@interface CheckOutBookViewController : UIViewController <UITableViewDataSource, UITableViewDelegate> {
    PFObject *book;
    PFObject *student;
    NSArray *students;
}

@property (strong, nonatomic) IBOutlet UITableView *tbvListStudents;
@property (strong, nonatomic) IBOutlet UIButton *btnCheckout;
@property (strong, nonatomic) IBOutlet UIImageView *imgBookCover;
@property (strong, nonatomic) IBOutlet UILabel *lblBookTitle;
@property (strong, nonatomic) IBOutlet UILabel *lblBookAuthor;
@property (strong, nonatomic) IBOutlet UILabel *lblBookISBN;
@property (strong, nonatomic) IBOutlet UILabel *lblBookQuantityAvailable;

- (void)setBook:(PFObject *)object;
- (IBAction)checkout:(id)sender;

@end
