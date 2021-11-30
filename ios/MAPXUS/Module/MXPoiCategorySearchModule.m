//
//  MXPoiCategorySearchModule.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/4/25.
//

#import "MXPoiCategorySearchModule.h"
#import <YYModel/YYModel.h>
#import "RCTConvert+Mapxus.h"

@import MapxusMapSDK;


@interface MXPoiCategorySearchModule () <MXMSearchDelegate>

@property (nonatomic, strong) MXMSearchAPI *api;

@end

@implementation MXPoiCategorySearchModule
{
    RCTPromiseResolveBlock _resolveBlock;
    RCTPromiseRejectBlock _rejectBlock;
}

RCT_EXPORT_MODULE()


RCT_EXPORT_METHOD(poiCategorySearch:(nonnull NSDictionary *)params
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject) {
    _resolveBlock = resolve;
    _rejectBlock = reject;
    
    MXMPOICategorySearchRequest *re = [RCTConvert MXMPOICategorySearchRequest:params];
    [self.api MXMPOICategorySearch:re];
}


#pragma mark - MXMSearchDelegate

- (void)MXMSearchRequest:(id)request didFailWithError:(NSError *)error {
    _rejectBlock([NSString stringWithFormat:@"%d", error.code], error.localizedDescription, error);
}

- (void)onPOICategorySearchDone:(MXMPOICategorySearchRequest *)request response:(MXMPOICategorySearchResponse *)response {
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
