//
//  BooksViewController.m
//  Library
//
//  Created by hangnguyen on 9/2/14.
//  Copyright (c) 2014 hangnguyen. All rights reserved.
//

#import "BooksViewController.h"

@interface BooksViewController ()

@end

@implementation BooksViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self)
    {
        
    }
    
    return self;
}

- (void) decorate
{
    _topTab.layer.cornerRadius = 5.0f;
    _topTab.layer.masksToBounds = YES;
    
    NSLog(@"NAV: %@", self.navigationController == nil ? @" NO" : @" YES");
    [self.tabBarController setTitle:@"Books"];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self decorate];
    
    // Sample books
    books = [NSArray arrayWithObjects:@"Book1", @"Book2", @"Book3", nil];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [books count];
};

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *simpleTableIndentifier = @"BookTable";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:simpleTableIndentifier];
    
    if(cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:simpleTableIndentifier];
    }
    
    cell.textLabel.text = [books objectAtIndex:indexPath.row];
    return cell;
};


- (IBAction)segmentChanged:(id)sender {
    UISegmentedControl *segmentedControl = (UISegmentedControl *) sender;
    NSInteger selectedSegment = segmentedControl.selectedSegmentIndex;
    
    NSLog(@"%i", selectedSegment);
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
