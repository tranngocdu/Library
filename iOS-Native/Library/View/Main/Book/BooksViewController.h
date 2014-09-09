//
//  BooksViewController.h
//  Library
//
//  Created by hangnguyen on 9/2/14.
//  Copyright (c) 2014 hangnguyen. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface BooksViewController : UIViewController <UITableViewDelegate, UITableViewDataSource>
{
    NSArray *books;
}

- (IBAction)addBookManual:(id)sender;
- (IBAction)segmentChanged:(id)sender;

@property (strong, nonatomic) IBOutlet UISegmentedControl *topTab;

@end
