//
//  MXRouteSearchManager.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/4/21.
//

#import "MXRouteSearchModule.h"
#import <YYModel/YYModel.h>
#import "RCTConvert+Mapxus.h"

@import MapxusMapSDK;


@interface MXRouteSearchModule () <MXMSearchDelegate>

@property (nonatomic, strong) MXMSearchAPI *api;

@end


@implementation MXRouteSearchModule
{
    RCTPromiseResolveBlock _resolveBlock;
    RCTPromiseRejectBlock _rejectBlock;
}

RCT_EXPORT_MODULE()


RCT_EXPORT_METHOD(routeSearch:(nonnull NSDictionary *)params
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject) {
    _resolveBlock = resolve;
    _rejectBlock = reject;
    
    MXMRouteSearchRequest *re = [RCTConvert MXMRouteSearchRequest:params];
    [self.api MXMRouteSearch:re];
}


#pragma mark - MXMSearchDelegate

- (void)MXMSearchRequest:(id)request didFailWithError:(NSError *)error {
    _rejectBlock([NSString stringWithFormat:@"%d", error.code], error.localizedDescription, error);
}

- (void)onRouteSearchDone:(MXMRouteSearchRequest *)request response:(MXMRouteSearchResponse *)response {
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
