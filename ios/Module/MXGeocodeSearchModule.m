//
//  MXGeocodeSearchManager.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/4/21.
//

#import "MXGeocodeSearchModule.h"
#import <YYModel/YYModel.h>
#import "RCTConvert+Mapxus.h"

@import MapxusMapSDK;


@interface MXGeocodeSearchModule () <MXMGeoCodeSearchDelegate>

@property (nonatomic, strong) MXMGeoCodeSearch *api;

@end


@implementation MXGeocodeSearchModule
{
    RCTPromiseResolveBlock _resolveBlock;
    RCTPromiseRejectBlock _rejectBlock;
}

RCT_EXPORT_MODULE()


RCT_EXPORT_METHOD(reverseGeoCode:(nonnull NSDictionary *)params
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject) {
    _resolveBlock = resolve;
    _rejectBlock = reject;
    
    MXMReverseGeoCodeSearchOption *re = [RCTConvert MXMReverseGeoCodeSearchOption:params];
    [self.api reverseGeoCode:re];
}

#pragma mark - MXMGeoCodeSearchDelegate
- (void)onGetReverseGeoCode:(MXMGeoCodeSearch *)searcher result:(nullable MXMReverseGeoCodeSearchResult *)result error:(nullable NSError *)error {
    if (error) {
        _rejectBlock([NSString stringWithFormat:@"%d", error.code], error.localizedDescription, error);
    } else {
        _resolveBlock([result yy_modelToJSONObject]);
    }
    
}

- (MXMGeoCodeSearch *)api {
    if (!_api) {
        _api = [[MXMGeoCodeSearch alloc] init];
        _api.delegate = self;
    }
    return _api;
}


@end
