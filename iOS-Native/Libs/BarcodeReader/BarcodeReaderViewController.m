//
//  BarcodeReaderViewController.m
//  Library
//
//  Created by Torrey Betts on 24/09/14.
//  Copyright (c) 2014 Horical. All rights reserved.
//

#import <AVFoundation/AVFoundation.h>
#import "BarcodeReaderViewController.h"

@interface BarcodeReaderViewController () <AVCaptureMetadataOutputObjectsDelegate>
{
    AVCaptureSession *_session;
    AVCaptureDevice *_device;
    AVCaptureDeviceInput *_input;
    AVCaptureMetadataOutput *_output;
    AVCaptureVideoPreviewLayer *_prevLayer;

    UIView *_highlightView;
    UILabel *_label;
    UIButton *_cancel;

}
@end

@implementation BarcodeReaderViewController

- (id) init
{
    self = [super init];
    return self;
}

-(id) initWithDelegate:(id<BarcodeReaderDelegate>)delegate
{
    self = [super init];
    self.delegate = delegate;

    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];

    _highlightView = [[UIView alloc] init];
    _highlightView.autoresizingMask = UIViewAutoresizingFlexibleTopMargin|UIViewAutoresizingFlexibleLeftMargin|UIViewAutoresizingFlexibleRightMargin|UIViewAutoresizingFlexibleBottomMargin;
    _highlightView.layer.borderColor = [UIColor greenColor].CGColor;
    _highlightView.layer.borderWidth = 3;
    [self.view addSubview:_highlightView];

    float bw = 80;
    _cancel = [[UIButton alloc] init];
    _cancel.frame = CGRectMake((self.view.frame.size.width-bw)/2.0, self.view.bounds.size.height - 40, bw, 40);
    [_cancel setTitle:@"Cancel" forState:UIControlStateNormal];
    [_cancel addTarget:self action:@selector(onCancel) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:_cancel];

    _label = [[UILabel alloc] init];
    _label.frame = CGRectMake(0, self.view.bounds.size.height - 40, self.view.bounds.size.width, 40);
    _label.autoresizingMask = UIViewAutoresizingFlexibleTopMargin;
    _label.backgroundColor = [UIColor colorWithWhite:0.15 alpha:0.65];
    _label.textColor = [UIColor whiteColor];
    _label.textAlignment = NSTextAlignmentCenter;
    _label.text = @"(none)";
    //[self.view addSubview:_label];

    _session = [[AVCaptureSession alloc] init];
    _device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
    NSError *error = nil;

    _input = [AVCaptureDeviceInput deviceInputWithDevice:_device error:&error];
    if (_input) {
        [_session addInput:_input];
    } else {
        NSLog(@"Error: %@", error);
    }

    _output = [[AVCaptureMetadataOutput alloc] init];
    [_output setMetadataObjectsDelegate:self queue:dispatch_get_main_queue()];
    [_session addOutput:_output];

    _output.metadataObjectTypes = [_output availableMetadataObjectTypes];

    _prevLayer = [AVCaptureVideoPreviewLayer layerWithSession:_session];
    _prevLayer.frame = self.view.bounds;
    _prevLayer.videoGravity = AVLayerVideoGravityResizeAspectFill;
    [self.view.layer addSublayer:_prevLayer];

    [_session startRunning];

    [self.view bringSubviewToFront:_highlightView];
    [self.view bringSubviewToFront:_label];
}

- (void)captureOutput:(AVCaptureOutput *)captureOutput didOutputMetadataObjects:(NSArray *)metadataObjects fromConnection:(AVCaptureConnection *)connection
{
    CGRect highlightViewRect = CGRectZero;
    AVMetadataMachineReadableCodeObject *barCodeObject;
    NSArray *barCodeTypes = @[
                            AVMetadataObjectTypeUPCECode,
                            AVMetadataObjectTypeCode39Code,
                            AVMetadataObjectTypeCode39Mod43Code,
                            AVMetadataObjectTypeEAN13Code,
                            AVMetadataObjectTypeEAN8Code,
                            AVMetadataObjectTypeCode93Code,
                            AVMetadataObjectTypeCode128Code,
                            AVMetadataObjectTypePDF417Code,
                            AVMetadataObjectTypeQRCode,
                            AVMetadataObjectTypeAztecCode ];

    NSArray *iOS8Array = @[
                           AVMetadataObjectTypeInterleaved2of5Code,
                           AVMetadataObjectTypeITF14Code,
                           AVMetadataObjectTypeDataMatrixCode ];

    if([[[UIDevice currentDevice].systemVersion substringToIndex:2] floatValue] >= 7.9) {
        barCodeTypes = [barCodeTypes arrayByAddingObjectsFromArray:iOS8Array];
    }

    for (AVMetadataObject *metadata in metadataObjects) {
        for (NSString *type in barCodeTypes) {
            if ([metadata.type isEqualToString:type])
            {
                barCodeObject = (AVMetadataMachineReadableCodeObject *)[_prevLayer transformedMetadataObjectForMetadataObject:(AVMetadataMachineReadableCodeObject *)metadata];
                highlightViewRect = barCodeObject.bounds;

                NSString *detectedString = [(AVMetadataMachineReadableCodeObject *)metadata stringValue];
                NSString *detectedType = [(AVMetadataMachineReadableCodeObject *)metadata type];

                if(![detectedString isEqualToString:detectionString] || ![detectedType isEqualToString:detectionType]) {

                    detectionString = detectedString;
                    detectionType = detectedType;

                    if(self.delegate && [self.delegate respondsToSelector:@selector(barcodeReader:onFoundItem:withType:)]) {
                        [self.delegate barcodeReader:self onFoundItem:detectedString withType:detectedType];
                    }
                }

                break;
            }
        }

        if (detectionString != nil)
        {
            _label.text = detectionString;
            break;
        }
        else
        {
            _label.text = @"(finding content)";
        }
    }

    _highlightView.frame = highlightViewRect;
}

- (void) onCancel
{
    if(self.delegate && [self.delegate respondsToSelector:@selector(barcodeReaderOnCancel:)]) {
        [self.delegate barcodeReaderOnCancel:self];
    }
}

@end