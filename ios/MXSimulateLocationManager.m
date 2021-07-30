//
//  MXSimulateLocationManager.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/7/27.
//

#import <React/RCTUIManager.h>
#import <MapxusComponentKit/MapxusComponentKit.h>
#import "MXSimulateLocationManager.h"
#import "MXSimulateLocation.h"

@implementation MXSimulateLocationManager

RCT_EXPORT_MODULE(MXSimulateLocation)

- (UIView *)view
{
    return [[MXSimulateLocation alloc] init];
}


RCT_REMAP_VIEW_PROPERTY(showsUserHeadingIndicator, reactShowsUserHeadingIndicator, BOOL)

RCT_EXPORT_VIEW_PROPERTY(onUpdate, RCTBubblingEventBlock)

RCT_EXPORT_METHOD(setSimulateLocation:(nonnull NSNumber *)reactTag
                  :(nonnull NSDictionary *)location
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *manager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
        id view = viewRegistry[reactTag];

        if (![view isKindOfClass:[MXSimulateLocation class]]) {
            RCTLogError(@"Invalid react tag, could not find MXSimulateLocation");
            return;
        }

        __weak MXSimulateLocation *reactLocation = (MXSimulateLocation *)view;

        CLFloor *floor = [CLFloor createFloorWihtLevel:[location[@"ordinal"] integerValue]];
        CLLocation *lon = [[CLLocation alloc] initWithLatitude:[location[@"latitude"] doubleValue] longitude:[location[@"longitude"] doubleValue]];
        lon.myFloor = floor;

        [reactLocation setSimulateLocation:lon];
        resolve(nil);
    }];
}


@end
