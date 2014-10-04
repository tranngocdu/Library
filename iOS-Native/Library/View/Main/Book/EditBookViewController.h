//
//  EditBookViewController.h
//  Library
//
//  Created by Yui on 9/9/14.
//  Copyright (c) 2014 Yui. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Parse/Parse.h>
#import <FPPicker/FPPicker.h>
#import "UIButton+AppButton.h"
#import "Utilities.h"

@interface EditBookViewController : UIViewController <FPPickerDelegate, UITextFieldDelegate> {
    NSString *bookId;
    PFObject *book;
    NSMutableString *bookCoverUrl;
}

@property (strong, nonatomic) IBOutlet UIImageView *imgBookCover;
@property (strong, nonatomic) IBOutlet UIButton *btnChangeCover;
@property (strong, nonatomic) IBOutlet UITextField *lblBookTitle;
@property (strong, nonatomic) IBOutlet UITextField *lblBookAuthor;
@property (strong, nonatomic) IBOutlet UITextField *lblBookISBN;
@property (strong, nonatomic) IBOutlet UITextField *lblBookQuantity;
@property (strong, nonatomic) IBOutlet UIButton *btnSaveBook;

- (IBAction)changeBookCover:(id)sender;
- (IBAction)saveBook:(id)sender;

- (void)getBookToEdit;
- (void)setBookId:(NSString *)bId;

@end
