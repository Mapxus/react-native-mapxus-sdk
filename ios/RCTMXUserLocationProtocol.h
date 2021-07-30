//
//  RCTMXUserLocationProtocol.h
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/7/27.
//

#import <React/RCTComponent.h>
#import "RCTMGLMapView.h"

NS_ASSUME_NONNULL_BEGIN

@protocol RCTMXUserLocationProtocol <MGLLocationManager>

@property (nonatomic, weak) RCTMGLMapView *mapRendererView;

@property (nonatomic, assign) BOOL reactShowsUserHeadingIndicator;

@property (nonatomic, copy) RCTBubblingEventBlock onUpdate;

@end

NS_ASSUME_NONNULL_END
