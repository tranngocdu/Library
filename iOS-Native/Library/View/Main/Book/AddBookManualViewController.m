//
//  AddBookManualViewController.m
//  Library
//
//  Created by Tien Nguyen Thanh on 9/2/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import "AddBookManualViewController.h"
#import "BooksViewController.h"
#import "UIButton+AppButton.h"
#import "Utilities.h"
#import <MobileCoreServices/MobileCoreServices.h>
#import <Parse/Parse.h>

@interface AddBookManualViewController ()

@end

@implementation AddBookManualViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)decorate {
    [_btnAddPhoto setAppButtonHasBackgroundColor:NO withColor:UIColorFromRGB(kAppRed)];
    [_btnAddBook setAppButtonHasBackgroundColor:YES withColor:UIColorFromRGB(kAppGreen)];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    [self decorate];
    [self.navigationItem setTitle:@"Add Book"];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
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
    NSData *imageData = [NSData dataWithContentsOfFile:[info objectForKey:@"FPPickerControllerMediaURL"]];
    _tfImage.image = [[UIImage alloc] initWithData:imageData];
    [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)FPPickerControllerDidCancel:(FPPickerController *)picker {
    [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)addBook:(id)sender {
    NSString *bookTitle = _tfTitle.text;
    NSString *bookAuthor = _tfAuthor.text;
    NSString *bookISBN = _tfIsbn.text;
    NSString *bookQuantity = _tfQuantity.text;
    
    Utilities *utilities = [[Utilities alloc] init];
    
    // Validate informations
    if ([bookTitle isEqualToString:@""] || [bookAuthor isEqualToString:@""]) {
        [utilities showAlertWithTitle:@"Try Again" withMessage:@"Please add a title, author and quantity."];
    } else {
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
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
