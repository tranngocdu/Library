//
//  EditBookViewController.m
//  Library
//
//  Created by Yui on 9/9/14.
//  Copyright (c) 2014 Yui. All rights reserved.
//

#import "EditBookViewController.h"
#import "BooksViewController.h"

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

- (void)decorate {
    [_btnChangeCover setAppButtonHasBackgroundColor:NO withColor:UIColorFromRGB(kAppRed)];
    [_btnSaveBook setAppButtonHasBackgroundColor:YES withColor:UIColorFromRGB(kAppGreen)];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view.
    [self decorate];
    utilities = [[Utilities alloc] init];
}

- (void) viewDidAppear:(BOOL)animated {
    [self.navigationItem setTitle:@"Edit Book"];
    [self getBookToEdit];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)getBookToEdit {
    NSLog(@"bookId: %@", bookId);
    [utilities showLoading];
    // Get book informations
    PFQuery *query = [PFQuery queryWithClassName:@"NewBook"];
    [query getObjectInBackgroundWithId:bookId block:^(PFObject *object, NSError *error) {
        if(!error) {
            book = object;
            _lblBookTitle.text = book[@"title"];
            _lblBookAuthor.text = book[@"author"];
            _lblBookISBN.text = book[@"ISBN"];
            _lblBookQuantity.text = [NSString stringWithFormat:@"%@", book[@"quantity_total"]];
            
            NSString *imageUrl = book[@"cover_image"];
            
            if(imageUrl != nil) {
                [NSURLConnection sendAsynchronousRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:imageUrl]] queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
                    _imgBookCover.image = [UIImage imageWithData:data];
                }];
            }
        } else {
            NSLog(@"Error: %@", error);
            [utilities showAlertWithTitle:@"Error" withMessage:@"Server error."];
        }
        [utilities hideLoading];
    }];
}

- (void)setBookId:(NSString *)bId {
    bookId = bId;
}

- (void)changeBookCover:(id)sender {
    // To create the object
    FPPickerController *fpController = [[FPPickerController alloc] init];
    
    // Set the delegate
    fpController.fpdelegate = self;
    
    // Ask for specific data types. (Optional) Default is all files.
    fpController.dataTypes = [NSArray arrayWithObjects:@"image/*", nil];
    
    // Select and order the sources (Optional) Default is all sources
    //fpController.sourceNames = [[NSArray alloc] initWithObjects: FPSourceCamera, FPSourceCameraRoll, FPSourceDropbox, FPSourceFacebook, FPSourceFlickr, FPSourceGmail, FPSourceBox, FPSourceGithub, FPSourceGoogleDrive, FPSourceImagesearch, FPSourceInstagram, FPSourcePicasa,  nil];
    
    fpController.sourceNames = [[NSArray alloc] initWithObjects:FPSourceCamera, FPSourceCameraRoll, FPSourceBox, FPSourceDropbox, FPSourceFacebook, FPSourceGithub, FPSourceGmail, FPSourceImagesearch, FPSourceGoogleDrive, FPSourceInstagram, FPSourceFlickr, FPSourcePicasa, FPSourceSkydrive, FPSourceEvernote, nil];
    
    // You can set some of the in built Camera properties as you would with UIImagePicker
    fpController.allowsEditing = YES;
    
    // Allowing multiple file selection
    fpController.selectMultiple = NO;
    
    // Limiting the maximum number of files that can be uploaded at one time
    fpController.maxFiles = 1;
    
    
    /* Control if we should upload or download the files for you.
     * Default is yes.
     * When a user selects a local file, we'll upload it and return a remote url
     * When a user selects a remote file, we'll download it and return the filedata to you.
     */
    fpController.shouldUpload = YES;
    //fpController.shouldDownload = NO;
    
    // Display it.
    [self presentViewController:fpController animated:YES completion:nil];
}

- (void)FPPickerController:(FPPickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info {
    bookCoverUrl = [info objectForKey:@"FPPickerControllerRemoteURL"];
    NSString *imageUrl = [info objectForKey:@"FPPickerControllerMediaURL"];
    [NSURLConnection sendAsynchronousRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:imageUrl]] queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
        _imgBookCover.image = [[UIImage alloc] initWithData:data];
    }];
    [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)FPPickerControllerDidCancel:(FPPickerController *)picker {
    [self dismissViewControllerAnimated:YES completion:nil];
}


- (void)saveBook:(id)sender {
    NSString *bookTitle = _lblBookTitle.text;
    NSString *bookAuthor = _lblBookAuthor.text;
    NSString *bookISBN = _lblBookISBN.text;
    NSString *bookQuantity = _lblBookQuantity.text;
    
    // Validate informations
    if ([bookTitle isEqualToString:@""] || [bookAuthor isEqualToString:@""]) {
        [utilities showAlertWithTitle:@"Try Again" withMessage:@"Please add a title, author and quantity."];
    } else if ([bookISBN length] != 13) {
        [utilities showAlertWithTitle:@"Try Again" withMessage:@"Please make sure you're using the 13 digit ISBN."];
    } else {
        [utilities showLoading];
        // Set book
        book[@"title"] = bookTitle;
        book[@"author"] = bookAuthor;
        book[@"ISBN"] = bookISBN;
        book[@"cover_image"] = bookCoverUrl;
        
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
            [utilities hideLoading];
            if(!error) {
                [self getBookToEdit];
                [self.navigationController popToRootViewControllerAnimated:YES];
            } else {
                NSLog(@"Error: %@", error);
                [utilities showAlertWithTitle:@"Error" withMessage:@"Server error"];
            }
        }];
    }
}

@end
