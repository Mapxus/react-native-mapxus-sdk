//
//  MXBuildingSearchManager.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/4/21.
//

#import "MXBuildingSearchModule.h"
#import <YYModel/YYModel.h>
#import "RCTConvert+Mapxus.h"

@import MapxusMapSDK;


@interface MXBuildingSearchModule () <MXMSearchDelegate>

@property (nonatomic, strong) MXMSearchAPI *api;

@end

@implementation MXBuildingSearchModule
{
    RCTPromiseResolveBlock _resolveBlock;
    RCTPromiseRejectBlock _rejectBlock;
}

RCT_EXPORT_MODULE()


RCT_EXPORT_METHOD(buildingSearchGlobal:(nonnull NSDictionary *)params
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject) {
    _resolveBlock = resolve;
    _rejectBlock = reject;
    
    MXMBuildingSearchRequest *re = [RCTConvert MXMBuildingSearchRequest:params];
    [self.api MXMBuildingSearch:re];
}

RCT_EXPORT_METHOD(buildingSearchOnBbox:(nonnull NSDictionary *)params
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject) {
    _resolveBlock = resolve;
    _rejectBlock = reject;
    
    MXMBuildingSearchRequest *re = [RCTConvert MXMBuildingSearchRequest:params];
    [self.api MXMBuildingSearch:re];
}

RCT_EXPORT_METHOD(buildingSearchNearbyCenter:(nonnull NSDictionary *)params
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject) {
    _resolveBlock = resolve;
    _rejectBlock = reject;
    
    MXMBuildingSearchRequest *re = [RCTConvert MXMBuildingSearchRequest:params];
    [self.api MXMBuildingSearch:re];
}

RCT_EXPORT_METHOD(buildingSearchByIds:(nonnull NSDictionary *)params
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject) {
    _resolveBlock = resolve;
    _rejectBlock = reject;
    
    MXMBuildingSearchRequest *re = [RCTConvert MXMBuildingSearchRequest:params];
    [self.api MXMBuildingSearch:re];
}


#pragma mark - MXMSearchDelegate

- (void)MXMSearchRequest:(id)request didFailWithError:(NSError *)error {
    _rejectBlock([NSString stringWithFormat:@"%d", error.code], error.localizedDescription, error);
}

- (void)onBuildingSearchDone:(MXMBuildingSearchRequest *)request response:(MXMBuildingSearchResponse *)response {
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
