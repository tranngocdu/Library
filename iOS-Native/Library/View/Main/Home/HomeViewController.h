//
//  HomeViewController.h
//  Library
//
//  Created by Tien Nguyen Thanh on 9/2/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface HomeViewController : UIViewController

- (IBAction)checkin:(id)sender;
- (IBAction)checkout:(id)sender;
- (void)presentBooksView;

@property (strong, nonatomic) IBOutlet UIButton *btnCheckOut;
@property (strong, nonatomic) IBOutlet UIButton *btnCheckIn;

@end
