//
//  Utilties.m
//  Library
//
//  Created by Nam Huynh on 9/15/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import "Utilties.h"

@implementation Utilties

- (void)showAlertWithTitle:(NSString *)title withMessage: (NSString *) message {
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:title
                                                    message:message
                                                   delegate:nil
                                          cancelButtonTitle:@"OK"
                                          otherButtonTitles:nil];
    [alert show];
}

@end
