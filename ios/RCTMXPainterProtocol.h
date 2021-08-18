//
//  RCTMXPainterProtocol.h
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/8/18.
//

#import <MapxusMapSDK/MapxusMapSDK.h>
#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol RCTMXPainterProtocol <NSObject>

@property (nonatomic, weak) MGLMapView *mapRendererView;

@end

NS_ASSUME_NONNULL_END
