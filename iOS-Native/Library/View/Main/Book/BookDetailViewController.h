//
//  BookDetailViewController.h
//  Library
//
//  Created by Tien Nguyen Thanh on 9/2/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface BookDetailViewController : UIViewController <UIAlertViewDelegate>

- (IBAction)checkoutBook:(id)sender;
- (IBAction)checkinBook:(id)sender;
- (IBAction)editBook:(id)sender;
- (IBAction)removeBook:(id)sender;

@property (strong, nonatomic) IBOutlet UIButton *btnEditBook;
@property (strong, nonatomic) IBOutlet UIButton *btnCheckinBook;

@end
