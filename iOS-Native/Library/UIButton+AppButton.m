//
//  UIButton+AppButton.m
//  Library
//
//  Created by Nam Huynh on 9/11/14.
//  Copyright (c) 2014 Nam Huynh. All rights reserved.
//

#import "UIButton+AppButton.h"

@implementation UIButton (AppButton)

- (void)setAppButtonHasBackgroundColor:(BOOL)isHaveBgColor withColor:(UIColor *)color {
    self.layer.cornerRadius = 5.0;
    self.layer.borderWidth = 1.0f;
    self.layer.borderColor = [color CGColor];
    
    if (isHaveBgColor) {
        self.layer.backgroundColor = [color CGColor];
    } else {
        self.layer.backgroundColor = nil;
        [self setTitleColor:color forState:UIControlStateNormal];
    }
}

@end
