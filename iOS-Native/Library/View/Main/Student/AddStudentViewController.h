//
//  AddStudentViewController.h
//  Library
//
//  Created by Tien Nguyen Thanh on 9/2/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Utilities.h"

@interface AddStudentViewController : UIViewController <UITextFieldDelegate> {
    Utilities *utilities;
}

- (IBAction)addStudent:(id)sender;

@property (strong, nonatomic) IBOutlet UIButton *btnAddStudent;
@property (strong, nonatomic) IBOutlet UITextField *tfStudentName;

@end
