//
//  MXPoiSearchManager.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/4/21.
//

#import "MXPoiSearchModule.h"
#import <YYModel/YYModel.h>
#import "RCTConvert+Mapxus.h"

@import MapxusMapSDK;


@interface MXPoiSearchModule () <MXMSearchDelegate>

@property (nonatomic, strong) MXMSearchAPI *api;

@end

@implementation MXPoiSearchModule
{
    RCTPromiseResolveBlock _resolveBlock;
    RCTPromiseRejectBlock _rejectBlock;
}

RCT_EXPORT_MODULE()


RCT_EXPORT_METHOD(poiSearchInIndoorScene:(nonnull NSDictionary *)params
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject) {
    _resolveBlock = resolve;
    _rejectBlock = reject;
    
    MXMPOISearchRequest *re = [RCTConvert MXMPOISearchRequest:params];
    [self.api MXMPOISearch:re];
}

RCT_EXPORT_METHOD(poiSearchOnBbox:(nonnull NSDictionary *)params
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject) {
    _resolveBlock = resolve;
    _rejectBlock = reject;
    
    MXMPOISearchRequest *re = [RCTConvert MXMPOISearchRequest:params];
    [self.api MXMPOISearch:re];
}

RCT_EXPORT_METHOD(poiSearchNearbyCenter:(nonnull NSDictionary *)params
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject) {
    _resolveBlock = resolve;
    _rejectBlock = reject;
    
    MXMPOISearchRequest *re = [RCTConvert MXMPOISearchRequest:params];
    [self.api MXMPOISearch:re];
}

RCT_EXPORT_METHOD(poiSearchByIds:(nonnull NSDictionary *)params
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject) {
    _resolveBlock = resolve;
    _rejectBlock = reject;
    
    MXMPOISearchRequest *re = [RCTConvert MXMPOISearchRequest:params];
    [self.api MXMPOISearch:re];
}

RCT_EXPORT_METHOD(orientationPoiSearch:(nonnull NSDictionary *)params
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject) {
    _resolveBlock = resolve;
    _rejectBlock = reject;
    
    MXMOrientationPOISearchRequest *re = [RCTConvert MXMOrientationPOISearchRequest:params];
    [self.api MXMOrientationPOISearch:re];
}


#pragma mark - MXMSearchDelegate

- (void)MXMSearchRequest:(id)request didFailWithError:(NSError *)error {
    _rejectBlock([NSString stringWithFormat:@"%d", error.code], error.localizedDescription, error);
}

- (void)onPOISearchDone:(MXMPOISearchRequest *)request response:(MXMPOISearchResponse *)response {
    _resolveBlock([response yy_modelToJSONObject]);
}

- (void)onOrientationPOISearchDone:(MXMOrientationPOISearchRequest *)request response:(MXMOrientationPOISearchResponse *)response {
    _resolveBlock([response yy_modelToJSONObject]);
}

- (MXMSearchAPI *)api {
    if (!_api) {
        _api = [[MXMSearchAPI alloc] init];
        _api.delegate = self;
    }
    return _api;
}

@end
