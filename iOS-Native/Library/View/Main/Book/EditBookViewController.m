//
//  EditBookViewController.m
//  Library
//
//  Created by Yui on 9/9/14.
//  Copyright (c) 2014 Yui. All rights reserved.
//

#import "EditBookViewController.h"
#import "BooksViewController.h"
#import "Utilities.h"

@interface EditBookViewController ()

@end

@implementation EditBookViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view.
}

- (void) viewDidAppear:(BOOL)animated {
    [self.navigationItem setTitle:@"Edit Book"];
    
    // Get book informations
    PFQuery *query = [PFQuery queryWithClassName:@"NewBook"];
    [query getObjectInBackgroundWithId:bookId block:^(PFObject *object, NSError *error) {
        if(!error) {
            book = object;
            NSLog(@"%@", book);
            _lblBookTitle.text = book[@"title"];
            _lblBookAuthor.text = book[@"author"];
            _lblBookISBN.text = book[@"ISBN"];
            _lblBookQuantity.text = [NSString stringWithFormat:@"%@", book[@"quantity_total"]];
            
            NSString *imageUrl = book[@"cover_image"];
            [NSURLConnection sendAsynchronousRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:imageUrl]] queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
                _imgBookCover.image = [UIImage imageWithData:data];
            }];
        } else {
            NSLog(@"Error: %@", error);
            Utilities *utilities = [[Utilities alloc] init];
            [utilities showAlertWithTitle:@"Error" withMessage:@"Server error."];
        }
    }];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)setBookId:(NSString *)bId {
    bookId = bId;
}

- (void)changeBookCover:(id)sender {
    
}

- (void)saveBook:(id)sender {
    NSString *bookTitle = _lblBookTitle.text;
    NSString *bookAuthor = _lblBookAuthor.text;
    NSString *bookISBN = _lblBookISBN.text;
    NSString *bookQuantity = _lblBookQuantity.text;
    
    Utilities *utilities = [[Utilities alloc] init];
    
    // Validate informations
    if ([bookTitle isEqualToString:@""] || [bookAuthor isEqualToString:@""]) {
        [utilities showAlertWithTitle:@"Try Again" withMessage:@"Please add a title, author and quantity."];
    } else if ([bookISBN length] != 13) {
        [utilities showAlertWithTitle:@"Try Again" withMessage:@"Please make sure you're using the 13 digit ISBN."];
    } else {
        // Set book
        book[@"title"] = bookTitle;
        book[@"author"] = bookAuthor;
        book[@"ISBN"] = bookISBN;
        book[@"cover_image"] = @"http://image.mp3.zdn.vn/thumb/165_165/covers/3/3/33e23a4ab94e902d9850109f4fba0e24_1411148582.jpg";
        
        int quantityDiff = [bookQuantity intValue] - [book[@"quantity_total"] intValue];
        int quantityAvailable = [book[@"quantity_available"] intValue];
        quantityAvailable = quantityAvailable + quantityDiff;
        
        // Set quantity available to 0 if it less than 0
        if (quantityAvailable < 0) {
            quantityAvailable = 0;
        }
        
        book[@"quantity_available"] = @(quantityAvailable);
        book[@"quantity_total"] = @([bookQuantity intValue]);
        
        [book saveInBackgroundWithBlock:^(BOOL succeeded, NSError *error) {
            if(!error) {
                [self.navigationController popToRootViewControllerAnimated:YES];
            } else {
                NSLog(@"Error: %@", error);
                [utilities showAlertWithTitle:@"Error" withMessage:@"Server error"];
            }
        }];
    }
}

@end
