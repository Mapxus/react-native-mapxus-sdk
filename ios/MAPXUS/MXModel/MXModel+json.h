//
//  MXModel+json.h
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/6/3.
//

#import <MapxusVisualSDK/MapxusVisualSDK.h>

NS_ASSUME_NONNULL_BEGIN

@interface MXMNodeGroup (json)
- (NSDictionary<NSString*, id> *)toJson;
@end

NS_ASSUME_NONNULL_END
