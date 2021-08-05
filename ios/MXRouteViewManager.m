//
//  MXRouteViewManager.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/7/29.
//

#import <YYModel/YYModel.h>
#import <React/RCTUIManager.h>
#import "MXRouteViewManager.h"
#import "MXRouteView.h"

@implementation MXRouteViewManager

RCT_EXPORT_MODULE(MXRouteView)

RCT_REMAP_VIEW_PROPERTY(indoorLineColor, reactIndoorLineColor, UIColor)
RCT_REMAP_VIEW_PROPERTY(outdoorLineColor, reactOutdoorLineColor, UIColor)
RCT_REMAP_VIEW_PROPERTY(dashLineColor, reactDashLineColor, UIColor)
RCT_REMAP_VIEW_PROPERTY(arrowSymbolSpacing, reactArrowSymbolSpacing, NSNumber)
RCT_REMAP_VIEW_PROPERTY(arrowIcon, reactArrowIcon, NSString)
RCT_REMAP_VIEW_PROPERTY(startIcon, reactStartIcon, NSString)
RCT_REMAP_VIEW_PROPERTY(endIcon, reactEndIcon, NSString)
RCT_REMAP_VIEW_PROPERTY(elevatorUpIcon, reactElevatorUpIcon, NSString)
RCT_REMAP_VIEW_PROPERTY(elevatorDownIcon, reactElevatorDownIcon, NSString)
RCT_REMAP_VIEW_PROPERTY(escalatorUpIcon, reactEscalatorUpIcon, NSString)
RCT_REMAP_VIEW_PROPERTY(escalatorDownIcon, reactEscalatorDownIcon, NSString)
RCT_REMAP_VIEW_PROPERTY(rampUpIcon, reactRampUpIcon, NSString)
RCT_REMAP_VIEW_PROPERTY(rampDownIcon, reactRampDownIcon, NSString)
RCT_REMAP_VIEW_PROPERTY(stairsUpIcon, reactStairsUpIcon, NSString)
RCT_REMAP_VIEW_PROPERTY(stairsDownIcon, reactStairsDownIcon, NSString)
RCT_REMAP_VIEW_PROPERTY(buildingGateIcon, reactBuildingGateIcon, NSString)
RCT_REMAP_VIEW_PROPERTY(isAddStartDash, reactIsAddStartDash, BOOL)
RCT_REMAP_VIEW_PROPERTY(isAddEndDash, reactIsAddEndDash, BOOL)
RCT_REMAP_VIEW_PROPERTY(hiddenTranslucentPaths, reactHiddenTranslucentPaths, BOOL)


RCT_EXPORT_METHOD(getPainterPathDto:(nonnull NSNumber *)reactTag
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXRouteView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXRouteView");
            return;
        }
        
        __weak MXRouteView *reactView = (MXRouteView *)view;
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
        
        if (![view isKindOfClass:[MXRouteView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXRouteView");
            return;
        }
        
        __weak MXRouteView *reactView = (MXRouteView *)view;
        
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
        
        if (![view isKindOfClass:[MXRouteView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXRouteView");
            return;
        }
        
        __weak MXRouteView *reactView = (MXRouteView *)view;
        
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
        
        if (![view isKindOfClass:[MXRouteView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXRouteView");
            return;
        }
        
        __weak MXRouteView *reactView = (MXRouteView *)view;
        
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
        
        if (![view isKindOfClass:[MXRouteView class]]) {
            RCTLogError(@"Invalid react tag, could not find MXRouteView");
            return;
        }
        
        __weak MXRouteView *reactView = (MXRouteView *)view;
        UIEdgeInsets edge = [RCTConvert UIEdgeInsets:insets];

        [reactView reactFocusOnKeys:keys edgePadding:edge];
        resolve(nil);
    }];
}


- (UIView *)view {
    return [[MXRouteView alloc] init];
}

@end
