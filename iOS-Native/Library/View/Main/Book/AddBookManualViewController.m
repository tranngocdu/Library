//
//  AddBookManualViewController.m
//  Library
//
//  Created by Tien Nguyen Thanh on 9/2/14.
//  Copyright (c) 2014 Tien Nguyen Thanh. All rights reserved.
//

#import "AddBookManualViewController.h"
#import "UIButton+AppButton.h"
#import "Utilties.h"
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
    NSLog(@"Add photo");
    UIImagePickerController *picker = [[UIImagePickerController alloc] init];
    picker.delegate = self;
    [picker setSourceType:UIImagePickerControllerSourceTypePhotoLibrary];
    [self presentViewController:picker animated:YES completion:nil];
}

- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info {
    NSString *mediaType = info[UIImagePickerControllerMediaType];
    if ([mediaType isEqualToString:(NSString *)kUTTypeImage]) {
        UIImage *image = info[UIImagePickerControllerOriginalImage];
        _tfImage.image = image;
    } else {
        Utilties *utilities = [[Utilties alloc] init];
        [utilities showAlertWithTitle:@"Error" withMessage:@"Only accept image."];
    }
    [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)addBook:(id)sender {
    NSString *bookTitle = _tfTitle.text;
    NSString *bookAuthor = _tfAuthor.text;
    NSString *bookISBN = _tfIsbn.text;
    NSString *bookQuantity = _tfQuantity.text;
    
    // Validate informations
    if ([bookTitle isEqualToString:@""] || [bookAuthor isEqualToString:@""]) {
        Utilties *utilities = [[Utilties alloc] init];
        [utilities showAlertWithTitle:@"Try Again" withMessage:@"Please add a title, author and quantity."];
    } else {
        NSLog(@"%@", _tfImage);
        PFUser *currentUser = [PFUser currentUser];
        PFObject *book = [PFObject objectWithClassName:@"NewBook"];
        book[@"title"] = bookTitle;
        book[@"author"] = bookAuthor;
        book[@"ISBN"] = bookISBN;
        book[@"cover_image"] = bookQuantity;
        book[@"User"] = currentUser.objectId;
        book[@"studentList"] = bookAuthor;
        book[@"quantity_total"] = bookQuantity;
        book[@"quantity_out"] = 0;
        book[@"quantity_available"] = bookQuantity;
    }
    
    NSLog(@"Add book");
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
