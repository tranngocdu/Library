//
//  StudentsViewController.h
//  Library
//
//  Created by hangnguyen on 9/2/14.
//  Copyright (c) 2014 hangnguyen. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "StudentCell.h"

@interface StudentsViewController : UIViewController <UITableViewDataSource, UITableViewDelegate, UIAlertViewDelegate> {
    NSMutableArray *students;
    StudentCell *studentCell;
    int cellSelect;
}

- (IBAction)addStudent:(id)sender;
//- (IBAction)viewStudentDetail:(id)sender;
- (IBAction)deleteStudent:(id)sender;

@property (strong, nonatomic) IBOutlet UITableView *tfStudentList;

@end
