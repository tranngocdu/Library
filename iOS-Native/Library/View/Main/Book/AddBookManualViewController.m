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
        Utilities *utilities = [[Utilities alloc] init];
        [utilities showAlertWithTitle:@"Error" withMessage:@"Only accept image."];
    }
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
        book[@"cover_image"] = @"http://image.mp3.zdn.vn/thumb/165_165/covers/3/3/33e23a4ab94e902d9850109f4fba0e24_1411148582.jpg";
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
