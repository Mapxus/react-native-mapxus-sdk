//
//  MXNavigationViewManager.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/4/21.
//

#import <YYModel/YYModel.h>
#import <React/RCTUIManager.h>
#import "MXNavigationViewManager.h"
#import "MXNavigationView.h"

@implementation MXNavigationViewManager

RCT_EXPORT_MODULE(MXNavigationView)

- (UIView *)view {
    return [[MXNavigationView alloc] init];
}

RCT_REMAP_VIEW_PROPERTY(adsorbable, reactAdsorbable, BOOL)
RCT_REMAP_VIEW_PROPERTY(shortenable, reactShortenable, BOOL)
RCT_REMAP_VIEW_PROPERTY(numberOfAllowedDrifts, reactNumberOfAllowedDrifts, NSUInteger)
RCT_REMAP_VIEW_PROPERTY(maximumDrift, reactMaximumDrift, float)
RCT_REMAP_VIEW_PROPERTY(distanceToDestination, reactDistanceToDestination, float)
RCT_REMAP_VIEW_PROPERTY(showsUserHeadingIndicator, reactShowsUserHeadingIndicator, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onArrivalAtDestination, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onExcessiveDrift, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onRefreshTheAdsorptionLocation, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onGetNewPath, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onUpdate, RCTBubblingEventBlock)

RCT_EXPORT_METHOD(updatePath:(nonnull NSNumber *)reactTag
                  path:(nonnull NSDictionary *)path
                  wayPoints:(nonnull NSArray *)points
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXNavigationView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXNavigationView");
            return;
        }
        
        __weak MXNavigationView *reactView = (MXNavigationView *)view;
        
        NSArray<MXMIndoorPoint *> *list = [NSArray yy_modelArrayWithClass:[MXMIndoorPoint class] json:points];

        MXMPath *tPath = [[MXMPath alloc] init];
        tPath.distance = [path[@"distance"] doubleValue];
        tPath.weight = [path[@"weight"] doubleValue];
        tPath.time = [path[@"time"] unsignedIntValue];
        MXMBoundingBox *bbox = [[MXMBoundingBox alloc] init];
        bbox.min_latitude = [path[@"minLat"] doubleValue];
        bbox.min_longitude = [path[@"minLon"] doubleValue];
        bbox.max_latitude = [path[@"maxLat"] doubleValue];
        bbox.max_longitude = [path[@"maxLon"] doubleValue];
        tPath.bbox = bbox;
        MXMGeometry *geometry = [[MXMGeometry alloc] init];
        geometry.type = path[@"points"][@"type"];
        geometry.coordinates = [NSArray yy_modelArrayWithClass:[MXMGeoPoint class] json:path[@"points"][@"coordinates"]];
        tPath.points = geometry;
        tPath.instructions = [NSArray yy_modelArrayWithClass:[MXMInstruction class] json:path[@"instructions"]];

        [reactView updatePath:tPath wayPoints:list];
        resolve(nil);
    }];
}

RCT_EXPORT_METHOD(start:(nonnull NSNumber *)reactTag
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXNavigationView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXNavigationView");
            return;
        }
        
        __weak MXNavigationView *reactView = (MXNavigationView *)view;
        
        [reactView start];
        resolve(nil);
    }];
}

RCT_EXPORT_METHOD(stop:(nonnull NSNumber *)reactTag
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXNavigationView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXNavigationView");
            return;
        }
        
        __weak MXNavigationView *reactView = (MXNavigationView *)view;
        
        [reactView stop];
        resolve(nil);
    }];
}


@end
