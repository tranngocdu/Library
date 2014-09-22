//
//  StudentDetailViewController.h
//  Library
//
//  Created by Nam Huynh on 9/19/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface StudentDetailViewController : UIViewController {
    NSString *studentId;
}

@property (strong, nonatomic) IBOutlet UISegmentedControl *topTab;
@property (strong, nonatomic) IBOutlet UIView *topView;

- (IBAction)segmentChanged:(id)sender;
- (void)setStudentId:(NSString *)sId;

@end
