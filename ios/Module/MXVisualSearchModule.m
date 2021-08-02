//
//  MXVisualSearchModule.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/7/30.
//

#import <MapxusVisualSDK/MapxusVisualSDK.h>
#import <YYModel/YYModel.h>
#import "MXVisualSearchModule.h"
#import "RCTConvert+Mapxus.h"

@interface MXVisualSearchModule () <MXMVisualSearchDelegate>

@property (nonatomic, strong) MXMVisualSearch *api;


@end

@implementation MXVisualSearchModule
{
    RCTPromiseResolveBlock _resolveBlock;
    RCTPromiseRejectBlock _rejectBlock;
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(searchVisualDataInBuilding:(nonnull NSDictionary *)params
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject) {
    _resolveBlock = resolve;
    _rejectBlock = reject;
    
    MXMVisualBuildingSearchOption *re = [RCTConvert MXMVisualBuildingSearchOption:params];
    [self.api searchVisualDataInBuilding:re];
}

#pragma mark - MXMVisualSearchDelegate
- (void)onGetVisualDataInBuilding:(MXMVisualSearch *)searcher result:(NSArray<MXMNodeGroup *> *)list error:(NSError *)error {
    if (error) {
        _rejectBlock([NSString stringWithFormat:@"%d", error.code], error.localizedDescription, error);
    } else {
        _resolveBlock([NSArray yy_modelArrayWithClass:[MXMNodeGroup class] json:list]);
    }
}

- (MXMVisualSearch *)api {
    if (!_api) {
        _api = [[MXMVisualSearch alloc] init];
        _api.delegate = self;
    }
    return _api;
}

@end
