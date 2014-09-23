//
//  Utilities.h
//  Library
//
//  Created by Nam Huynh on 9/23/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Utilities : NSObject {
    UIView *loadingView;
}

- (void)showAlertWithTitle:(NSString *)title withMessage: (NSString *) message;

@end
