//
//  AddBookScanViewController.m
//  Library
//
//  Created by Nam Huynh on 9/30/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import "AddBookScanViewController.h"
#import "EditBookModalViewController.h"
#import "UIButton+AppButton.h"
#import "Utilities.h"
#import <Parse/Parse.h>

@interface AddBookScanViewController ()

@end

@implementation AddBookScanViewController

- (void)decorate {
    [_btnAddBook setAppButtonHasBackgroundColor:YES withColor:UIColorFromRGB(kAppGreen)];
    [_btnEditQuantity setAppButtonHasBackgroundColor:NO withColor:UIColorFromRGB(kAppGreen)];
    [_btnAddPhoto setAppButtonHasBackgroundColor:NO withColor:UIColorFromRGB(kAppRed)];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    [self decorate];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)viewDidAppear:(BOOL)animated {
    _lblTitle.text = bookTitle;
    _lblAuthor.text = bookAuthor;
    _lblQuantity.text = [NSString stringWithFormat:@"Number available: %@", bookQuantity];
}

- (void)setBookTitle:(NSString *)title {
    bookTitle = title;
}

- (void)setBookAuthor:(NSString *)author {
    bookAuthor = author;
}

- (void)setBookQuantity:(NSString *)quantity {
    bookQuantity = quantity;
}

- (void)setBookISBN:(NSString *)isbn {
    bookISBN = isbn;
}

- (void)addBook:(id)sender {
    Utilities *utilities = [[Utilities alloc] init];
    
    PFUser *currentUser = [PFUser currentUser];
    PFObject *book = [PFObject objectWithClassName:@"NewBook"];
    book[@"title"] = bookTitle;
    book[@"author"] = bookAuthor;
    book[@"ISBN"] = bookISBN;
    book[@"cover_image"] = bookCoverUrl;
    book[@"User"] = currentUser.objectId;
    book[@"studentList"] = [NSMutableArray array];
    book[@"quantity_total"] = @([bookQuantity intValue]);
    book[@"quantity_out"] = @0;
    book[@"quantity_available"] = @([bookQuantity intValue]);
    
    [book saveInBackgroundWithBlock:^(BOOL succeeded, NSError *error) {
        if(!error) {
            [self.navigationController popViewControllerAnimated:YES];
        } else {
            NSLog(@"Error: %@", error);
            [utilities showAlertWithTitle:@"Error" withMessage:@"Server error"];
        }
    }];

}

- (void)addPhoto:(id)sender {
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
    [NSURLConnection sendAsynchronousRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:bookCoverUrl]] queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
        _imgBookCover.image = [[UIImage alloc] initWithData:data];
    }];
    
    [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)FPPickerControllerDidCancel:(FPPickerController *)picker {
    [self dismissViewControllerAnimated:YES completion:nil];
}


- (void)editQuantity:(id)sender {
    // Add modal view
    EditBookModalViewController *editModal = [self.storyboard instantiateViewControllerWithIdentifier:@"EditBookModalIdentifier"];
    
    [editModal setTransitioningDelegate:self.transitioningDelegate];
    editModal.modalPresentationStyle = UIModalPresentationCustom;
    
    [self presentViewController:editModal animated:NO completion:nil];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
