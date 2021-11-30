//
//  MXVisualViewManager.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/7/30.
//

#import <React/RCTUIManager.h>
#import "MXVisualViewManager.h"
#import "MXVisualView.h"
#import "RCTConvert+Mapxus.h"

@interface MXVisualViewManager () <MXMVisualDelegate>

@end

@implementation MXVisualViewManager

RCT_EXPORT_MODULE(MXVisualView)

- (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (UIView *)view {
    MXVisualView *v = [[MXVisualView alloc] init];
    v.delegate = self;
    return v;
}

RCT_EXPORT_VIEW_PROPERTY(onLoadFail, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onRenderComplete, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLoadingChanged, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onBearingChanged, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNodeChanged, RCTBubblingEventBlock)

RCT_EXPORT_METHOD(loadVisualViewWithFirstImg:(nonnull NSNumber*)reactTag
                  :(nullable NSString *)imageId
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXVisualView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXVisualView");
            return;
        }
        
        MXVisualView *reactView = (MXVisualView *)view;
        [reactView loadVisualViewWithFristImg:imageId];
        resolve(nil);
    }];
}

RCT_EXPORT_METHOD(unloadVisualView:(nonnull NSNumber*)reactTag
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXVisualView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXVisualView");
            return;
        }
        
        MXVisualView *reactView = (MXVisualView *)view;
        [reactView unloadVisualView];
        resolve(nil);
    }];
}

RCT_EXPORT_METHOD(moveToKey:(nonnull NSNumber*)reactTag
                  :(nonnull NSString *)key
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXVisualView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXVisualView");
            return;
        }
        
        MXVisualView *reactView = (MXVisualView *)view;
        [reactView moveToKey:key];
        resolve(nil);
    }];
}

RCT_EXPORT_METHOD(moveCloseTo:(nonnull NSNumber*)reactTag
                  :(nonnull NSString *)buildingId
                  :(nonnull NSString *)floor
                  :(double)latitude
                  :(double)longitude
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXVisualView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXVisualView");
            return;
        }
        
        MXVisualView *reactView = (MXVisualView *)view;
        [reactView moveCloseToBuilding:buildingId floor:floor latitude:latitude longitude:longitude];
        resolve(nil);
    }];
}

RCT_EXPORT_METHOD(resize:(nonnull NSNumber*)reactTag
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXVisualView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXVisualView");
            return;
        }
        
        MXVisualView *reactView = (MXVisualView *)view;
        [reactView resize];
        resolve(nil);
    }];
}

RCT_EXPORT_METHOD(getBearing:(nonnull NSNumber*)reactTag
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXVisualView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXVisualView");
            return;
        }
        
        MXVisualView *reactView = (MXVisualView *)view;
        double bearing = [reactView getBearing];
        resolve(@{ @"bearing": @(bearing)});
    }];
}

RCT_EXPORT_METHOD(setBearing:(nonnull NSNumber*)reactTag
                  :(double)bearing
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXVisualView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXVisualView");
            return;
        }
        
        MXVisualView *reactView = (MXVisualView *)view;
        [reactView setBearing:bearing];
        resolve(nil);
    }];
}

RCT_EXPORT_METHOD(getVisualCenter:(nonnull NSNumber*)reactTag
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXVisualView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXVisualView");
            return;
        }
        
        MXVisualView *reactView = (MXVisualView *)view;
        [reactView getVisualCenter:^(MXMVisualCoordinate2D center) {
            resolve(@{@"center": @{ @"x": @(center.x), @"y": @(center.y)}});
        }];
    }];
}

RCT_EXPORT_METHOD(setVisualCenter:(nonnull NSNumber*)reactTag
                  :(nonnull NSDictionary *)center
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXVisualView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXVisualView");
            return;
        }
        
        MXVisualView *reactView = (MXVisualView *)view;
        MXMVisualCoordinate2D c = [RCTConvert MXMVisualCoordinate2D:center];
        [reactView setVisualCenter:c];
        resolve(nil);
    }];
}

RCT_EXPORT_METHOD(getZoom:(nonnull NSNumber*)reactTag
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXVisualView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXVisualView");
            return;
        }
        
        MXVisualView *reactView = (MXVisualView *)view;
        [reactView getZoom:^(double zoom) {
            resolve(@{ @"zoom": @(zoom)});
        }];
    }];
}

RCT_EXPORT_METHOD(setZoom:(nonnull NSNumber*)reactTag
                  :(double)zoom
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXVisualView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXVisualView");
            return;
        }
        
        MXVisualView *reactView = (MXVisualView *)view;
        [reactView setZoom:zoom];
        resolve(nil);
    }];
}

RCT_EXPORT_METHOD(activateBearing:(nonnull NSNumber*)reactTag
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXVisualView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXVisualView");
            return;
        }
        
        MXVisualView *reactView = (MXVisualView *)view;
        [reactView activateBearing];
        resolve(nil);
    }];
}

RCT_EXPORT_METHOD(deactivateBearing:(nonnull NSNumber*)reactTag
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXVisualView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXVisualView");
            return;
        }
        
        MXVisualView *reactView = (MXVisualView *)view;
        [reactView deactivateBearing];
        resolve(nil);
    }];
}





#pragma mark - MXMVisualDelegate
- (void)visualView:(MXMVisualView *)view didFailWithError:(NSError *)error {
    MXVisualView *reactView = (MXVisualView *)view;
    if (!reactView.onLoadFail) {
        return;
    }
    reactView.onLoadFail(@{@"message": error.localizedDescription, @"code": @(error.code)});
}

- (void)visualViewRenderComplete:(MXMVisualView *)view {
    MXVisualView *reactView = (MXVisualView *)view;
    if (!reactView.onRenderComplete) {
        return;
    }
    reactView.onRenderComplete(@{});
}

- (void)visualView:(MXMVisualView *)view didLoadingChanged:(BOOL)isLoading {
    MXVisualView *reactView = (MXVisualView *)view;
    if (!reactView.onLoadingChanged) {
        return;
    }
    reactView.onLoadingChanged(@{@"isLoading": @(isLoading)});
}

- (void)visualView:(MXMVisualView *)view didBearingChanged:(double)bearing {
    MXVisualView *reactView = (MXVisualView *)view;
    if (!reactView.onBearingChanged) {
        return;
    }
    reactView.onBearingChanged(@{@"bearing": @(bearing)});
}

- (void)visualView:(MXMVisualView *)view didNodeChanged:(MXMNode *)node {
    MXVisualView *reactView = (MXVisualView *)view;
    if (!reactView.onNodeChanged) {
        return;
    }
    reactView.onNodeChanged(@{@"node": [node toJson]});
}


@end
