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

    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(onClickedAtBackground)];
    [self.view addGestureRecognizer:tap];
}

- (void) viewDidAppear:(BOOL)animated {
    [self.navigationItem setTitle:@"Edit Book"];
    [self decorate];
    [self getBookToEdit];

    [self registerKeyboardEvent];
}

- (void) viewDidDisappear:(BOOL)animated {
    [self unregisterKeyboardEvent];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void) registerKeyboardEvent {
    // Listen for keyboard appearances and disappearances
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(keyboardDidShow:) name:UIKeyboardDidShowNotification object:nil];

    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(keyboardDidHide:) name:UIKeyboardDidHideNotification object:nil];
}

- (void) unregisterKeyboardEvent {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void) keyboardDidShow:(NSNotification*)notify {

    // Get the size of the keyboard.
    NSDictionary* info = [notify userInfo];
    NSValue* aValue = [info objectForKey:UIKeyboardFrameEndUserInfoKey];
    CGSize keyboardSize = [aValue CGRectValue].size;

    CGRect r = self.view.frame;
    CGRect r2 = _lblBookQuantity.frame;
    float eY = r2.origin.y + r2.size.height + 5;
    float kbH = keyboardSize.height;
    float posY = -kbH + (r.size.height - eY);

    r.origin.y = posY;

    [UIView animateWithDuration:0.25 animations:^{
        self.view.frame = r;
    }];
}

- (void) onClickedAtBackground {
    [self.view endEditing:YES];
}

- (void) keyboardDidHide:(NSNotification*)notify {
    CGRect r = self.view.frame;
    r.origin.y = 0;

    [UIView animateWithDuration:0.25 animations:^{
        self.view.frame = r;
    }];
}

- (void)getBookToEdit {
    NSLog(@"bookId: %@", bookId);
    [[Utilities share] showLoading];
    // Get book informations
    PFQuery *query = [PFQuery queryWithClassName:@"NewBook"];
    [query getObjectInBackgroundWithId:bookId block:^(PFObject *object, NSError *error) {
        if(!error) {
            book = object;

            bookCoverUrl = book[@"cover_image"];
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
            [[Utilities share] showAlertWithTitle:@"Error" withMessage:@"Server error."];
        }
        [[Utilities share] hideLoading];
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
        [[Utilities share] showAlertWithTitle:@"Try Again" withMessage:@"Please add a title, author and quantity."];
    } else if ([bookISBN length] != 13) {
        [[Utilities share] showAlertWithTitle:@"Try Again" withMessage:@"Please make sure you're using the 13 digit ISBN."];
    } else {
        [[Utilities share] showLoading];
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
            [[Utilities share] hideLoading];
            if(!error) {
                [self getBookToEdit];
                [self.navigationController popToRootViewControllerAnimated:YES];
            } else {
                NSLog(@"Error: %@", error);
                [[Utilities share] showAlertWithTitle:@"Error" withMessage:@"Server error"];
            }
        }];
    }
}

- (BOOL) textFieldShouldReturn:(UITextField *)textField {
    if([textField isEqual:_lblBookTitle]) {
        [_lblBookAuthor becomeFirstResponder];
    } else if ([textField isEqual:_lblBookAuthor]) {
        [_lblBookISBN becomeFirstResponder];
    } else if ([textField isEqual:_lblBookISBN]) {
        [_lblBookQuantity becomeFirstResponder];
    } else if([textField isEqual:_lblBookQuantity]) {
        [textField resignFirstResponder];

        if(([_lblBookAuthor.text length] > 0) &&
           ([_lblBookTitle.text length] > 0) &&
           ([_lblBookQuantity.text intValue] > 0 &&
            ([_lblBookISBN.text length] == 13))) {
            [self saveBook:_btnSaveBook];
        }
    }

    return YES;
}

@end
