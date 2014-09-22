//
//  BookCell.h
//  Library
//
//  Created by Nam Huynh on 9/22/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface BookCell : UITableViewCell

@property (strong, nonatomic) IBOutlet UIImageView *bookPhoto;
@property (strong, nonatomic) IBOutlet UILabel *lblBookName;
@property (strong, nonatomic) IBOutlet UILabel *lblBookAuthor;
@property (strong, nonatomic) IBOutlet UILabel *lblBookQuantity;

@end
