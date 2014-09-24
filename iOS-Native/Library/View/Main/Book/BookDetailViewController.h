//
//  BookDetailViewController.h
//  Library
//
//  Created by Tien Nguyen Thanh on 9/2/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Parse/Parse.h>

@interface BookDetailViewController : UIViewController <UIAlertViewDelegate> {
    NSString *bookId;
    PFObject *book;
}

- (IBAction)checkoutBook:(id)sender;
- (IBAction)checkinBook:(id)sender;
- (IBAction)editBook:(id)sender;
- (IBAction)removeBook:(id)sender;

- (void)setBookId:(NSString *)bId;

@property (strong, nonatomic) IBOutlet UIImageView *imgBookCover;
@property (strong, nonatomic) IBOutlet UILabel *lblBookTitle;
@property (strong, nonatomic) IBOutlet UILabel *lblBookAuthor;
@property (strong, nonatomic) IBOutlet UILabel *lblBookISBN;
@property (strong, nonatomic) IBOutlet UILabel *lblBookQuantityTotal;
@property (strong, nonatomic) IBOutlet UILabel *lblBookQuantityAvailable;
@property (strong, nonatomic) IBOutlet UIButton *btnCheckinBook;
@property (strong, nonatomic) IBOutlet UIButton *btnCheckoutBook;
@property (strong, nonatomic) IBOutlet UIButton *btnEditBook;
@property (strong, nonatomic) IBOutlet UIButton *btnRemoveBook;
@property (strong, nonatomic) IBOutlet UIScrollView *scroller;

@end
