//
//  AddBookManualViewController.h
//  Library
//
//  Created by Tien Nguyen Thanh on 9/2/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <FPPicker/FPPicker.h>

@interface AddBookManualViewController : UIViewController <FPPickerDelegate> {
    NSMutableString *bookCoverUrl;
}

- (IBAction)addPhoto:(id)sender;
- (IBAction)addBook:(id)sender;

@property (strong, nonatomic) IBOutlet UIImageView *tfImage;
@property (strong, nonatomic) IBOutlet UIButton *btnAddPhoto;
@property (strong, nonatomic) IBOutlet UITextField *tfTitle;
@property (strong, nonatomic) IBOutlet UITextField *tfAuthor;
@property (strong, nonatomic) IBOutlet UITextField *tfIsbn;
@property (strong, nonatomic) IBOutlet UITextField *tfQuantity;
@property (strong, nonatomic) IBOutlet UIButton *btnAddBook;


@end
