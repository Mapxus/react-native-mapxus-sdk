//
//  MXMapManager.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/4/9.
//

#import <React/RCTUIManager.h>

#import "MXMapManager.h"
#import "MXMap.h"
#import "RCTConvert+Mapxus.h"


@implementation MXMapManager

RCT_EXPORT_MODULE(MXMap)

- (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (UIView *)view
{
    MXMap *mxMap = [[MXMap alloc] init];
    return mxMap;
}

RCT_CUSTOM_VIEW_PROPERTY(mapOption, MXMConfiguration, MXMap) {
    [view setReactMapOption:json ? [RCTConvert MXMConfiguration:json] : nil];
}

RCT_REMAP_VIEW_PROPERTY(selectFontColor, reactSelectFontColor, UIColor)
RCT_REMAP_VIEW_PROPERTY(selectBoxColor, reactSelectBoxColor, UIColor)
RCT_REMAP_VIEW_PROPERTY(fontColor, reactFontColor, UIColor)

RCT_REMAP_VIEW_PROPERTY(indoorControllerAlwaysHidden, reactIndoorControllerAlwaysHidden, NSNumber)
RCT_REMAP_VIEW_PROPERTY(selectorPosition, reactSelectorPosition, NSInteger)
RCT_REMAP_VIEW_PROPERTY(selectorPositionCustom, reactSelectorPositionCustom, CGPoint)

RCT_REMAP_VIEW_PROPERTY(logoBottomMargin, reactLogoBottomMargin, NSNumber)
RCT_REMAP_VIEW_PROPERTY(openStreetSourceBottomMargin, reactOpenStreetSourceBottomMargin, NSNumber)

RCT_REMAP_VIEW_PROPERTY(outdoorHidden, reactOutdoorHidden, NSNumber)
RCT_REMAP_VIEW_PROPERTY(gestureSwitchingBuilding, reactGestureSwitchingBuilding, NSNumber)
RCT_REMAP_VIEW_PROPERTY(autoChangeBuilding, reactAutoChangeBuilding, NSNumber)

RCT_EXPORT_VIEW_PROPERTY(onTappedOnPoi, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onTappedOnBlank, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLongPressed, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onIndoorSceneChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onIndoorStatusChange, RCTBubblingEventBlock)


RCT_EXPORT_METHOD(setMapxusStyle:(nonnull NSNumber *)reactTag
                  :(nonnull NSNumber *)style
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXMap class]]) {
            RCTLogError(@"Invalid react tag, could not find MXMap");
            return;
        }
        
        __weak MXMap *reactMap = (MXMap *)view;
        
        NSUInteger styleInt = [style unsignedIntValue];
        [reactMap reactSetMapSytle:styleInt];
        resolve(nil);
    }];
}

RCT_EXPORT_METHOD(setMapxusStyleWithString:(nonnull NSNumber *)reactTag
                  :(NSString *)name
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXMap class]]) {
            RCTLogError(@"Invalid react tag, could not find MXMap");
            return;
        }
        
        __weak MXMap *reactMap = (MXMap *)view;
        [reactMap reactSetMapStyleWithName:name];
        resolve(nil);
    }];
}

RCT_EXPORT_METHOD(setMapLanguage:(nonnull NSNumber *)reactTag
                  name:(NSString *)name
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXMap class]]) {
            RCTLogError(@"Invalid react tag, could not find MXMap");
            return;
        }
        
        __weak MXMap *reactMap = (MXMap *)view;
        [reactMap reactSetMapLanguage:name];
        resolve(nil);
    }];
}

RCT_EXPORT_METHOD(selectIndoorScene:(nonnull NSNumber *)reactTag
                  :(nullable NSString *)buildingId
                  :(nullable NSString *)floor
                  :(nonnull NSNumber *)zoomMode
                  :(NSDictionary *)insets
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject) {
    
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];
        
        if (![view isKindOfClass:[MXMap class]]) {
            RCTLogError(@"Invalid react tag, could not find MXMap");
            return;
        }
        
        __weak MXMap *reactMap = (MXMap *)view;
        UIEdgeInsets edge = [RCTConvert UIEdgeInsets:insets];
        NSInteger zoomModeInt = [zoomMode integerValue];

        [reactMap reactSelectBuilding:buildingId floor:floor zoomMode:zoomModeInt edgePadding:edge];
        resolve(nil);
    }];
}

@end
