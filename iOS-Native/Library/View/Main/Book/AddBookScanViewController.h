//
//  AddBookScanViewController.h
//  Library
//
//  Created by Nam Huynh on 9/30/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <FPPicker/FPPicker.h>

@interface AddBookScanViewController : UIViewController <FPPickerDelegate> {
    NSMutableString *bookTitle;
    NSMutableString *bookAuthor;
    NSMutableString *bookQuantity;
    NSMutableString *bookCoverUrl;
    NSMutableString *bookISBN;
}

- (IBAction)addPhoto:(id)sender;
- (IBAction)addBook:(id)sender;
- (IBAction)editQuantity:(id)sender;

- (void)setBookTitle:(NSString *)title;
- (void)setBookAuthor:(NSString *)author;
- (void)setBookQuantity:(NSString *)quantity;
- (void)setBookISBN:(NSString *)isbn;
- (void)setBookCover:(NSString *)cover;

@property (strong, nonatomic) IBOutlet UIImageView *imgBookCover;
@property (strong, nonatomic) IBOutlet UIButton *btnAddPhoto;
@property (strong, nonatomic) IBOutlet UILabel *lblTitle;
@property (strong, nonatomic) IBOutlet UILabel *lblAuthor;
@property (strong, nonatomic) IBOutlet UILabel *lblQuantity;
@property (strong, nonatomic) IBOutlet UIButton *btnAddBook;
@property (strong, nonatomic) IBOutlet UIButton *btnEditQuantity;

@end
