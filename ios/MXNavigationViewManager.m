//
//  MXNavigationViewManager.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/4/21.
//

#import <React/RCTUIManager.h>
#import <YYModel/YYModel.h>
#import "MXNavigationViewManager.h"
#import "MXNavigationView.h"

@implementation MXNavigationViewManager

RCT_EXPORT_MODULE(MXNavigationView)

RCT_EXPORT_METHOD(getPainterPathDto:(nonnull NSNumber *)reactTag
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXNavigationView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXNavigationView");
            return;
        }
        
        __weak MXNavigationView *reactView = (MXNavigationView *)view;
        NSDictionary *dto = reactView.reactPainterPathDto?:@{};
        resolve(@{@"painterPathDto": dto});
    }];
}

RCT_EXPORT_METHOD(paintRouteUsingPath:(nonnull NSNumber *)reactTag
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

        [reactView reactPaintRouteUsingPath:tPath wayPoints:list];
        resolve(nil);
    }];
}

RCT_EXPORT_METHOD(cleanRoute:(nonnull NSNumber *)reactTag
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXNavigationView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXNavigationView");
            return;
        }
        
        __weak MXNavigationView *reactView = (MXNavigationView *)view;
        
        [reactView reactCleanRoute];
        resolve(nil);
    }];
}

RCT_EXPORT_METHOD(changeOn:(nonnull NSNumber *)reactTag
                  building:(NSString *)buildingId
                  floor:(NSString *)floor
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXNavigationView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXNavigationView");
            return;
        }
        
        __weak MXNavigationView *reactView = (MXNavigationView *)view;
        
        [reactView reactChangeOnBuilding:buildingId floor:floor];
        resolve(nil);
    }];
}

RCT_EXPORT_METHOD(focusOn:(nonnull NSNumber *)reactTag
                  keys:(NSArray<NSString *> *)keys
                  edgePadding:(NSDictionary *)insets
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXNavigationView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXNavigationView");
            return;
        }
        
        __weak MXNavigationView *reactView = (MXNavigationView *)view;
        UIEdgeInsets edge = [RCTConvert UIEdgeInsets:insets];

        [reactView reactFocusOnKeys:keys edgePadding:edge];
        resolve(nil);
    }];
}


- (UIView *)view {
    return [[MXNavigationView alloc] init];
}

@end
