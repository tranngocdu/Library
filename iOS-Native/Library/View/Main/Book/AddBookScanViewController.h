//
//  AddBookScanViewController.h
//  Library
//
//  Created by Nam Huynh on 9/30/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface AddBookScanViewController : UIViewController

- (IBAction)addPhoto:(id)sender;
- (IBAction)addBook:(id)sender;
- (IBAction)editQuantity:(id)sender;

@property (strong, nonatomic) IBOutlet UIImageView *imgBookCover;
@property (strong, nonatomic) IBOutlet UIButton *btnAddPhoto;
@property (strong, nonatomic) IBOutlet UILabel *lblTitle;
@property (strong, nonatomic) IBOutlet UILabel *lblAuthor;
@property (strong, nonatomic) IBOutlet UILabel *lblQuantity;
@property (strong, nonatomic) IBOutlet UIButton *btnAddBook;
@property (strong, nonatomic) IBOutlet UIButton *btnEditQuantity;

@end
