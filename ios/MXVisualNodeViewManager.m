//
//  MXVisualNodeViewManager.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/7/30.
//

#import <React/RCTUIManager.h>
#import "MXVisualNodeViewManager.h"
#import "MXVisualNodeView.h"

@implementation MXVisualNodeViewManager

RCT_EXPORT_MODULE(MXVisualNodeView)

- (UIView *)view {
    MXVisualNodeView *v = [[MXVisualNodeView alloc] init];
    return v;
}

RCT_EXPORT_VIEW_PROPERTY(onTappedFlag, RCTBubblingEventBlock)


RCT_EXPORT_METHOD(renderFlagUsingNodes:(nonnull NSNumber*)reactTag
                  :(nonnull NSArray<NSDictionary *> *)nodes
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXVisualNodeView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXVisualNodeView");
            return;
        }
        
        MXVisualNodeView *reactView = (MXVisualNodeView *)view;
        [reactView reactRenderFlagsUsingNodes:nodes];
        resolve(nil);
    }];
}

RCT_EXPORT_METHOD(cleanLayer:(nonnull NSNumber*)reactTag
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXVisualNodeView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXVisualNodeView");
            return;
        }
        
        MXVisualNodeView *reactView = (MXVisualNodeView *)view;
        [reactView reactCleanLayer];
        resolve(nil);
    }];
}

RCT_EXPORT_METHOD(changeOn:(nonnull NSNumber*)reactTag
                  :(nonnull NSString *)buildingId
                  :(nonnull NSString *)floor
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXVisualNodeView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXVisualNodeView");
            return;
        }
        
        MXVisualNodeView *reactView = (MXVisualNodeView *)view;
        [reactView reactChangeOnBuilding:buildingId floor:floor];
        resolve(nil);
    }];
}

@end
